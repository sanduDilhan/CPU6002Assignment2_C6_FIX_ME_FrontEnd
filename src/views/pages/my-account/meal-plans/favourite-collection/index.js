import React, {Component} from 'react';
import {Row, Col, Input, ModalHeader, ModalBody, Modal} from "reactstrap";
import TopButtons from "../../top-buttons";
import '../../profile/style.scss';
import './style.scss'
import {getFavouriteRecipes, removeFavourite, updateFavouriteServeCount} from "../../../../../services/recipe";
import {notifyMessage} from "../../../../../utility/commonFunc";
import {getCurrentPackageDetails} from "../../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../../configs/constant";
import {
  BASE_ROUTE_PATH,
  NO_TYPE,
  ROUTE_MA_FAV_RECIPE_VIEW,
  ROUTE_MA_RECIPE_VIEW
} from "../../../../../configs/constant";
import {history} from "../../../../../history";
import * as commonFunc from "../../../../../utility/commonFunc";
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Minus, Plus, Trash2} from "react-feather";
import Add from "./add";

class App extends Component {
  state = {
    favList: [], isModal: false, customRecipeObj: null
  }
  componentDidMount() {
    this.getCurrentPackageDetailsHandler();
  }
  getCurrentPackageDetailsHandler = () => {
    this.props.spinnerHandler(true);
    getCurrentPackageDetails().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let results = response.result;
        if(results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        let resultObj = results[0]

        if(resultObj.isExpired) {
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`)
        }else{
          this.getFavCollections();
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  getFavCollections = () => {
    this.props.spinnerHandler(true);
    this.setState({isModal: false, customRecipeObj: null})
    getFavouriteRecipes().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        this.setState({favList: response.result})
      }else{
        notifyMessage(response.message)
      }
    })
  }
  removeHandler = (id) => {
    this.props.spinnerHandler(true);
    removeFavourite(id).then(response => {
      this.props.spinnerHandler(false);
      notifyMessage(response.message, response.code === 200 ? 1 : 0)
      if(response.code === 200) this.getFavCollections()
    })
  }
  countHandler = (index, count) => {

    let {favList} = this.state;
    let obj = favList[index];
    if(count === -1) {
      if(obj?.servingCount && obj.servingCount === 1) {
        obj.servingCount = 1;
        notifyMessage("Minimum serve limit is 1")
        return;
      }else if(obj?.servingCount && obj.servingCount > 1) {
        obj.servingCount = (obj.servingCount - 1);
      }else {
        obj.servingCount = 1;
      }
    }else{
      if(obj?.servingCount && obj.servingCount === 20) {
        obj.servingCount = 20;
        notifyMessage("Maximum serve limit is 20")
        return;
      }else if(obj?.servingCount) {
        obj.servingCount = (obj.servingCount + 1);
      }else {
        obj.servingCount = 2;
      }
    }


    const dataObj = {
      "favouriteUserRecipeId":obj.favouriteUserRecipeId,
      "servingCount":obj.servingCount
    }
    this.props.spinnerHandler(true);
    updateFavouriteServeCount(dataObj).then(response => {
      this.props.spinnerHandler(false);
      notifyMessage(response.message, response.code === 200 ? 1 : 0)
      if(response.code === 200) this.setState({favList})
    })
  }
  recipeClickHandler = (recipeId, favouriteUserRecipeId) => {
    this.props.history.push({pathname: `${BASE_ROUTE_PATH}${ROUTE_MA_FAV_RECIPE_VIEW}`, state: { recipeId: recipeId, isFavourite: true, favouriteUserRecipeId: favouriteUserRecipeId }})
  }
  customRecipeEditHandler = (recipeDetail, ingredient1, ingredient2, ingredient3) => {
    this.setState({
      isModal: true,
      customRecipeObj: {...recipeDetail, ingredient1, ingredient2, ingredient3}})
  }
  render() {
    let {favList, isModal, customRecipeObj} = this.state;
    return (
      <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={4}/>
        <div className={'container'}>
          <div className={'pt-5 fav-collection-wrapper'}>
            <Row className={'m-0 profile-wrapper'}>
              <Col md={12} className={'d-flex justify-content-between mb-3'}>
                <p className={'fr-font ma-title'}>MY FAVOURITES</p>
                <a className={'fr-font ma-a-tag'} onClick={()=>this.setState({isModal: true})}><Plus size={16} /> Add Item</a>
              </Col>
              {
                favList.map((obj, index) =>{
                  let ingredient1 = obj?.customRecipeIngredientDTOList?.[0]?.measurement ?? "";
                  let ingredient2 = obj?.customRecipeIngredientDTOList?.[0]?.measurementType ?? "";
                  let ingredient3 = obj?.customRecipeIngredientDTOList?.[0]?.ingredient ?? "";
                  return  <Col md={3} className={''} key={index}>
                    <div className={'fav-wrapper mb-2'}>
                      {obj?.recipeDetail && obj?.recipeDetail?.isUserCustomRecipe === false ? <img className={'cursor-pointer'} src={obj.recipeDetail.imageUrl} onClick={()=>this.recipeClickHandler(obj.recipeDetail.recipeDetailId, obj.favouriteUserRecipeId)} /> :
                        obj?.recipeDetail && obj?.recipeDetail?.isUserCustomRecipe === true ?
                          <div className={'ingredient-wrapper d-block custom-recipe-wrapper cursor-pointer'} onClick={()=>this.customRecipeEditHandler(obj.recipeDetail, ingredient1, ingredient2, ingredient3)}>
                            <p className={'p-title'}>{obj?.recipeDetail?.recipeName ?? "-"}</p>
                            <p className={'mb-0'}>{`(${ingredient1 ? ingredient1 : ''} ${ingredient2}) ${ingredient3}`}</p>
                            <p className={'p-sub'}>{obj?.recipeDetail?.customRecipeDescription ?? "-"}</p>
                          </div>:
                        <div className={'ingredient-wrapper'}>
                          <p>{`(${obj?.ingredientDetail?.measurement} ${obj?.ingredientDetail?.measurementType ?? ""})`}</p>
                        </div>}
                      {obj?.recipeDetail && obj?.recipeDetail?.isUserCustomRecipe === true ? null : <div className={'mb-1_'}>
                        <p className={'p-title'}>{obj?.recipeDetail?.recipeName ?? (obj?.ingredientDetail?.subTitle ?? obj?.ingredientDetail?.externalRecipe ?? obj?.ingredientDetail?.ingredient)}</p>
                      </div>}
                      <div className={'d-flex justify-content-between align-items-center'}>
                        <div className={'count-box d-flex justify-content-between align-items-center'}>
                          <button className={'prev-btn'} onClick={()=>this.countHandler(index, -1)}><Minus size={17}/></button>
                          <p className={'p-middle-title mb-0'}>{obj?.servingCount ?? "1"}</p>
                          <button className={'next-btn'} onClick={()=>this.countHandler(index, 1)}><Plus size={17}/></button>
                        </div>
                        <button className={'del-btn'} onClick={()=>this.removeHandler(obj.favouriteUserRecipeId)}><Trash2 size={17}/></button>
                      </div>
                    </div>
                  </Col>
                })
              }
            </Row>
          </div>
        </div>
        {isModal ? <Add customRecipeObj={customRecipeObj} closeHandler={(status) => this.closeHandler(status)} /> : null}
      </div>
    );
  }
  closeHandler = (status) => {
    if(status === null) {
      this.setState({isModal: false, customRecipeObj: null})
    }else{
      this.getFavCollections()
    }
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

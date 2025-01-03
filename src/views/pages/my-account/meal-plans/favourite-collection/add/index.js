import React,{Component} from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Dropdown} from "semantic-ui-react";
import {getCurrentPackageDetails} from "../../../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../../../configs/constant";
import {NO_TYPE} from "../../../../../../configs/constant";
import {history} from "../../../../../../history";
import * as commonFunc from "../../../../../../utility/commonFunc";
import {spinnerHandler} from "../../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
  getAllRecipes,
  getRecipeDetails, saveCustomRecipe, saveFavouriteCustomRecipe,
  saveFavouriteRecipe,
  updateCustomRecipe
} from "../../../../../../services/recipe";
import {getAllIngredients} from "../../../../../../services/ingredient";
import {getUserId, notifyMessage} from "../../../../../../utility/commonFunc";
import {priceInputRegex, priceRegex} from "../../../../../../utility/validator";
import {cloneDeep} from "lodash";

class App extends Component {
  state = {
    status: 1,list:[], listItem:null, rpObjs: [], inObjs: [], recipeDetailObj: null,
    name: "", ingredient1: "", ingredient2: "", ingredient3: "", description: "", nutrition: "",
    updateRecipeDetailId: null
  }
  dropdownHandler = (status) =>  (e, {value}) => {
    this.setState({[status]:value})
    if(status === "status" && value === 1) this.getAllRecipesHandler();
    if(status === "status" && value === 2) this.getAllIngredientsHandler();
    if(status === "status") this.setState({listItem: null})
    if(status === "listItem" && this.state.status === 1) return this.getRecipeDetails(value)
  }
  getRecipeDetails = (id) => {
    this.props.spinnerHandler(true)
    getRecipeDetails(id).then(response => {
      this.props.spinnerHandler(false)
      this.setState({recipeDetailObj: response?.result ?? null})

    })
  }
  componentDidMount() {
    this.getCurrentPackageDetailsHandler();
    let {customRecipeObj} = this.props;
    if(customRecipeObj) this.setState({updateRecipeDetailId: customRecipeObj.recipeDetailId, status: 4, name: customRecipeObj.recipeName, ingredient1: customRecipeObj.ingredient1.toString(), ingredient2: customRecipeObj.ingredient2.toString(), ingredient3: customRecipeObj.ingredient3.toString(), description: customRecipeObj?.customRecipeDescription ?? "", nutrition: customRecipeObj.carbsPerServe.toString()})
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
          this.getAllRecipesHandler();
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  getAllRecipesHandler = () => {
    this.props.spinnerHandler(true)
    getAllRecipes().then(response => {
      this.props.spinnerHandler(false)
      let result = response?.result ?? [];
      let list = [];
      result.map(obj => {
        list.push({value: obj.recipeDetailId, text: obj.recipeName, image: obj.imageUrl})
      })
      this.setState({list, rpObjs: result})
    })
  }
  getAllIngredientsHandler = () => {
    this.props.spinnerHandler(true)
    getAllIngredients().then(response => {
      this.props.spinnerHandler(false)
      let result = response?.result ?? [];
      let list = [];
      result.map(obj => {
        // list.push({value: obj.ingredientDetailId, text: `${obj?.ingredient} (${obj?.measurement} ${obj?.measurementType})`})
        list.push({value: obj.ingredientDetailId, text: `${obj?.subTitle ?? obj?.externalRecipe ?? obj?.ingredient}  ${obj.brand ? `(${obj.brand})` : ``}`})
      })
      this.setState({list, inObjs: result})
    })
  }
  addCustomRecipe = () => {
    let {
      name,
      ingredient1,
      ingredient2,
      ingredient3,
      description,
      nutrition, updateRecipeDetailId
    } = this.state;

    if (name.trim() === "") return notifyMessage("Name cannot be empty")
    if (ingredient1.trim() === "" || ingredient2.trim() === "" || ingredient3.trim() === "") return notifyMessage("Ingredient details cannot be empty")
    if (!priceRegex.test(ingredient1)) return notifyMessage("Invalid measurement value")
    if (nutrition === "") return notifyMessage("Nutrition cannot be empty")
    if (!priceRegex.test(nutrition)) return notifyMessage("Invalid nutrition")

    let obj = {
      "userDetailId": parseInt(getUserId()),
      "recipeName": name.trim(),
      "carbsPerServe": parseFloat(nutrition).toFixed(2),
      "customRecipeDescription": description.trim(),
      "customRecipeIngredientDTOList": [
        {"ingredient": ingredient3.trim(), "measurementType": ingredient2.trim(), "measurement": parseFloat(ingredient1).toFixed(2)}
      ]
    }

    let formData = new FormData();

    if(updateRecipeDetailId) { //update
      obj = {
        "recipeDetailId": updateRecipeDetailId,
        "recipeName": name.trim(),
        "carbsPerServe": parseFloat(nutrition).toFixed(2),
        "customRecipeDescription": description.trim(),
        "customRecipeIngredientDTOList": [
          {"ingredient": ingredient3.trim(), "measurementType": ingredient2.trim(), "measurement": ingredient1.trim()}
        ]
      }
      formData.append('recipeDetail', JSON.stringify(obj));
      this.props.spinnerHandler(true);
      updateCustomRecipe(formData).then(response => {
        this.props.spinnerHandler(false);
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
        if (response.code === 200) this.props.closeHandler(1)
      })
    }else{
      formData.append('recipeDetail', JSON.stringify(obj));
      this.props.spinnerHandler(true);
      saveFavouriteCustomRecipe(formData).then(response => {
        this.props.spinnerHandler(false);
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
        if (response.code === 200) this.props.closeHandler(1)
      })
    }


  }
  addHandler = () => {
    let {status, listItem, inObjs, rpObjs, recipeDetailObj} = this.state;
    if (status === 4) return this.addCustomRecipe();
    let ingredientList = [];
    let favouriteAdditionalIngredientDTOList = [];
    let obj = {
      "userDetailId": getUserId(),
      "recipeDetailId": status === 1 ? listItem : null,
      "ingredientDetailId":status === 2 ? listItem : null,
      "servingCount": 1,
      "favouriteRecipeIngredientDTOList":null,
      "favouriteAdditionalIngredientDTOList":null
    }
    if(status === 1) {

        recipeDetailObj.recipeIngredientDTOList.map(obj11 => {
          ingredientList.push({
            "ingredientDetailId": obj11?.ingredientDetail?.ingredientDetailId, "measurement": obj11?.measurement ? obj11?.measurement : ""})
        })
      recipeDetailObj.additionalIngredientDTOList.map(obj11 => {
        favouriteAdditionalIngredientDTOList.push({
          "ingredientDetailId": obj11?.ingredientDetail?.ingredientDetailId, "measurement": obj11?.measurement ? obj11?.measurement : ""})
      })

      obj.carbsPerServe = recipeDetailObj?.carbsPerServe ?? 1;
      obj.servingCount = recipeDetailObj?.servingCount ?? 1;
      obj.favouriteRecipeIngredientDTOList = ingredientList;
      obj.favouriteAdditionalIngredientDTOList = favouriteAdditionalIngredientDTOList;
      if(ingredientList.length === 0) return notifyMessage("At least one ingredient is required")
    }else{
      let findObj = inObjs.find(object => object.ingredientDetailId === listItem);
      obj.carbsPerServe = findObj?.carbs ?? 1;
    }
    saveFavouriteRecipe(obj).then(response => {
      notifyMessage(response.message, response.code === 200 ? 1 : 0)
      if(response.code === 200) this.props.closeHandler(1)
    })
  }
  render() {
    let {status, list, listItem,
      name, ingredient1, ingredient2, ingredient3, description, nutrition,updateRecipeDetailId} = this.state;
    return (
        <Modal centered={false} size={"md"} isOpen={true} >
          <ModalHeader className={'forgot-haader-modal email-verification-header'} toggle={()=>this.props.closeHandler(null)}>
            {updateRecipeDetailId ? 'Update Item':'Add Item'}
          </ModalHeader>
          <ModalBody className="modal-dialog-centered_ ">
            <div className={'body-modal-wrapper p-1'}>
              <div className={'mt-0 input-wrapper'}>
                <p className={''}>Choose Your Search</p>
                <Dropdown disabled={updateRecipeDetailId !== null} placeholder='Choose category' fluid search selection multiple={false} options={[{value: 1, text:"Search Recipes"},{value: 2, text:"Search Ingredients"},{value: 4, text:"Add Custom"}]} value={status} onChange={this.dropdownHandler('status')} selectOnBlur={false}/>

                {updateRecipeDetailId === null && status !== 4 ? <p className={'mt-2'}>{`Choose Your ${status === 1 ? "Recipes" : "Ingredients"} `}</p> : null}
                {updateRecipeDetailId === null && status !== 4 ? <Dropdown placeholder='' fluid search selection multiple={false} options={list} value={listItem} onChange={this.dropdownHandler('listItem')} selectOnBlur={false}/> : null}

              </div>
              {status === 4 ?
                <Row>
                  <Col md={12}>
                    <p className={`mt-2`}>Recipe Name</p>
                    <Input
                      type="text" placeholder="" value={name} onChange={e => this.setState({name: e.target.value})}/>
                  </Col>
                  <Col md={12}>
                    <hr/>
                    <p className={'mt-1 mb-1'}>Ingredient Details</p>
                  </Col>
                  <Col md={4}>
                    <p className={'mt-1'}>Measurement</p>
                    <Input type="text" placeholder="1" value={ingredient1}
                           onChange={e => {
                             if (priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({ingredient1: e.target.value})
                           }}/>
                  </Col>
                  <Col md={4}>
                    <p className={'mt-1'}>Type</p>
                    <Input type="text" placeholder="Cup" value={ingredient2}
                           onChange={e => this.setState({ingredient2: e.target.value})}/>
                  </Col>
                  <Col md={4}>
                    <p className={'mt-1'}>Name</p>
                    <Input type="text" placeholder="Olive Oil" value={ingredient3}
                           onChange={e => this.setState({ingredient3: e.target.value})}/>
                  </Col>
                  <Col md={12}>
                    <hr/>
                    <p className={'mt-1'}>Description</p>
                    <Input
                      type="text" placeholder="" value={description}
                      onChange={e => this.setState({description: e.target.value})}/>
                  </Col>
                  <Col md={12}>
                    <p className={'mt-1 mb-1'}>Nutrition Facts (per serving)</p>
                  </Col>
                  <Col md={4} className={'d-flex justify-content-center align-items-center'}>
                    <Input
                      type="text" placeholder="" value={nutrition} onChange={e => {
                      if (priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({nutrition: e.target.value})
                    }}/>
                    <p className={'ml-1'}>g</p>
                  </Col>
                  <Col md={8} className={'d-flex justify-content-start align-items-center'}>
                    <p>Carbs Consumed</p>
                  </Col>
                </Row> : null
              }
              <div className={'text-center'}>
                <button className={'submit-outline-btn mt-4'} onClick={this.addHandler}>{updateRecipeDetailId ? 'Update':'Add'}</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

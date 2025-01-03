import React,{Component} from 'react';
import './style.scss'
import TopButtons from "../../top-buttons";
import {Col, Row} from "reactstrap";
import {
  BASE_ROUTE_PATH,
  DAYS_5,
  DAYS_7,
  NO_TYPE,
  ROUTE_MA_MAIN_MEAL_PLANNER, ROUTE_MA_RECIPE_VIEW, SELECTED_TEMPLATE_ID,
  SESSIONS
} from "../../../../../configs/constant";
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {history} from "../../../../../history";
import * as constant from "../../../../../configs/constant";
import {getSelectedMealPlanDetails, saveMealPlan} from "../../../../../services/mealPlan";
import {getUserId, notifyMessage, toFixedNumber} from "../../../../../utility/commonFunc";
import {Minus, Plus, Trash2} from "react-feather";
import Add from "./add";
import {getCurrentPackageDetails} from "../../../../../services/package";
import Cookies from "js-cookie";
import * as commonFunc from "../../../../../utility/commonFunc";
import {getCarbLimit} from "../../../../../services/carb";
import cloneDeep from "lodash/cloneDeep";
let templateId_ = 0;
class App extends Component {
  state = {
    userMealPlanDTO: null,
    mealPlanDetailDTOList: [],
    isModalObj: null, dtoList: [], carbLimit: null, hideNFacts: false,
    customRecipeObj: null
  }
  getCarbLimitHandler = () => {
    getCarbLimit().then(response => {
      if(response.code === 200){
        this.setState({carbLimit: response.result.carbLimit})
      }else{
        this.setState({carbLimit: null})
      }
    })
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getCarbLimitHandler();
    this.getCurrentPackageDetailsHandler();
  }
  getCurrentPackageDetailsHandler = () => {
    this.props.spinnerHandler(true);
    getCurrentPackageDetails().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let results = response.result;
        if(results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        if(results[0].isExpired) {
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`)
        }else{
          this.getDataHandler();
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }

  getDataHandler = () => {
    let templateId = "148";
    templateId_ = templateId;
    if(templateId) {
      this.getMealTemplate(templateId)
    }else{
      history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_PLANS}`)
    }
  }

  getMealTemplate = (templateId) => {
    this.props.spinnerHandler(true);
    this.setState({isModalObj: null, customRecipeObj: null})
    getSelectedMealPlanDetails(templateId).then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let dtoList = response?.result?.mealPlanDetailDTOList ?? [];
        let userMealPlanDTO = response?.result?.userMealPlanDTO ?? [];
        let pureDataList = [];

        let finalizeSessionArr = [];
        dtoList.map(obj => {
          let sessionArr = [];
          SESSIONS.map(session => {
            let mealsList = [];
            obj.mealPlanRecipeIngriedientDTOList.map((inObj, ind) => {
              if(inObj.mealSession === session.value) {
                if(inObj.recipeDetailDTO) {
                  mealsList.push({customRecipeIngredientDTOList: inObj.customRecipeIngredientDTOList, recipeDetail: inObj.recipeDetailDTO, mealPlanRecipeIngriedientId: inObj.mealPlanRecipeIngriedientId, servingCount: inObj.servingCount})
                }else if(inObj.ingredientDetailDTO) {
                  mealsList.push({ingredientDetail: inObj.ingredientDetailDTO, mealPlanRecipeIngriedientId: inObj.mealPlanRecipeIngriedientId, servingCount: inObj.servingCount})
                }else if(inObj.favouriteUserRecipeDTO) {
                  if(inObj.favouriteUserRecipeDTO.recipeDetail) mealsList.push({isFavourite:true, recipeDetail: inObj.favouriteUserRecipeDTO.recipeDetail, mealPlanRecipeIngriedientId: inObj.mealPlanRecipeIngriedientId, servingCount: inObj.servingCount, favouriteUserRecipeId: inObj.favouriteUserRecipeDTO.favouriteUserRecipeId, favCarbsCount: inObj.favouriteUserRecipeDTO.carbsCount})
                  if(inObj.favouriteUserRecipeDTO.ingredientDetail) mealsList.push({isFavourite:true, ingredientDetail: inObj.favouriteUserRecipeDTO.ingredientDetail, mealPlanRecipeIngriedientId: inObj.mealPlanRecipeIngriedientId, servingCount: inObj.servingCount, favouriteUserRecipeId: inObj.favouriteUserRecipeDTO.favouriteUserRecipeId, favCarbsCount: inObj.favouriteUserRecipeDTO.carbsCount})
                }

              }
            })
            sessionArr.push({
              name: session.name,
              meals: mealsList
            })
          })
          finalizeSessionArr.push({
            ...obj, sessionArr
          })

          let pureIngList = [];
          obj.mealPlanRecipeIngriedientDTOList.map((inObj) => {
            let isActive = true;
            let pureObj = {
              mealSession: inObj.mealSession, servingCount: inObj.servingCount, mealPlanRecipeIngriedientId: inObj.mealPlanRecipeIngriedientId
            }
            if(inObj.recipeDetailDTO) {
              pureObj.recipeDetailDTO = { "recipeDetailId": inObj.recipeDetailDTO.recipeDetailId }
            }else if(inObj.ingredientDetailDTO) {
              pureObj.ingredientDetailDTO = { "ingredientDetailId": inObj.ingredientDetailDTO.ingredientDetailId }
            }else if(inObj.favouriteUserRecipeDTO) {
              pureObj.favouriteUserRecipeDTO = { "favouriteUserRecipeId": inObj.favouriteUserRecipeDTO.favouriteUserRecipeId }
            }else{
              isActive = false
            }
            if(isActive) pureIngList.push(pureObj)
          })
          pureDataList.push({dayName: obj.dayName, mealPlanRecipeIngriedientDTOList: pureIngList})
        })
        this.setState({userMealPlanDTO, mealPlanDetailDTOList:  finalizeSessionArr, dtoList: pureDataList})
      }else{
       notifyMessage(response.message)
        history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_PLANS}`)
      }
    })
  }
  countHandler = (mainIndex, sIndex, mIndex, count) => {

  }
  removeHandler = (mainIndex, sIndex, mIndex) => {

  }


  recipeClickHandler = (recipeId, isFavourite = false, favouriteUserRecipeId = 0) => {
    this.props.history.push({pathname: `${BASE_ROUTE_PATH}${ROUTE_MA_RECIPE_VIEW}/${recipeId}`, state: { recipeId: recipeId, isFavourite: isFavourite, favouriteUserRecipeId: favouriteUserRecipeId }})
  }
  customRecipeEditHandler = (recipeDetail, ingredient1, ingredient2, ingredient3, day, sessionName, currentCarbsCount) => {
    let {userMealPlanDTO} = this.state;
    this.setState({
      customRecipeObj: {...recipeDetail, ingredient1, ingredient2, ingredient3},
      isModalObj: {...userMealPlanDTO, day, sessionName: sessionName ? sessionName.toUpperCase().replaceAll(" ","_") : null, currentCarbsCount: currentCarbsCount}})
  }
  addMealPlanner = () => {
    let obj = {
      "userMealPlanDTO": {
        "userDetailId": getUserId(),
        "mealPlanName": "SAMPLE TEMPLATE",
      },
      "mealPlanDetailDTOList": []
    }
    let mealPlanDetailDTOList = [];
    DAYS_7.map(obj => {
      mealPlanDetailDTOList.push({"dayName": obj.value, "mealPlanRecipeIngriedientDTOList": []})
    })
    obj.mealPlanDetailDTOList = mealPlanDetailDTOList;
    this.props.spinnerHandler(true);
    saveMealPlan(obj).then(res => {
      this.props.spinnerHandler(false);
      notifyMessage(res.message, res.code === 200 ? 1 : 0)
      if(res.code === 200) history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_PLANS}`)
    })
  }
  //customRecipeEditHandler(mealObj.recipeDetail, ingredient1, ingredient2, ingredient3)
  render() {
    let {userMealPlanDTO, mealPlanDetailDTOList, isModalObj, dtoList, carbLimit, hideNFacts, customRecipeObj} = this.state;
    return (
      <div className={'bg-gray'}>
        <div className={' pt-0 pb-5 '}>
          <TopButtons activeIndex={-1}/>
          <div className={'container'}>
            {userMealPlanDTO ? <div className={'pt-5 meal-template-wrapper'}>
              <Row className={'m-0 profile-wrapper'}>
                <Col md={12} className={'d-flex justify-content-between mb-3'}>
                  <p className={'fr-font ma-title'}>{userMealPlanDTO?.mealPlanName ?? "-"}</p>
                  {/*<a className={'fr-font ma-a-tag'} onClick={()=>this.addMealPlanner()}>Add to meal planner</a>*/}
                </Col>
                <Row className={"m-0 w-100"}>
                  {
                    mealPlanDetailDTOList.map((obj,index) => {
                      let carbsCount = 0;
                      let balance = 0;
                     return <Col lg={3} md={4} sm={6} xs={12} key={index} className={'day-main-wrapper'}>
                        <div className={'day-wrapper'}>
                          <div className={'header-section d-flex justify-content-between align-items-center'}>
                            <p className={'fr-font uppercase'}>{DAYS_7.find(dayObj => dayObj.value === obj.dayName)?.name ?? "-"}</p>
                          </div>
                          <div className={`session-main-wrapper ${hideNFacts ? 'mb-0':''}`}>
                            {obj.sessionArr.map((sessionObj,sIndex) => {
                              return <div className={'session-wrapper'} key={sIndex}>
                                <p className={'session-name fr-font uppercase'}>{sessionObj.name}</p>
                                <div className={'session-body'}>
                                  {
                                    sessionObj.meals.map((mealObj, mIndex) => {
                                      if(mealObj.recipeDetail) {
                                        if(mealObj.favCarbsCount === undefined) {
                                          let normalCarbsCount = ((mealObj?.recipeDetail?.carbsPerServe ?? 0) / (mealObj?.recipeDetail?.servingCount ?? 1));
                                          carbsCount = carbsCount + ((normalCarbsCount) * (mealObj?.servingCount ?? 1));
                                        }else{
                                          let favCarbs = mealObj.favCarbsCount ? mealObj.favCarbsCount : (mealObj?.ingredientDetail?.carbs ?? 0);
                                          carbsCount = carbsCount + (favCarbs * (mealObj?.servingCount ?? 1));
                                        }

                                      }else if(mealObj.ingredientDetail){
                                        carbsCount = carbsCount + (mealObj?.ingredientDetail?.carbs * (mealObj?.servingCount ?? 1)) ?? 0;
                                      }
                                      balance = (carbLimit - carbsCount)

                                      let ingredient1 = mealObj?.customRecipeIngredientDTOList?.[0]?.measurement ?? "";
                                      let ingredient2 = mealObj?.customRecipeIngredientDTOList?.[0]?.measurementType ?? "";
                                      let ingredient3 = mealObj?.customRecipeIngredientDTOList?.[0]?.ingredient ?? "";

                                      return <div className={'fav-wrapper'} key={mIndex}>
                                        {mealObj?.recipeDetail && mealObj?.recipeDetail?.isUserCustomRecipe === false ? <img  className={'cursor-pointer_'} src={mealObj.recipeDetail.imageUrl} alt={"."}/> :
                                          mealObj?.recipeDetail && mealObj?.recipeDetail?.isUserCustomRecipe === true ?
                                            <div className={'ingredient-wrapper d-block custom-recipe-wrapper cursor-pointer_'} >
                                              <p className={'p-title'}>{mealObj?.recipeDetail?.recipeName ?? "-"}</p>
                                              <p className={'mb-0'}>{`(${ingredient1 ? ingredient1 : ''} ${ingredient2}) ${ingredient3}`}</p>
                                              <p className={'p-sub'}>{mealObj?.recipeDetail?.customRecipeDescription ?? "-"}</p>
                                            </div>:
                                          <div className={'ingredient-wrapper'}>
                                            <p>{`(${mealObj?.ingredientDetail?.measurement ?? ""} ${mealObj?.ingredientDetail?.measurementType ?? ""})`}</p>
                                          </div>}
                                        {mealObj?.recipeDetail && mealObj?.recipeDetail?.isUserCustomRecipe === true ? null : <div className={'mb-1_'}>
                                          <p className={'p-title'}>{mealObj?.recipeDetail?.recipeName ?? (mealObj?.ingredientDetail?.subTitle ?? mealObj?.ingredientDetail?.externalRecipe ?? mealObj?.ingredientDetail?.ingredient)}</p>
                                        </div>}
                                        {/*<div className={'d-flex justify-content-between align-items-center'}>*/}
                                        {/*  <div className={'count-box d-flex justify-content-between align-items-center'}>*/}
                                        {/*    <button className={'prev-btn'} onClick={()=>this.countHandler(index, sIndex, mIndex, -1)}><Minus size={15}/></button>*/}
                                        {/*    <p className={'p-middle-title mb-0'}>{mealObj?.servingCount ?? "1"}</p>*/}
                                        {/*    <button className={'next-btn'} onClick={()=>this.countHandler(index, sIndex, mIndex, 1)}><Plus size={15}/></button>*/}
                                        {/*  </div>*/}
                                        {/*</div>*/}
                                      </div>
                                    })
                                  }
                                </div>
                              </div>
                            })
                            }
                          </div>
                          {!hideNFacts ? <div className={'carbs-consumed-wrapper'}>
                            <p className={'fr-font'}>NUTRITION FACTS (PER SERVING)</p>
                            <p className={'mb-0-item'}><span className={'align-left'}>Carbs Consumed</span><span className={'float-right'}>{`${toFixedNumber(carbsCount)} g`}</span></p>
                            <p><span className={'align-left'}>Balance</span><span className={'float-right'}>{balance === 0 ? `${carbLimit ? toFixedNumber(carbLimit) : '0.0 '}g` : balance < 0 ? `(${toFixedNumber(balance).toString().substr(1)} g)`:`${toFixedNumber(balance)} g`}</span></p>
                          </div>:null}
                        </div>
                      </Col>
                    })
                  }
                  <Col lg={3} md={4} sm={6} xs={12}>
                    <button onClick={()=>this.setState({hideNFacts: !hideNFacts})} className={`hide-n-facts fr-font`}>{`${!hideNFacts ? 'HIDE':'SHOW'} NUTRITION FACTS`}</button>
                  </Col>
                </Row>

              </Row>
            </div>:null}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

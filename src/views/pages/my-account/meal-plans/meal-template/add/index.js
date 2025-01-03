import React, {Component} from 'react';
import {Input, Modal, ModalBody, ModalHeader, Row, Col} from "reactstrap";
import {Dropdown} from "semantic-ui-react";
import {getCurrentPackageDetails} from "../../../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../../../configs/constant";
import {DAYS_7, NO_TYPE, SESSIONS} from "../../../../../../configs/constant";
import {history} from "../../../../../../history";
import * as commonFunc from "../../../../../../utility/commonFunc";
import {spinnerHandler} from "../../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
  getAllRecipes,
  getFavouriteRecipes,
  saveCustomRecipe,
  saveFavouriteRecipe, updateCustomRecipe
} from "../../../../../../services/recipe";
import {getAllIngredients} from "../../../../../../services/ingredient";
import {getUserId, notifyMessage, toFixedNumber} from "../../../../../../utility/commonFunc";
import {cloneDeep} from "lodash";
import {saveMealPlan} from "../../../../../../services/mealPlan";
import {priceInputRegex, priceRegex} from "../../../../../../utility/validator";

class App extends Component {
  state = {
    status: 1, list: [], listItem: null, rpObjs: [], inObjs: [], favObjs: [], sessionType: "",
    name: "", ingredient1: "", ingredient2: "", ingredient3: "", description: "", nutrition: "",
    updateRecipeDetailId: null
  }
  dropdownHandler = (status) => (e, {value}) => {
    this.setState({[status]: value})
    if (status === "status" && value === 1) this.getAllRecipesHandler();
    if (status === "status" && value === 2) this.getAllIngredientsHandler();
    if (status === "status" && value === 3) this.getAllFavouritesHandler();
    if (status === "status") this.setState({listItem: null})
  }

  componentDidMount() {
    let {addObj, customRecipeObj} = this.props;
    if(customRecipeObj) this.setState({updateRecipeDetailId: customRecipeObj.recipeDetailId, status: 4, name: customRecipeObj.recipeName, ingredient1: customRecipeObj.ingredient1.toString(), ingredient2: customRecipeObj.ingredient2.toString(), ingredient3: customRecipeObj.ingredient3.toString(), description: customRecipeObj?.customRecipeDescription ?? "", nutrition: customRecipeObj.carbsPerServe.toString()})
    this.getCurrentPackageDetailsHandler();
    if (addObj.sessionName) this.setState({sessionType: addObj.sessionName})

    this.getAllRecipesHandler();
  }

  getCurrentPackageDetailsHandler = () => {
    this.props.spinnerHandler(true);
    getCurrentPackageDetails().then(response => {
      this.props.spinnerHandler(false);
      if (response.code === 200) {
        let results = response.result;
        if (results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        let resultObj = results[0]

        if (resultObj.isExpired) {
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`)
        } else {
          // this.getAllRecipesHandler();
        }
      } else {
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
        // list.push({value: obj.ingredientDetailId, text: `${obj?.ingredient} (${obj?.measurement ?? ""} ${obj?.measurementType ?? ""})`})
        list.push({value: obj.ingredientDetailId, text: `${obj?.subTitle ?? obj?.externalRecipe ?? obj?.ingredient} ${obj.brand ? `(${obj.brand})` : ``}`})
      })
      this.setState({list, inObjs: result})
    })
  }
  getAllFavouritesHandler = () => {
    this.props.spinnerHandler(true);
    getFavouriteRecipes().then(response => {
      this.props.spinnerHandler(false);
      let result = response?.result ?? [];
      let list = [];
      result.map(obj => {
        // let name = obj?.recipeDetail?.recipeName ?? `${obj?.ingredientDetail?.ingredient} (${obj?.ingredientDetail?.measurement ?? ""} ${obj?.ingredientDetail?.measurementType ?? ""})`
        let name = obj?.recipeDetail?.recipeName ?? `${obj?.ingredientDetail?.ingredient} ${obj?.ingredientDetail?.measurementType ?? ""}`
        list.push({value: obj.favouriteUserRecipeId, text: name, image: obj?.recipeDetail?.imageUrl ?? null})
      })
      this.setState({list, favObjs: result})
    })
  }
  addCustomRecipe = () => {
    let {
      status,
      listItem,
      inObjs,
      rpObjs,
      sessionType,
      favObjs,
      name,
      ingredient1,
      ingredient2,
      ingredient3,
      description,
      nutrition, updateRecipeDetailId
    } = this.state;
    let {addObj, dtoList, userMealPlanDTO, carbLimit, hideNFacts} = this.props;


    if (name.trim() === "") return notifyMessage("Name cannot be empty")
    if (ingredient1.trim() === "" || ingredient2.trim() === "" || ingredient3.trim() === "") return notifyMessage("Ingredient details cannot be empty")
    // if (name.trim() === "") return notifyMessage("Name cannot be empty")
    if (!priceRegex.test(ingredient1)) return notifyMessage("Invalid measurement value")
    if (nutrition === "") return notifyMessage("Nutrition cannot be empty")
    if (!priceRegex.test(nutrition)) return notifyMessage("Invalid nutrition")

    // alert("done...")
    //"userMealPlanDTO": {
    //         "userDetailId": parseInt(getUserId()),
    //         "mealPlanName": userMealPlanDTO.mealPlanName,
    //         "userMealPlanId": userMealPlanDTO.userMealPlanId
    //       },

    let availableCarbs = (carbLimit - (toFixedNumber(parseFloat(nutrition)) ?? 0))

    dtoList = cloneDeep(dtoList)

    let carbsCount = 0;

    let objTmp = {
      "mealSession": sessionType,
      "recipeDetailDTO": {"recipeDetailId": 0},
      "servingCount": 1
    }

    if(!hideNFacts) {
      if (availableCarbs < 0) {
        notifyMessage("The carb limit has already been exceeded", 2)
      } else if (availableCarbs < carbsCount) {
        notifyMessage("Carbs limit exceeded", 2)
      }
    }

    dtoList.map(obj => {
      if (obj.dayName === addObj.day) obj.mealPlanRecipeIngriedientDTOList.push(objTmp)
    })
    let obj = {
        "userDetailId": parseInt(getUserId()),
        "recipeName": name.trim(),
        "carbsPerServe": parseFloat(nutrition).toFixed(2),
        "customRecipeDescription": description.trim(),
        "customRecipeIngredientDTOList": [
          {"ingredient": ingredient3.trim(), "measurementType": ingredient2.trim(), "measurement": parseFloat(ingredient1).toFixed(2)}
        ]
      }
    let obj2 = {
      "userMealPlanDTO": {
        "userDetailId": parseInt(getUserId()),
        "mealPlanName": userMealPlanDTO.mealPlanName,
        "userMealPlanId": userMealPlanDTO.userMealPlanId
      },
      "mealPlanDetailDTOList": dtoList
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
        if (response.code === 200) this.props.closeHandler(response?.result ?? addObj.userMealPlanId)
      })
    }else{
      formData.append('recipeDetail', JSON.stringify(obj));
      formData.append('mealPlan', JSON.stringify(obj2));
      formData.append('mealPlanDayName', addObj.day)
      formData.append('mealPlanMealSession', addObj.sessionName)
      this.props.spinnerHandler(true);
      saveCustomRecipe(formData).then(response => {
        this.props.spinnerHandler(false);
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
        if (response.code === 200) this.props.closeHandler(response?.result ?? addObj.userMealPlanId)
      })
    }


  }
  addHandler = () => {
    //carbsPerServe  - carbsPerServe
    //carbs - measurement or 1
    // fav - recipeDetail
    // fav - ingredientDetail
    let {status, listItem, inObjs, rpObjs, sessionType, favObjs} = this.state;
    let {addObj, dtoList, userMealPlanDTO, carbLimit, hideNFacts} = this.props;

    if (status === 4) return this.addCustomRecipe();

    if (listItem === "" || listItem === null || sessionType === "") return notifyMessage("All fields are mandatory")
    let availableCarbs = (carbLimit - (addObj?.currentCarbsCount ?? 0))

    dtoList = cloneDeep(dtoList)

    let carbsCount = 0;

    let objTmp = {
      "mealSession": sessionType,
    }
    if (status === 1) {
      objTmp.recipeDetailDTO = {"recipeDetailId": listItem}
      objTmp.servingCount = rpObjs.find(obj => obj.recipeDetailId === listItem)?.servingCount ?? 1;

      let currentObj = rpObjs.find(obj => obj.recipeDetailId === listItem)
      carbsCount = (currentObj?.carbsPerServe ?? 0) / (currentObj?.servingCount ?? 1)
      // console.log("carbsCount:1",carbsCount)

    } else if (status === 2) {
      objTmp.ingredientDetailDTO = {"ingredientDetailId": listItem}
      objTmp.servingCount = inObjs.find(obj => obj.ingredientDetailId === listItem)?.servingCount ?? 1;

      let currentObj = inObjs.find(obj => obj.ingredientDetailId === listItem)
      carbsCount = (currentObj?.carbs ?? 0) / (currentObj?.measurement ?? 1)
      // console.log("carbsCount:2",carbsCount)

    } else if (status === 3) {
      objTmp.favouriteUserRecipeDTO = {"favouriteUserRecipeId": listItem}
      objTmp.servingCount = favObjs.find(obj => obj.favouriteUserRecipeId === listItem)?.servingCount ?? 1;

      let currentObj = favObjs.find(obj => obj.favouriteUserRecipeId === listItem)
      if (currentObj.recipeDetail) {
        carbsCount = (currentObj?.recipeDetail?.carbsPerServe ?? 0) / (currentObj?.recipeDetail?.servingCount ?? 1)
      } else {
        carbsCount = (currentObj?.ingredientDetail?.carbs ?? 0) / (currentObj?.ingredientDetail?.measurement ?? 1)
      }
      // console.log("carbsCount:3",carbsCount)
    }
    if(!hideNFacts) {
      if (availableCarbs < 0) {
        notifyMessage("The carb limit has already been exceeded", 2)
      } else if (availableCarbs < carbsCount) {
        notifyMessage("Carbs limit exceeded", 2)
      }
    }
    dtoList.map(obj => {
      if (obj.dayName === addObj.day) obj.mealPlanRecipeIngriedientDTOList.push(objTmp)
    })

    let obj = {
      "userMealPlanDTO": {
        "userDetailId": parseInt(getUserId()),
        "mealPlanName": userMealPlanDTO.mealPlanName,
        "userMealPlanId": userMealPlanDTO.userMealPlanId
      },
      "mealPlanDetailDTOList": dtoList
    }
    // console.log("dtoList",dtoList)
    this.props.spinnerHandler(true);
    saveMealPlan(obj).then(response => {
      this.props.spinnerHandler(false);
      notifyMessage(response.message, response.code === 200 ? 1 : 0)
      if (response.code === 200) this.props.closeHandler(response?.result ?? addObj.userMealPlanId)
    })
  }

  render() {
    let {
      status, list, listItem, sessionType,
      name, ingredient1, ingredient2, ingredient3, description, nutrition,updateRecipeDetailId
    } = this.state;
    let {addObj} = this.props;

    return (
      <Modal centered={false} size={"md"} isOpen={true}>
        <ModalHeader className={'forgot-haader-modal email-verification-header'}
                     toggle={() => this.props.closeHandler(null)}>
          {`${updateRecipeDetailId ? 'Update':'Add'} Item for ${DAYS_7.find(obj => obj.value === addObj.day)?.name ?? "-"}`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered_ ">
          <div className={'body-modal-wrapper p-1'}>
            <div className={'mt-0 input-wrapper'}>
              <p className={''}>Choose Your Search</p>
              <Dropdown placeholder='Choose From My Categories' fluid search selection multiple={false}
                        options={[{value: 4, text: "Add Custom"},{value: 1, text: "Search Recipes"}, {
                          value: 2,
                          text: "Search Ingredients"
                        }, {value: 3, text: "Search From My Favourites"}]}
                        value={status} onChange={this.dropdownHandler('status')} disabled={updateRecipeDetailId !== null} selectOnBlur={false}/>

              {addObj.sessionName ? null : <p className={'mt-2'}>{`Choose a suitable session below`}</p>}
              {addObj.sessionName ? null : <Dropdown placeholder='' fluid search selection multiple={false} options={SESSIONS}
                        disabled={addObj.sessionName} value={sessionType} onChange={this.dropdownHandler('sessionType')}
                        selectOnBlur={false}/>}

              {status !== 4 && status !== null ? <p
                className={'mt-2'}>{`Choose Your ${status === 1 ? "Recipes" : status === 2 ? "Ingredients" : "Favourite"}`}</p> : null}
              {status !== 4 && status !== null ?
                <Dropdown placeholder='' fluid search selection multiple={false} options={list} value={listItem}
                          onChange={this.dropdownHandler('listItem')} selectOnBlur={false}/> : null}
              {updateRecipeDetailId && status === 4 ? <hr/>:null}

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
            </div>
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

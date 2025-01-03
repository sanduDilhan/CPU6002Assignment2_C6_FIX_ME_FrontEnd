import React, {Component} from 'react';
import './style.scss'
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import TopButtons from "../../top-buttons";
import {
  getFavRecipeObj,
  getRecipeDetails, saveFavouriteRecipe, updateFavouriteRecipe
} from "../../../../../services/recipe";
import {getCurrentPackageDetails} from "../../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../../configs/constant";
import {NO_TYPE} from "../../../../../configs/constant";
import {history} from "../../../../../history";
import * as commonFunc from "../../../../../utility/commonFunc";
import ReactPlayer from 'react-player'
import {Circle, X, Youtube} from "react-feather";
import IngredientModal from "./ingredient-modal";
import {
  getUserId,
  measurementValue,
  notifyMessage,
  timeCalcHandler,
  toFixedNumber
} from "../../../../../utility/commonFunc";

class App extends Component {
  state = {
    isPreview: false, isIngredientModal: false, ingredients: [], editObj: null, isAlreadyFavourite: false,
    additionalIngredientDTOList: [], editRecipeName:"", isCancelTxt: false, isVideo: false
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getCurrentPackageDetailsHandler();
    // console.log(measurementValue(54.75))
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
          this.getRecipeDetailsHandler(1);
        }
      } else {
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  getRecipeDetailsHandler = (status = 0) => {
    // const urlParams = new URLSearchParams(window.location.search);
    // let recipeId = urlParams.get('recipeId');
    let recipeId = this?.props?.match?.params?.id;
    recipeId = recipeId ? recipeId : this?.props?.history?.location?.state?.recipeId;
    // let recipeId = this?.props?.history?.location?.state?.recipeId;
    let isAlreadyFavourite = this?.props?.history?.location?.state?.isFavourite ?? false;

    if(isAlreadyFavourite && status === 1) {
      this.getFavouriteRecipeDetails()

    }else if (recipeId) {
      this.getRecipeObject(recipeId)

    } else {
      history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_RECIPES}`)
    }
  }

  getFavouriteRecipeDetails = () => {
    let favId = this?.props?.history?.location?.state?.favouriteUserRecipeId;
    this.props.spinnerHandler(true)
    getFavRecipeObj(favId).then(response => {
      this.props.spinnerHandler(false)
      if (response.code === 200) {
        let result = response.result;
        let servingCount = result?.servingCount ?? 1
        let ingredients = []
        let allCarbPerServe = 0;
        if (result?.favouriteRecipeIngredientDTOList?.length > 0) {
          result.favouriteRecipeIngredientDTOList.map(obj => {
            let carbs = obj?.ingredientDetail?.carbs ?? 0;
            let originalMeasurement = obj?.ingredientDetail?.measurement ?? obj?.ingredientDetail?.tspOrQty ?? 1;
            let carbPerServe = ((carbs / (originalMeasurement ? originalMeasurement : 1)) * obj?.measurement) / servingCount;
            allCarbPerServe = allCarbPerServe + carbPerServe;

            ingredients.push({
              "ingredientDetailId": obj?.ingredientDetail?.ingredientDetailId,
              "ingredient": obj?.ingredientDetail?.ingredient,
              "brand": obj?.ingredientDetail?.brand,
              "tspOrQty": obj?.ingredientDetail?.tspOrQty,
              "measurementType": obj?.ingredientDetail?.measurementType ?? "",
              "measurement": obj?.measurement, //obj?.ingredientDetail?.measurement,
              "carbs": carbs,
              "carbsCount": carbPerServe,
              "externalRecipe": obj?.ingredientDetail?.externalRecipe,
              "subTitle": obj?.ingredientDetail?.subTitle,
            })
          })
        }

        let favouriteAdditionalIngredientDTOList = [];
        if(response?.result?.favouriteAdditionalIngredientDTOList){
          response.result.favouriteAdditionalIngredientDTOList.map(obj => {
            let carbs = obj?.ingredientDetail?.carbs ?? 0;
            let originalMeasurement = obj?.ingredientDetail?.measurement ?? obj?.ingredientDetail?.tspOrQty ?? 1;
            let carbPerServe = ((carbs / (originalMeasurement ? originalMeasurement : 1)) * obj?.measurement) / servingCount;
            allCarbPerServe = allCarbPerServe + carbPerServe;

            favouriteAdditionalIngredientDTOList.push({
              ingredientDetail: {
                "ingredientDetailId": obj?.ingredientDetail?.ingredientDetailId,
                "ingredient": obj?.ingredientDetail?.ingredient,
                "brand": obj?.ingredientDetail?.brand,
                "tspOrQty": obj?.ingredientDetail?.tspOrQty,
                "measurementType": obj?.ingredientDetail?.measurementType ?? "",
                "measurement": obj?.measurement, //obj?.ingredientDetail?.measurement,
                "carbs": carbs,
                "carbsCount": carbPerServe,
                "externalRecipe": obj?.ingredientDetail?.externalRecipe,
                "subTitle": obj?.ingredientDetail?.subTitle,
              }
            })
          })
        }

        this.setState({...response.result.recipeDetail, isPreview: true, ingredients, carbsPerServe: toFixedNumber(allCarbPerServe), isAlreadyFavourite: true,
          recipeInstructionDTOList: response.result.recipeInstructionDTOList,
          recipeNoteDTOList: response.result.recipeNoteDTOList,
          servingCount: response.result.servingCount,

          additionalTopic: response.result.recipeDetail.additionalTopic,
          additionalIngredientDTOList: favouriteAdditionalIngredientDTOList,
          editRecipeName: response?.result?.recipeDetail?.recipeName ?? ""
          // additionalIngredientDTOList: response?.result?.favouriteAdditionalIngredientDTOList ?? []
        })
      //  favouriteAdditionalIngredientDTOList
      //  recipeDetail.additionalTopic

        }
    })
  }

  getRecipeObject = (recipeId = null) => {
    recipeId = recipeId ? recipeId : this?.props?.history?.location?.state?.recipeId;
    let isAlreadyFavourite = this?.props?.history?.location?.state?.isFavourite ?? false;

    this.props.spinnerHandler(true)
    getRecipeDetails(recipeId).then(response => {
      this.props.spinnerHandler(false)
      if (response.code === 200) {
        let result = response.result;
        let servingCount = result?.servingCount ?? 1
        let ingredients = []
        let allCarbPerServe = 0;
        if (result?.recipeIngredientDTOList?.length > 0) {
          result.recipeIngredientDTOList.map(obj => {
            let carbs = obj?.ingredientDetail?.carbs ?? 0;
            let originalMeasurement = obj?.ingredientDetail?.measurement ?? obj?.ingredientDetail?.tspOrQty ?? 1;
            let carbPerServe = ((carbs / (originalMeasurement ? originalMeasurement : 1)) * obj?.measurement) / servingCount;
            allCarbPerServe = allCarbPerServe + carbPerServe;
            // console.log("normal carbPerServe:",`${obj?.ingredientDetail?.ingredient} - ${carbPerServe}`)
            ingredients.push({
              "ingredientDetailId": obj?.ingredientDetail?.ingredientDetailId,
              "ingredient": obj?.ingredientDetail?.ingredient,
              "brand": obj?.ingredientDetail?.brand,
              "tspOrQty": obj?.ingredientDetail?.tspOrQty,
              "measurementType": obj?.ingredientDetail?.measurementType ?? "",
              "measurement": obj?.measurement, //obj?.ingredientDetail?.measurement,
              "carbs": carbs,
              "carbsCount": carbPerServe,
              "externalRecipe": obj?.ingredientDetail?.externalRecipe,
              "subTitle": obj?.ingredientDetail?.subTitle,
            })
          })
        }
        let additionalIngredientDTOList = [];
        if(response?.result?.additionalIngredientDTOList){
          response.result.additionalIngredientDTOList.map(obj => {
            let carbs = obj?.ingredientDetail?.carbs ?? 0;
            let originalMeasurement = obj?.ingredientDetail?.measurement ?? obj?.ingredientDetail?.tspOrQty ?? 1;
            let carbPerServe = ((carbs / (originalMeasurement ? originalMeasurement : 1)) * obj?.measurement) / servingCount;
            console.log("add carbPerServe:",`${obj?.ingredientDetail?.ingredient} - ${carbPerServe}`)
            allCarbPerServe = allCarbPerServe + carbPerServe;

            additionalIngredientDTOList.push({
              ingredientDetail: {
                "ingredientDetailId": obj?.ingredientDetail?.ingredientDetailId,
                "ingredient": obj?.ingredientDetail?.ingredient,
                "brand": obj?.ingredientDetail?.brand,
                "tspOrQty": obj?.ingredientDetail?.tspOrQty,
                "measurementType": obj?.ingredientDetail?.measurementType ?? "",
                "measurement": obj?.measurement, //obj?.ingredientDetail?.measurement,
                "carbs": carbs,
                "carbsCount": carbPerServe,
                "externalRecipe": obj?.ingredientDetail?.externalRecipe,
                "subTitle": obj?.ingredientDetail?.subTitle,
              }
            })
          })
        }
        console.log("allCarbPerServe",allCarbPerServe)
        this.setState({...response.result, editRecipeName:response?.result?.recipeName ?? "",  isPreview: true, ingredients, carbsPerServe: toFixedNumber(allCarbPerServe), isAlreadyFavourite: isAlreadyFavourite,
          additionalTopic: response?.result?.additionalTopic ?? null, additionalIngredientDTOList})
      }
    })
  }

  removeItemHandler = (index, isAdditional = false) => {
    let {ingredients, additionalIngredientDTOList} = this.state;
    let carbsCount = 0
    if(isAdditional) {
      // if (additionalIngredientDTOList.length === 1) return notifyMessage("At least one additional ingredient is required")
      additionalIngredientDTOList.splice(index, 1);
      additionalIngredientDTOList.map(obj => {
        carbsCount = carbsCount + obj?.ingredientDetail?.carbsCount ?? 0
      })
      ingredients.map(obj => {
        carbsCount = carbsCount + obj?.carbsCount ?? 0
      })

      this.setState({additionalIngredientDTOList, carbsPerServe: toFixedNumber(carbsCount)})
    }else{
      if (ingredients.length === 1) return notifyMessage("At least one ingredient is required")
      ingredients.splice(index, 1);
      ingredients.map(obj => {
        carbsCount = carbsCount + obj?.carbsCount ?? 0
      })
      additionalIngredientDTOList.map(obj => {
        carbsCount = carbsCount + obj?.ingredientDetail?.carbsCount ?? 0
      })

      this.setState({ingredients, carbsPerServe: toFixedNumber(carbsCount)})
    }


  }
  rangeSelector = (value) => {
    value = parseInt(value)
    let {ingredients, servingCount} = this.state;
    // this.setState({servingCount: parseInt(value)})
    ingredients.map(obj => {
      let measurement = (obj.measurement / servingCount) * value;
      obj.measurement = parseFloat(parseFloat(parseFloat(measurement).toFixed(2)));
    })
    this.setState({servingCount: value, ingredients})
  }
  saveFavouriteHandler = () => {
    let stateObj = this.state;
    let recipeId = this?.props?.match?.params?.id;
    let ingredientList = [];
    let additionalIngredientList = [];
    let obj = {
      "userDetailId": getUserId(),
      "recipeDetailId": recipeId ? recipeId : this?.props?.history?.location?.state?.recipeId,
      "ingredientDetailId": null,
      "carbsCount": stateObj?.carbsPerServe,
      "servingCount": stateObj?.servingCount,
      "favouriteRecipeIngredientDTOList": [],
      "favouriteAdditionalIngredientDTOList": [],
      "editFavouriteRecipeName": stateObj.editRecipeName.trim(),
    }
    stateObj.ingredients.map(obj => {
      ingredientList.push({
        "ingredientDetailId": obj.ingredientDetailId, "measurement": obj.measurement
      })
    })
    stateObj.additionalIngredientDTOList.map(obj_ => {
      let obj = obj_.ingredientDetail;
      additionalIngredientList.push({
        "ingredientDetailId": obj.ingredientDetailId, "measurement": obj.measurement
      })
    })

    obj.favouriteRecipeIngredientDTOList = ingredientList;
    obj.favouriteAdditionalIngredientDTOList = additionalIngredientList;

    if (ingredientList.length === 0) return notifyMessage("At least one ingredient is required");
    this.props.spinnerHandler(true)

    if(stateObj.isAlreadyFavourite) {
      let updateObj = {
        "editFavouriteRecipeName": stateObj.editRecipeName.trim(),
        "favouriteUserRecipeId": this?.props?.history?.location?.state?.favouriteUserRecipeId,
        "carbsCount":obj.carbsCount,
        "servingCount":obj.servingCount,
        "favouriteRecipeIngredientDTOList": ingredientList,
        "favouriteAdditionalIngredientDTOList": additionalIngredientList
      }

      updateFavouriteRecipe(updateObj).then(response => {
        this.props.spinnerHandler(false)
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
        if (response.code === 200) history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_FAVOURITE_RECIPES}`)
      })
    }else{
      saveFavouriteRecipe(obj).then(response => {
        this.props.spinnerHandler(false)
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
        if (response.code === 200) history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_FAVOURITE_RECIPES}`)
      })
    }
  }

  render() {
    let stateObj = this.state;
    return (
      <div className={'recipe-view-wrapper'}>
        <div className={'pt-0 pb-5 '}>
          <TopButtons activeIndex={-1}/>
          <div className={'container pb-5____ yellow-clr'}>

            {stateObj.isPreview ? <div className={'pt-1'}>
              <Row className={'m-0 profile-wrapper'}>
                <Col md={12} className={'img-wrapper pl-0__ d-flex'}>
                  {stateObj.imageUrl ? <img src={stateObj?.imageUrl} className={'w-100_ mb-1'}/> : null}
                </Col>
                <Col md={12} className={'name-main-wrapper p-0'}>
                  <div className={'text-center'}>
                    <div className={'recipe-name-wrapper'}>
                      {!stateObj.isCancelTxt ? <p className={'recipe-name mt-0 mb-0'}>{stateObj?.recipeName ?? "N/A"}</p>:
                        <Input
                          type="text" placeholder="" value={stateObj.editRecipeName} onChange={e => this.setState({editRecipeName: e.target.value})}/>}
                      {stateObj?.youtubeVideoUrl ? <Youtube color={'#FF0000'} className={'ml-1'} onClick={()=>this.setState({isVideo: true})}/> :null}
                    </div>
                    <div className={'cancel-text-wrapper'}>
                      {!stateObj.isCancelTxt ? <a onClick={()=>this.setState({isCancelTxt: true})}>EDIT RECIPE NAME</a> : <a onClick={()=>this.setState({isCancelTxt: false, editRecipeName: stateObj.recipeName})}>CANCEL</a>}
                    </div>
                    <button className={'fav1-btn'} onClick={this.saveFavouriteHandler}>{`${stateObj.isAlreadyFavourite ? `Update`:`Save`} to Favourites`}</button>
                  </div>
                  <Row className={'m-0 middle-section mt-3'}>
                    <Col xs={4} className={'middle-wrapper text-center'}>
                      <p className={'mt-0 bold'}>{`Prep Time`}</p>
                      <p className={'mt-0'}>{timeCalcHandler(stateObj?.preparationTime)}</p>
                    </Col>
                    <Col xs={4} className={'middle-wrapper text-center'}>
                      <p className={'bold'}>{`Cook Time`}</p>
                      <p>{timeCalcHandler(stateObj?.cookTime)}</p>
                    </Col>
                    <Col xs={4} className={'middle-wrapper text-center'}>
                      <p className={'bold'}>{`Total Time`}</p>
                      <p>{timeCalcHandler((stateObj?.cookTime ?? 0) + (stateObj?.preparationTime ?? 0))}</p>
                    </Col>
                  </Row>

                  <div className={'mt-3 ranger-wrapper'}>
                    <Input
                      min={1} max={20} name='duration' className={'range-input'}
                      onChange={(e) => this.rangeSelector(e.target.value)} step={1} type='range'
                      value={stateObj?.servingCount ?? 1}
                    />
                    <p className={'bold text-center'}>{`Serving : `}<span className={'green-clr'}>{`${stateObj?.servingCount ?? "N/A"}`}</span></p>
                  </div>
                  <p className={'bold mt-1 text-center'}>{`Carbs Per Serving : `}<span className={'green-clr'}>{`${stateObj?.carbsPerServe ?? "0"}g`}</span></p>
                </Col>

                <Row className={'m-0 w-100 content-1-wrapper con-1-mt'}>
                  {/* --- Ingredients --- */}
                  <Col md={12} className={'m-0_'}>
                    <p className={`bold mt-3 ${stateObj.mainIngredientTopic ? 'mb-2':'mb-2'} title-bold`}>Ingredients</p>
                    {stateObj.mainIngredientTopic ? <p className={'bold mt-0 mb-2 title-bold-semi'}>{stateObj.mainIngredientTopic}</p> :null}
                  </Col>
                  <Row className={'m-0 w-100'}>
                    <Col md={12}>
                      {stateObj.ingredients.map((obj, index) => {
                        return <div className={`ingredient-wrapper`} key={index}>
                          <p className={'mb-0'}>{`${measurementValue(obj?.measurement)} ${obj?.measurementType ?? ""} ${obj?.subTitle ?? obj?.externalRecipe ?? obj?.ingredient}`} <a
                            onClick={() => this.setState({editObj: obj, isIngredientModal: true, isAdditional: false})}>Edit</a></p>
                          <button onClick={() => this.removeItemHandler(index, false)}><X size={14}/></button>
                        </div>
                      })}
                    </Col>
                    <Col md={12} className={'add-reset-main-wrapper'}>
                      <div className={'add-reset-wrapper_'}>
                        <button className={'fav-btn mr-1'} onClick={() => this.setState({isIngredientModal: true, isAdditional: false})}>Add
                        </button>
                        <button className={'fav-btn mt-1'} onClick={this.getRecipeDetailsHandler}>Reset</button>
                      </div>
                    </Col>
                  </Row>

                  {/* Additional Ingredients */}
                  {stateObj?.additionalTopic && <Col md={12} className={'m-0_ mt-2'}>
                    <p className={'bold mt-2 mb-2 title-bold-semi'}>{stateObj.additionalTopic}</p>
                  </Col>}
                  {stateObj?.additionalTopic && <Row className={'m-0 w-100'}>
                    <Col md={12}>
                      {stateObj.additionalIngredientDTOList.map((obj_, index) => {
                        let obj = obj_.ingredientDetail;
                        return <div className={`ingredient-wrapper`} key={index}>
                          <p className={'mb-0'}>{`${measurementValue(obj?.measurement)} ${obj?.measurementType ?? ""} ${obj?.subTitle ?? obj?.externalRecipe ?? obj?.ingredient}`} <a
                            onClick={() => this.setState({editObj: obj, isIngredientModal: true, isAdditional: true})}>Edit</a></p>
                          <button onClick={() => this.removeItemHandler(index, true)}><X size={14}/></button>
                        </div>
                      })}
                    </Col>
                    <Col md={12} className={'add-reset-main-wrapper'}>
                      <div className={'add-reset-wrapper_'}>
                        <button className={'fav-btn mr-1'} onClick={() => this.setState({isIngredientModal: true, isAdditional: true})}>Add
                        </button>
                        <button className={'fav-btn mt-1'} onClick={this.getRecipeDetailsHandler}>Reset</button>
                      </div>
                    </Col>
                  </Row>}

                  {/* --- Instructions --- */}

                  {stateObj?.recipeInstructionDTOList?.length > 0 && <Col md={12} className={'m-0_'}>
                    <p className={'bold mt-4 mb-2 title-bold'}>Instructions</p>
                  </Col>}
                  {stateObj?.recipeInstructionDTOList && stateObj?.recipeInstructionDTOList.map((obj, index) => {
                    return <Col md={12} key={index}>
                      <div className={`instruction-wrapper`}>
                        <p><label className={'lbl-1'}>{`${index + 1}.`}</label> <label>{obj.description}</label></p>
                      </div>
                    </Col>
                  })}
                </Row>

                {/* --- Notes --- */}

                <Row className={'m-0 w-100 content-1-wrapper pb-1'}>
                  {stateObj?.recipeNoteDTOList?.length > 0 && <Col md={12} className={'m-0_'}>
                    <p className={'bold mt-4 title-bold'}>Notes</p>
                  </Col>}
                  <Col md={12} className={'m-0_ mt-2'}>
                    {stateObj?.recipeNoteDTOList && stateObj?.recipeNoteDTOList.map((obj, index) => {
                      return <div className={`instruction-wrapper `} key={index}>
                        <p><div className={'lbl-1'}><img style={{width:'8px'}} src={require("../../../../../assets/img/icons/circle.png")} /></div> <div dangerouslySetInnerHTML={{__html: obj.description}}></div></p>
                      </div>
                    })}
                  </Col>
                </Row>

              </Row>
              <Row className={'m-0 footer-pro-wrapper'}>
                <Col md={12} className={'p-0'}>
                  <div className={'note-wrapper'}>
                    <p className={'bold'}>Please note,</p>
                    <p>
                      The carb counts are subject to change as they may vary slightly between brands and research
                      sources. Also, brands themselves sporadically update their products and consequently, their
                      nutrition values. If you are alerted to a change before we’ve updated it, please let us know!
                    </p>
                  </div>
                </Col>
              </Row>
            </div> : null}
          </div>

          {stateObj.isIngredientModal ?
            <IngredientModal editObj={stateObj.editObj} closeHandler={(obj) => this.closeHandler(obj)}/> : null}

          {stateObj.isVideo ? <Modal centered={true} size={"lg"} isOpen={stateObj.isVideo} >
            <ModalHeader className={'forgot-haader-modal'} toggle={()=>this.setState({isVideo: false})}>
              {stateObj.editRecipeName}
            </ModalHeader>
            <ModalBody className="modal-dialog-centered_ forgot-psw-wrapper">
              <div className={'video-wrapper'}>
                <ReactPlayer url={stateObj?.youtubeVideoUrl}/>
              </div>
            </ModalBody>
          </Modal>:null}

        </div>
      </div>
    );
  }

  closeHandler = (obj) => {
    let {isAdditional, additionalIngredientDTOList} = this.state;
    if (obj === null) {
      this.setState({isIngredientModal: false, editObj: null, isAdditional: false})
    } else {
      let {ingredients, servingCount} = this.state;
      let isFound = false;
      if(isAdditional) {
        let carbsCount = 0
        additionalIngredientDTOList.map(obj1_ => {
          let obj1 = obj1_.ingredientDetail;
          if (obj1.ingredientDetailId === obj.ingredientDetailId) {
            isFound = true;
            obj1.measurement = parseFloat(parseFloat(parseFloat(obj.measurement).toFixed(2)));
            obj1.carbsCount = ((obj.carbs / (obj.originalMeasurement ? obj.originalMeasurement : 1)) * (obj.measurement ?? 1)) / servingCount
            // carbsCount = carbsCount + obj1.carbsCount //prev
          }
        })
        if (!isFound) additionalIngredientDTOList.push({
            ingredientDetail: {
              ...obj,
              carbsCount: ((obj.carbs / (obj.originalMeasurement ? obj.originalMeasurement : 1)) * (obj?.measurement ?? 1)) / servingCount
            }
          })

        ingredients.map(obj => {
          carbsCount = carbsCount + obj?.carbsCount ?? 0
        })
        additionalIngredientDTOList.map(obj => {
          carbsCount = carbsCount + obj?.ingredientDetail?.carbsCount ?? 0
        })

        this.setState({additionalIngredientDTOList, isIngredientModal: false,isAdditional: false, editObj: null, carbsPerServe: toFixedNumber(carbsCount)})
      }else{
        let carbsCount = 0
        ingredients.map(obj1 => {
          if (obj1.ingredientDetailId === obj.ingredientDetailId) {
            isFound = true;
            obj1.measurement = parseFloat(parseFloat(parseFloat(obj.measurement).toFixed(2)));
            obj1.carbsCount = ((obj.carbs / (obj.originalMeasurement ? obj.originalMeasurement : 1)) * (obj.measurement ?? 1)) / servingCount
          }
        })

        if (!isFound) ingredients.push({
            ...obj,
            carbsCount: ((obj.carbs / (obj.originalMeasurement ? obj.originalMeasurement : 1)) * (obj?.measurement ?? 1)) / servingCount
          })

        ingredients.map(obj => {
          carbsCount = carbsCount + obj?.carbsCount ?? 0
        })
        additionalIngredientDTOList.map(obj => {
          carbsCount = carbsCount + obj?.ingredientDetail?.carbsCount ?? 0
        })
        this.setState({ingredients, isIngredientModal: false, editObj: null, carbsPerServe: toFixedNumber(carbsCount)})
      }

    }

  }
}

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

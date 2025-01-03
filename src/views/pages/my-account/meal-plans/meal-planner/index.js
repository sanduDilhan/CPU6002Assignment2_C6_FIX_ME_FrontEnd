import React, {Component} from 'react';
import './style.scss'
import TopButtons from "../../top-buttons";
import {Row, Col, Input} from "reactstrap";
import DraggableList from "react-draggable-list";
import Template from "./templete";
import Icon1 from '../../../../../assets/img/icons/icon1.png'
import Icon2 from '../../../../../assets/img/icons/icon2.png'
import Icon3 from '../../../../../assets/img/icons/icon3.png'
import Icon4 from '../../../../../assets/img/icons/icon4.png'
import {withRouter} from "react-router-dom";
import * as constant from "../../../../../configs/constant";
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {getCurrentPackageDetails} from "../../../../../services/package";
import Cookies from "js-cookie";
import {NO_TYPE} from "../../../../../configs/constant";
import {history} from "../../../../../history";
import * as commonFunc from "../../../../../utility/commonFunc";
import {
  copyMealPlan,
  deleteMealPlan,
  getAllMealPlans,
  getSelectedMealPlanDetails, saveMealPlan,
  updateMealPlanName
} from "../../../../../services/mealPlan";
import {Copy, Trash2} from "react-feather";
import cloneDeep from "lodash/cloneDeep";
import {getUserId, notifyMessage} from "../../../../../utility/commonFunc";

class App extends Component {
  state = {
    collection: [
      // {key: 1, id: 0, name: "SAMPLE TEMPLATE"},
      // {key: 2, id: 1, name: "MEAL PLANNER OPEN - 7 DAYS"},
      // {key: 3, id: 2, name: "MEAL PLANNER OPEN - 5 DAYS"},

      // {key: 4, name: ""},
      // {key: 4, name: ""},
      // {key: 4, name: ""},
    ], isEdit: false, editableList: []
  }

  _onListChange(newList) {
    // let body = [];
    // let updatedList = [];
    // console.log("newList",newList)
    // let isNotSave = false;
    // newList.map((obj,index) => {
    //   if(obj.id > 0) body.push({"id": obj.id, "priorityLevel": (index+1)})
    //   if(obj.id === 0) isNotSave = true;
    // })
    // if(!isNotSave) {
    //   newList.map((obj,index) => {
    //     updatedList.push({...obj, key: index})
    //   })
    // }
    this.setState({collection: newList})

  }
  componentDidMount() {
    window.scrollTo(0, 0);
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
          this.getCurrentMealPlans();
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  getCurrentMealPlans = () => {
    this.props.spinnerHandler(true);
    getAllMealPlans().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let result = response.result;
        let collection = [];
        result.map((obj,index) => {
          collection.push({key: index, id: obj.userMealPlanId, name: obj.mealPlanName})
        })
        this.setState({collection, editableList: cloneDeep(collection)})
      }
    })
  }
  deleteHandler = (id) => {
    this.props.spinnerHandler(true);
    let formData = new FormData();
    formData.append('userMealPlanId', id);
    deleteMealPlan(formData).then(response => {
      this.props.spinnerHandler(false);
      commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
      if (response.code === 200) this.getCurrentMealPlans();
    })
  }
  copyHandler = (id) => {
    this.props.spinnerHandler(true);
    let formData = new FormData();
    // formData.append('userMealPlanId', id);
    // copyMealPlan(formData).then(response => {
    //   this.props.spinnerHandler(false);
    //   commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
    //   if (response.code === 200) this.getCurrentMealPlans();
    // })
    getSelectedMealPlanDetails(id).then(response => {
      if(response.code === 200) {
        let dtoList = response?.result?.mealPlanDetailDTOList ?? [];
        let userMealPlanDTO = response?.result?.userMealPlanDTO;

        let obj = {
          "userMealPlanDTO": {
            "userDetailId": getUserId(),
            "mealPlanName": userMealPlanDTO?.mealPlanName,
          },
          "mealPlanDetailDTOList": dtoList
        }
        saveMealPlan(obj).then(res => {
          this.props.spinnerHandler(false);
          notifyMessage(res.message, res.code === 200 ? 1 : 0)
          if(res.code === 200) this.getCurrentMealPlans();
        })
      }else{
        this.props.spinnerHandler(false);
        notifyMessage(response.message)
      }

      // console.log("response",response)
    })
  }
  mealPlanNameHandler = (index, value) => {
    if(this.updateMealPlaneNameTimeOut) clearTimeout(this.updateMealPlaneNameTimeOut)
    let {editableList, collection} = this.state;
    editableList[index].name = value;
    collection[index].name = value;
    this.setState({editableList, collection})

    let formData = new FormData();
    formData.append('userMealPlanId', editableList[index].id);
    formData.append('mealPlanName', editableList[index].name);

    this.updateMealPlaneNameTimeOut = setTimeout(()=>{
      updateMealPlanName(formData).then(() => {})
    },1000)
  }
  render() {
    let {collection, isEdit, editableList} = this.state;
    return (
      <div className={'meal-planner-wrapper'}>
        <div className={' pt-0 pb-5 '}>
          <TopButtons activeIndex={3}/>
          <div className={'container'}>
            <div className={'pt-3  '}>
              <Row className={'m-0 pb-5 row-wrapper'}>
                <Col md={12} className={'header-section'}>
                  <p className={"fr-font"}>My Meal Plans</p>
                  <p className={'cursor-pointer'} onClick={()=> this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_FAVOURITE_RECIPES}`)}>MY FAVOURITES</p>
                </Col>
                {!isEdit ? <Col md={12} className={'draggable-container-dhjer'}>
                  <DraggableList
                    itemKey="id"
                    className={'test--'}
                    template={Template}
                    list={collection}
                    onMoveEnd={(newList) => this._onListChange(newList)}
                    container={() =>
                      false ? this._container.current : document.body
                    }
                  />
                </Col>:
                <Col md={12} className={''}>
                  {
                    editableList.map((obj,index) => {
                      return <div key={index} className={'editable-raw-wrapper'}>
                        <button onClick={()=>this.deleteHandler(obj.id)}><Trash2 size={18} color={"#6E6E6EFF"}/></button>
                        <button onClick={()=>this.copyHandler(obj.id)}><Copy size={18} color={"#6E6E6EFF"} /></button>
                        <Input value={obj.name} onChange={e => this.mealPlanNameHandler(index, e.target.value)} />
                      </div>
                    })
                  }
                </Col>}
                {collection.length > 0 ? <Col md={12} className={''}>
                  <button className={'edit-meal-btn'} onClick={()=>this.setState({isEdit: !isEdit})}>{isEdit ? "Stop Editing" : "Edit Meal Planner"}</button>
                </Col>:null}
              </Row>
            </div>
          </div>
        </div>
        <div className={'legend-wrapper pb-5'}>
          <div className={'container'}>
            <Row className={'m-0'}>
              <Col md={12} className={'pt-3 pb-3'}>
                <p className={'fr-font'}>LEGEND</p>
              </Col>

              <Col md={3} className={'legend-1'}>
                <img src={Icon1} />
                <p>Drag and Drop or Delete any individual recipe or food item in the meal planner via the icon on the left
                  of each entry or click 'Add Item' in the column of the day and course where you wish to add the item.
                  Any entry can also be added multiple times via either feature.</p>
              </Col>
              <Col md={3} className={'legend-1 legend-2'}>
                <img src={Icon2} />
                <p>The serving size can be adjusted by the +/- functions on the right of each entry. You also have the
                  option to click on the number field and manually type in a new quantity</p>
              </Col>
              <Col md={3} className={'legend-1'}>
                <img src={Icon3} />
                <p>Ingredients are added to the planner by quantity (eg. 100g or 1 tsp), which can be adjusted to your
                  liking by using the +/- function or clicking on the serving size and entering a new size in the pop up
                  box.</p>
              </Col>
              <Col md={3} className={'legend-1'}>
                <img src={Icon4} />
                <p>Recipes are added to the meal planner as 1 serving by default, which you can then adjust accordingly.
                  This makes it easier to calculate the carbs you actually eat instead of what you prepare.</p>
              </Col>
            </Row>
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

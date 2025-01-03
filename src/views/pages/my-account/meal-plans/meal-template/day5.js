import React,{Component} from 'react';
import './style.scss'
import TopButtons from "../../top-buttons";
import {Col, Row} from "reactstrap";
import {DAYS_5, DAYS_7, ROUTE_MA_MEAL_PLANS, SESSIONS} from "../../../../../configs/constant";
import {getUserId, notifyMessage} from "../../../../../utility/commonFunc";
import {saveMealPlan} from "../../../../../services/mealPlan";
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {history} from "../../../../../history";
import * as constant from "../../../../../configs/constant";

class App extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  addMealPlanner = () => {
    let obj = {
      "userMealPlanDTO": {
        "userDetailId": getUserId(),
        "mealPlanName": "MEAL PLANNER OPEN - 5 DAYS",
      },
      "mealPlanDetailDTOList": []
    }
    let mealPlanDetailDTOList = [];
    DAYS_5.map(obj => {
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
  render() {
    return (
      <div className={'bg-gray'}>
        <div className={' pt-0 pb-5 '}>
          <TopButtons activeIndex={7}/>
          <div className={'container'}>
            <div className={'pt-5 meal-template-wrapper meal-template-dummy-wrapper'}>
              <Row className={'m-0 profile-wrapper'}>
                <Col md={12} className={'d-flex justify-content-between mb-3'}>
                  <p className={'fr-font ma-title'}>MEAL PLANNER OPEN - 5 DAYS</p>
                  <a className={'fr-font ma-a-tag'} onClick={()=>this.addMealPlanner()}>Add to meal planner</a>
                </Col>
                {
                  DAYS_5.map((obj,index) => {
                    return <Col lg={3} md={4} sm={6} xs={12} key={index} className={'day-main-wrapper'}>
                      <div className={'day-wrapper'}>
                        <div className={'header-section d-flex justify-content-between align-items-center'}>
                          <p className={'fr-font uppercase'}>{obj.name}</p>
                          {/*<button><Plus /> Add</button>*/}
                        </div>
                        <div className={'session-main-wrapper'}>
                          {
                            SESSIONS.map((sessionObj,sIndex) => {
                              return <div className={'session-wrapper'} key={sIndex}>
                                <p className={'session-name fr-font uppercase'}>{sessionObj.name}</p>
                                <div className={'session-body'}>

                                </div>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </Col>
                  })
                }

              </Row>
            </div>
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


import React, {useState} from 'react';
import {Col, Row} from "reactstrap";
import {ChevronDown} from "react-feather";
import './hover.scss';
import * as constant from "../../../configs/constant";
import {withRouter} from "react-router-dom";

const App = (props) => {
  const [dropDown, setDropDown] = useState(0);
  const [count, setCount] = useState(0);

  let active = props.activeIndex ?? 0;
  let subActive = props.subActive ?? null;

  const hoverEffectHandler = (active) => {
    if(dropDown === active) {
      setCount(count === 1 ? 2: 1);
    }else{
      setCount(1);
    }
    setDropDown(active);
  }
  return <div className={'hover-effect'}>
    <Row className={'m-auto container tab-p-pane-wrapper'}>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 0 || active === 1 ? `act-wrapper`:``} ${ dropDown === 1 && count === 1 ? `block-dropdown-content-wrapper`:``}`}>
          <button className="dropbtn" onClick={()=>hoverEffectHandler(1)}>My Account <ChevronDown /></button>
          <div className={`dropdown-content ${dropDown === 1 && count === 2 ? `hide-dropdown-content`: dropDown === 1 && count === 1 ? `block-dropdown-content`:``}`}>
            <a className={`${active === 0 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_PROFILE}`)}>Profile</a>
            <a className={`${active === 1 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_CHANGE_PASSWORD}`)}>Change Password</a>
          </div>
        </div>
      </div>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 3 || active === 4 || active === 5 || active === 6 || active === 7 || active === 8 ? `act-wrapper`:``} ${ dropDown === 2 && count === 1 ? `block-dropdown-content-wrapper`:``}`}>
          <button className="dropbtn" onClick={()=>hoverEffectHandler(2)}>Meal Plans  <ChevronDown /></button>
          <div className={`dropdown-content ${dropDown === 2 && count === 2 ? `hide-dropdown-content`: dropDown === 2 && count === 1 ? `block-dropdown-content`:``}`}>
            <a className={`${active === 3 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_PLANS}`)}>Meal Planners</a>
            <a className={`${active === 4 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_FAVOURITE_RECIPES}`)}>My Favourites</a>
            <a className={`${active === 5 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_SAMPLE_COLLECTION}`)}>Sample Meal Plan</a>
            <a className={`${active === 6 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_7_DAYS}`)}>7 Day Open Meal Planner</a>
            <a className={`${active === 7 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_MEAL_5_DAYS}`)}>5 Day Open Meal Planner</a>
            <a className={`${active === 8 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_CARB_LIMIT}`)}>Set Daily Carb Limit</a>
          </div>
        </div>
      </div>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 9 ? `act-wrapper`:``}`}>
          <button className="dropbtn-single" onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_RECIPES}`)}>Recipes</button>
        </div>
      </div>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 10 ? `act-wrapper`:``}`}>
          <button className="dropbtn-single" onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_CARB_COUNTS}`)}>Carb Counts</button>
        </div>
      </div>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 11 ? `act-wrapper`:``}`}>
          <button className="dropbtn-single" onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_WEIGHT_TRACKER}`)}>Weight Tracker</button>
        </div>
      </div>
      <div lg={2} md={3} className={"mb-1 mt-1 ml-1 mr-1 tab-p-pane"}>
        <div className={`dropdown ${active === 12 || active === 13 ? `act-wrapper`:``} ${ dropDown === 3 && count === 1 ? `block-dropdown-content-wrapper`:``}`}>
          <button className="dropbtn" onClick={()=>hoverEffectHandler(3)}>Help  <ChevronDown /></button>
          <div className={`dropdown-content ${dropDown === 3 && count === 2 ? `hide-dropdown-content`: dropDown === 3 && count === 1 ? `block-dropdown-content`:``}`}>
            <a className={`${active === 12 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_BLOW_METHOD}`)}>The B-LOW Method</a>
            <a className={`${active === 13 ? `act-wrapper-a`:``}`} onClick={()=>props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_HELP_INTRO_VIDEOS}`)}>Instruction Videos</a>
          </div>
        </div>
      </div>
    </Row>
  </div>
}
export default withRouter(App);

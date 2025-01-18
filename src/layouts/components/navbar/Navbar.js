import React from "react"
import { Navbar } from "reactstrap"
import classnames from "classnames"
import NavbarUser from "./NavbarUser"
// import CorporateImage from '../../../assets/img/views/profile/pro-pic.png';
import './Navbar.scss';
import bconPng from "../../../assets/img/logo/logo.png";
import * as constant from "../../../configs/constant";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
  ROUTE_FAQ,
  ROUTE_GET_IN_TOUCH,
  ROUTE_LOGIN,
  ROUTE_LOW_CARB,
  ROUTE_MY_ACCOUNT, ROUTE_PACKAGE_BUY, ROUTE_PRIVACY_POLICY,
  ROUTE_REGISTER, ROUTE_TERMS_CONDITIONS
} from "../../../configs/constant";
import NavbarBookmarks from "./NavbarBookmarks";
import Cookies from "js-cookie";
// import connect from "react-redux/es/connect/connect";

let pathIndex = 0;
const ThemeNavbar = props => {
  // const [active, setActive] = useState(1); //isMyOrder !== -1 ? 2 :
  const colorsArr = [ "primary", "danger", "success", "info", "warning", "dark"]
  const navbarTypes = ["floating" , "static" , "sticky" , "hidden"]
  const redirection = (id) => {
    // setActive(id);
    props.history.push(id === 1 ? `${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}` : `${constant.BASE_ROUTE_PATH}${constant.ROUTE_MY_ORDERS}`);
  }
  let element = document.getElementById("cart-count");
  if(element) element.innerText = props.cartList.length.toString();
  let pathName = window.location.pathname;

  if (pathName.indexOf(`${constant.ROUTE_LOGIN}`) !== -1 ||
    pathName.indexOf(`${constant.ROUTE_REGISTER}`) !== -1||
    pathName.indexOf(`${constant.ROUTE_PRIVACY_POLICY}`) !== -1||
    pathName.indexOf(`${constant.ROUTE_PACKAGE_BUY}`) !== -1||
    pathName.indexOf(`${constant.ROUTE_TERMS_CONDITIONS}`) !== -1) {
    pathIndex = 6;
  }else if (pathName.indexOf(`${constant.ROUTE_MY_ACCOUNT}`) !== -1) {
    pathIndex = 5;
  }else if (pathName.indexOf(`${constant.ROUTE_GET_IN_TOUCH}`) !== -1) {
    pathIndex = 4;
  } else if (pathName.indexOf(`${constant.ROUTE_FAQ}`) !== -1) {
    pathIndex = 3;
  } else if (pathName.indexOf(`${constant.ROUTE_LOW_CARB}`) !== -1) {
    pathIndex = 2;
  } else if (pathName.indexOf(`${constant.ROUTE_DASHBOARD}`) !== -1) {
    pathIndex = 1;
  }
  // console.log("pathName",pathName)
  // console.log("pathIndex",pathIndex)

  const routeHandler = (status) => {
    if(status === 1) window.location = `${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`; //props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`);
    if(status === 2) props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOW_CARB}`);
    if(status === 3) props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_FAQ}`);
    if(status === 4) props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_GET_IN_TOUCH}`);
  }
  // let token = Cookies.get(constant.ACCESS_TOKEN);
  // console.log("token",token)
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light": props.navbarColor === "default" || !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) || (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            "scrolling": props.horizontal && props.scrolling

          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper mob-v-bookmark">
                <NavbarBookmarks
                  sidebarVisibility={props.sidebarVisibility}
                  handleAppOverlay={props.handleAppOverlay}
                />
              </div>
              <div className={"main-nav-lg"}>
                <img onClick={()=>routeHandler(1)} src={bconPng} alt={"."} className={"bcon-off-logo-reg__ cursor-pointer"} />

                <div className={`top-btns-wrapper`}>
                  <button className={`${pathIndex === 1 ? `act-btn-mklo`:`inctv-btn-mklo`} fr-font`} onClick={()=>routeHandler(1)}>HOME</button>
                  <button className={`${pathIndex === 2 ? `act-btn-mklo`:`inctv-btn-mklo`} fr-font`} onClick={()=>routeHandler(2)}>WHY GO LOW-CARB?</button>
                  <button className={`${pathIndex === 3 ? `act-btn-mklo`:`inctv-btn-mklo`} fr-font`} onClick={()=>routeHandler(3)}>FAQs</button>
                  <button className={`${pathIndex === 4 ? `act-btn-mklo`:`inctv-btn-mklo`} fr-font`} onClick={()=>routeHandler(4)}>GET IN TOUCH</button>
                </div>
              </div>

              <NavbarUser
                handleCustomizer={props.handleCustomizer}
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                // userName={props.profile ? props.profile.profile.companyName ? props.profile.profile.companyName : "Loading .." : "Loading .."}
                // userImg={props.profile ? props.profile.profile.profileImage ? props.profile.profile.profileImage : CorporateImage : CorporateImage}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  isSpinner: state.spinner.isSpinner,
  cartList: state.cartStock.cartList,
});

export default withRouter(connect(mapStateToProps, null)(ThemeNavbar));

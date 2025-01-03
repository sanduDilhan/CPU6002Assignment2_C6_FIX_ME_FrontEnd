/* eslint-disable*/
import React from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import * as Icon from "react-feather"
import { history } from "../../../history"
import * as constant from "../../../configs/constant"
import * as actionCreator from "../../../store/domain/auth/action";
import {
  connect,
} from 'react-redux';
import * as commonFunc from "../../../utility/commonFunc";
import CorporateImage from "../../../assets/img/views/profile/pro-pic.png";
import swal from "sweetalert";
import Cookies from "js-cookie";
import {
  FACEBOOK_URL, INSTAGRAM_URL, LOGIN_PASSWORD, LOGIN_USER_NAME,
  REFRESH_TOKEN,
  ROUTE_LOGIN,
  ROUTE_MA_PROFILE,
  ROUTE_MY_ACCOUNT,
  ROUTE_REGISTER
} from "../../../configs/constant";
import {Facebook, Instagram} from "react-feather";

const signoutHandler = (props) => {
  swal({
    title: "Are you sure you want to logout?",
    // icon: warningIcon,
    closeOnClickOutside: false,
    buttons: {
      cancel: 'No',
      dangerMode: {
        text: "Yes",
        value: "action",
        className: "okay-btn"
      }
    }
  })
    .then((value) => {
      switch (value) {
        case "action":
          props.logoutUser();
          localStorage.clear();
          Cookies.remove(constant.LOGIN_USER_NAME);
          Cookies.remove(constant.LOGIN_PASSWORD);
          Cookies.remove(constant.ACCESS_TOKEN);
          Cookies.remove(constant.REFRESH_TOKEN);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)
          break;
        default:
      }
    })
};

const UserDropdown = props => {
  return (
    <DropdownMenu right>
      {/*<DropdownItem*/}
      {/*  onClick={() => history.push(constant.BASE_ROUTE_PATH+constant.ROUTE_SETTINGS)}*/}
      {/*>*/}
      {/*  <Icon.Settings size={14} className="mr-50" />*/}
      {/*  <span className="align-middle">Settings</span>*/}
      {/*</DropdownItem>*/}
      {/*<DropdownItem divider />*/}
      <DropdownItem
        tag="a"
        href="#"
        onClick={()=>signoutHandler(props)}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Logout</span>
      </DropdownItem>
    </DropdownMenu>
  )
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.status !== -1){
      // commonFunc.notifyMessage(nextProps.message,nextProps.status)
      this.props.resetHandler();
    }
    if(!nextProps.loggedInStatus){
      history.push(constant.BASE_ROUTE_PATH+"/login")
    }
  }

  myAccountHandler = () => {
    history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_PROFILE}`);
  }

  // d-none
  render() {
    //   console.log("*************")
    // console.log("loggedInStatus",this.props.loggedInStatus)
    let token = Cookies.get(constant.ACCESS_TOKEN);
    // console.log("token",token)
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <div className="user-nav_ d-sm-flex top-right-btns-wrapper ">
          <div className={'social-media-nav mr-2 mob-hide'}>
            <div>
              <a target={"_blank"} href={FACEBOOK_URL} ><Facebook size={18}/></a>
            </div>
            <div>
              <a target={"_blank"} href={INSTAGRAM_URL} ><Instagram size={18}/></a>
            </div>
          </div>
          {/*<span className="user-name text-bold-600">{localStorage.getItem(constant.USER_NAME)}</span>*/}
          {token ? <button className={'fr-font'} onClick={this.myAccountHandler}>MY ACCOUNT</button> : <button className={'fr-font'} onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>LOG IN</button>}
          {token ? <button className={'fr-font'} onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>LOGOUT</button> : <button className={'fr-font'} onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_REGISTER}`)}>REGISTER</button>}
        </div>
        {/*<UncontrolledDropdown tag="li" className="dropdown-user nav-item">*/}
        {/*  <DropdownToggle tag="a" className="nav-link dropdown-user-link">*/}
        {/*    <span data-tour="user">*/}
        {/*      <img*/}
        {/*        src={CorporateImage}*/}
        {/*        className="half-round nav-logo"*/}
        {/*        height="40"*/}
        {/*        width="40"*/}
        {/*        alt="avatar"*/}
        {/*      />*/}
        {/*    </span>*/}
        {/*  </DropdownToggle>*/}
        {/*  <UserDropdown {...this.props} />*/}
        {/*</UncontrolledDropdown>*/}
      </ul>
    )
  }
}
const mapStateToProps = (state) => ({
  loggedInStatus: state.auth.loggedInStatus,
  status: state.auth.status,
  message: state.auth.message
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: userCredentials => dispatch(actionCreator.logoutUser(userCredentials)),
  resetHandler: () => dispatch(actionCreator.resetWarningHandler())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUser);

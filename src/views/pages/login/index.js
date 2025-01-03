import React,{Component} from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import './style.scss';
import InputPasswordToggle from "../../../components/@vuexy/input-password-toggle";
import PasswordStrengthBar from "react-password-strength-bar";
import {history} from "../../../history";
import * as constant from "../../../configs/constant";import {
  LOGIN_PASSWORD,
  LOGIN_USER_NAME, NO_TYPE, ROUTE_MA_PROFILE, YES_TYPE
} from "../../../configs/constant";
import {Checkbox} from "semantic-ui-react";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {notifyMessage} from "../../../utility/commonFunc";
import {forgetPasswordStep1, forgetPasswordStep2, loginUser} from "../../../services/auth";
import * as commonFunc from "../../../utility/commonFunc";
import * as validator from "../../../utility/validator";
import Cookies from "js-cookie";
import * as actionCreator from "../../../store/domain/auth/action";
import {getCurrentPackageDetails} from "../../../services/package";

class App extends Component {
  state = {
    username:"", password:"", isRemember: false, isModal: false, forgotText:"", isVerify: false, otpCode:"",newPassword:""
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    Cookies.remove(constant.ACCESS_TOKEN);
    Cookies.remove(constant.ADMIN_ID);
    Cookies.remove(constant.USER_NAME);
    this.props.loginUserUnsuccessfull(null)
    this.props.spinnerHandler(false);

    let loginUsername = Cookies.get(constant.LOGIN_USER_NAME);
    let loginPassword = Cookies.get(constant.LOGIN_PASSWORD);
    if(loginUsername && loginPassword) this.setState({username:loginUsername, password:loginPassword, isRemember: true})
  }
  loginHandler = () => {
    let {username, password, isRemember} = this.state;
    if(username.trim() === "") return notifyMessage("Email address can not be left blank")
    if(!validator.emailRegex.test(username.trim())) return notifyMessage("Please enter valid email")
    if(password.trim() === "") return notifyMessage("Password can not be left blank")

    this.props.spinnerHandler(true)
    loginUser({"email":username.trim(), "password":password.trim()})
      .then(response => {
        if(response.code === 200) {
          if(isRemember) {
            Cookies.set(constant.LOGIN_USER_NAME, username.trim());
            Cookies.set(constant.LOGIN_PASSWORD, password.trim());
          }else{
            Cookies.remove(constant.LOGIN_USER_NAME);
            Cookies.remove(constant.LOGIN_PASSWORD);
          }
          Cookies.set(constant.ACCESS_TOKEN, response?.result?.token);
          Cookies.set(constant.ADMIN_ID, response?.result?.userId);
          Cookies.set(constant.ADMIN_EMAIL, response?.result?.email);
          this.props.loginUserSuccess(response?.result?.token)
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_PROFILE}`)
          this.props.spinnerHandler(false);
          // this.getCurrentPackageDetailsHandler(response?.result?.token);
        }else{
          this.props.spinnerHandler(false);
          commonFunc.notifyMessage(response.message);
        }
      })
  }
  getCurrentPackageDetailsHandler = (token) => {
    this.props.spinnerHandler(true);
    getCurrentPackageDetails().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let results = response.result;
        if(results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        let resultObj = results[0]

        if(!resultObj.isExpired) {
          this.props.loginUserSuccess(token)
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, YES_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`)
        }else{
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`)
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  render() {
    let {username, password, isRemember, isModal, forgotText, isVerify, otpCode, newPassword} = this.state;
    return (
      <div className={'login-wrapper'}>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0 text-center signup-section pb-3'}>
            <Col md={12} >
              <p className={'title fr-font_'}>Please Log In</p>
            </Col>
            <Col md={12} className={'text-input-wrapper'}>
              <p>Email Address</p>
              <Input
                type="text" placeholder="" value={username} onChange={e => this.setState({username: e.target.value})}/>
            </Col>

            <Col md={12} className={'text-input-wrapper'}>
              <p>Password</p>
              <InputPasswordToggle className='input-group-merge'
                                   placeholder={' '}
                                   value={password} onChange={e => this.setState({password: e.target.value})}
              />
              <Row className={'m-0 mt-2 bottom'}>
                <Col sm={6} className={'pl-0 pb-1'}>
                  <Checkbox label={"Remember me"} checked={isRemember} onChange={()=>this.setState({isRemember: !isRemember})} />
                </Col>
                <Col sm={6}  className={'pr-0 d-flex justify-content-end pb-1'}>
                  <a onClick={()=>this.setState({isModal: true})}>Forgot Your Password</a>
                </Col>
              </Row>

            </Col>
            <Col md={12} className={'text-center'}>
              <button className={'submit-outline-btn mt-2'} onClick={this.loginHandler}>Log In</button>
              <p className={'pt-03 login-txt'}>Don't have an account?<br/> <a onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_REGISTER}`)}>Sign Up Now!</a></p>
            </Col>

          </Row>
        </div>
        <Modal centered={true} size={"md"} isOpen={isModal} className={'forgot-password-modal'}>
          <ModalHeader className={'forgot-haader-modal_'} toggle={()=>this.setState({isModal: false, isVerify: false})}>
            Forgot Password
          </ModalHeader>
          <ModalBody className="modal-dialog-centered_ forgot-psw-wrapper">
            <div className={'body-modal-wrapper text-center'}>
              <p>{!isVerify ? "Please enter your email address below." : `Please enter received verification code below.`}</p>
              <div className={'mt-2 input-wrapper'}>
                {!isVerify ? <div className={'step-1-email'}>
                    <p>Email Address</p>
                    <Input
                      type="text" placeholder="" value={forgotText} onChange={e => this.setState({forgotText: e.target.value})}/>
                </div>:
                  <div>
                    <p>Verification Code</p>
                    <Input
                      type="text" placeholder="" value={otpCode} onChange={e => this.setState({otpCode: e.target.value})}/>
                    <p className={'mt-1'}>Password</p>
                    <InputPasswordToggle className='input-group-merge'
                                         placeholder={' '}
                                         value={newPassword} onChange={e => this.setState({newPassword: e.target.value})}
                    />
                    <PasswordStrengthBar password={newPassword} scoreWords={['Weak', 'Good', 'Good', 'Strong']} shortScoreWord={"Very Weak"} minLength={6} onChangeScore={this.onChangeScore}/>
                  </div>}

              </div>
              <button className={'submit-outline-btn mt-2'} onClick={this.forgetPasswordHandler}>Submit</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
  forgetPasswordHandler = () => {
    let {forgotText, isVerify} = this.state;
    if(isVerify) return this.verifyOTPHandler();

    if(forgotText.trim() === "") return notifyMessage("Please enter email address")
    if(!validator.emailRegex.test(forgotText.trim())) return notifyMessage("Please enter valid email")
    this.props.spinnerHandler(true)
    forgetPasswordStep1(forgotText.trim()).then(response => {
      this.props.spinnerHandler(false)
      if(response.code === 200) {
        notifyMessage(response.message, 1)
        this.setState({isVerify: true})
      }else {
        notifyMessage(response.message)
        this.setState({isVerify: false})
      }
    })
  }
  clearFieldsHandler = () => {
    this.setState({username:"", password:"", isRemember: false, isModal: false, forgotText:"", isVerify: false, otpCode:"",newPassword:""})
  }
  verifyOTPHandler = () => {
    let {forgotText, newPassword, otpCode} = this.state;
    if(otpCode.trim() === "") return notifyMessage("Verification code can not be left blank")
    if(newPassword.length < 6) return notifyMessage("Password very weak. Please enter at least 6 characters")

    const obj = {
      "email":forgotText.trim(),
      "resetCode":otpCode.trim().replaceAll(" ",""),
      "password":newPassword.trim()
    }
    this.props.spinnerHandler(true)
    forgetPasswordStep2(obj).then(response => {
      this.props.spinnerHandler(false)
      if(response.code === 200) {
        notifyMessage(response.message, 1)
        this.clearFieldsHandler();
      }else {
        notifyMessage(response.message)
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data)),
  loginUserSuccess: userCredentials => dispatch(actionCreator.loginUserSuccess(userCredentials)),
  loginUserUnsuccessfull: userCredentials => dispatch(actionCreator.loginUserUnsuccessfull(userCredentials)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));

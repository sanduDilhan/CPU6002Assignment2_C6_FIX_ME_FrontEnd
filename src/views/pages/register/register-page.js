import React,{Component} from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import './style.scss';
import HeaderStaticBar from "../header-static-bar";
import InputPasswordToggle from "../../../components/@vuexy/input-password-toggle";
import PasswordStrengthBar from "react-password-strength-bar";
import {history} from "../../../history";
import * as constant from "../../../configs/constant";
import {withRouter} from "react-router-dom";
import {Check, CheckCircle} from "react-feather";
import {notifyMessage} from "../../../utility/commonFunc";
import * as validator from "../../../utility/validator";
import * as services from "../../../services/auth";
import * as commonFunc from "../../../utility/commonFunc";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {confirmOTPHandler, loginUser} from "../../../services/auth";
import {createCheckoutSession, getAllPackages} from "../../../services/package";
import {SELECTED_PACKAGE_ID} from "../../../configs/constant";
import Cookies from "js-cookie";

class App extends Component {
  state = {
    password:"", username: "", fname:"", lname:"", email:"", isModal:false, verificationCode: "", activePackage: 0, planName:"", price:"",score: 0, packages: [],
    userId: 0
  }
  componentDidMount() {
    this.getAllPackageDetails()
  }
  getAllPackageDetails = () => {
    this.props.spinnerHandler(true);
    getAllPackages().then(response => {
      if(response.code === 200) {
        let packages = response?.result?.listData ?? [];
        let obj = packages.length > 0 ? packages[0] : null
        if(obj) this.setState({packages: packages, activePackage: obj.packageId, planName:obj.packageName, price:obj.packagePrice.toFixed(2)})
        window.scrollTo(0, 0);
      }else{
        notifyMessage(response.message)
      }
      this.props.spinnerHandler(false);
    })
  }
  validationHandler = () => {
    let {password, username, fname, lname, email} = this.state;
    username.trim() === "" ? notifyMessage("Username can not be left blank"):
      fname.trim() === "" ? notifyMessage("First Name can not be left blank"):
        lname.trim() === "" ? notifyMessage("Last Name can not be left blank"):
          email.trim() === "" ? notifyMessage("Email Address can not be left blank"):
            !validator.emailRegex.test(email.trim()) ? notifyMessage("Please enter valid email") :
            password.length < 6 ? notifyMessage("Password very weak. Please enter at least 6 characters with") :
              this.submitHandler()
  }
  submitHandler = () => {
    let {password, username, fname, lname, email} = this.state;
    const obj = {
      "firstName":fname.trim(),
      "lastName":lname.trim(),
      "userName":username.trim(),
      "email":email.trim(),
      "password":password.trim(),
      "userRole":"USER"
    }
    this.props.spinnerHandler(true)
    services.regUserAPIHandler(obj)
      .then(response => {
        this.props.spinnerHandler(false)
        if(response.code !== 200) commonFunc.notifyMessage(response.message);
        if(response.code === 200) {
          this.setState({isModal: true, userId: response.result})
        }
      })
  }
  onChangeScore = (score) => {
    this.setState({score: score})
  }
  confirmOTPHandler = () => {
    let {verificationCode, email} = this.state;
    if(verificationCode.trim() === "") return notifyMessage("Verification code can not be left blank")
    this.props.spinnerHandler(true)
    confirmOTPHandler({
      "email":email.trim(),
      "verifyCode":verificationCode.trim().replaceAll(" ","")
    })
      .then(response => {
        if(response.code === 200){
          this.setState({isModal: false})
          this.loginHandler();
          // history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)
        }else{
          commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
          this.props.spinnerHandler(false)
        }
      })
  }
  // login
  loginHandler = () => {
    let {email, password} = this.state;
    loginUser({"email":email.trim(), "password":password.trim()})
      .then(response => {
        if(response.code === 200) {
          Cookies.set(constant.ACCESS_TOKEN, response?.result?.token);
          Cookies.set(constant.ADMIN_ID, response?.result?.userId);
          Cookies.set(constant.ADMIN_EMAIL, response?.result?.email);
          this.createCheckoutSessionHandler();
        }else{
          this.props.spinnerHandler(false);
          commonFunc.notifyMessage(response.message);
        }
      })
  }
  createCheckoutSessionHandler = () => {
    let {activePackage} = this.state;
    this.props.spinnerHandler(true)
    createCheckoutSession(activePackage)
      .then(response => {
        this.props.spinnerHandler(false)
        if(response.code === 200) {
          localStorage.setItem(SELECTED_PACKAGE_ID, activePackage.toString())
          window.location.href = response.result
        }else{
          notifyMessage(response.message);
        }
      })
  }
  render() {
    let {password, username, fname, lname, email, activePackage, price, planName, isModal, verificationCode, packages} = this.state;
    return (
      <div className={'register-wrapper'}>
        <HeaderStaticBar bannerURL={"/image-folder/image-section-92-min.jpg"} mainTitle={"Joining Options"} subTitle={<span>CHOOSE THE PLAN THAT <br/> FITS YOUR LIFESTYLE</span>}/>
        {packages.length > 0 ? <div className={'section-1-wrapper pb-5 pt-5'}>
          <p className={'p1 fr-font'}>Congratulations on taking your first step towards a healthier you!</p>
          <p className={'p2'}>We offer different pricing options to make it easy for anyone to come onboard. <br/>
            Please select the option that best suits you. </p>
          <p className={'p3 fr-font'}>B-LOW PLANS</p>
          <div className={'container pt-5 pb-4'}>
            <Row className={'m-0'}>
              {
                packages.map((obj,index) => {
                  return <Col md={6} key={index} className={'mb-2'}>
                    <div className={`weekly-plan weekly-1 ${activePackage === obj.packageId ? 'active-card':''}`} onClick={()=>this.setState({activePackage: obj.packageId, planName:obj.packageName, price:obj.packagePrice.toFixed(2)})}>
                      <p className={'fr-font'}>{obj.packageName}</p>
                      <div className={'inner-content'}>
                        {activePackage === obj.packageId ? <div className={'check-circle'}><Check /></div> : <div className={'check-circle'} />}
                        <div className={'price'}>
                          <span>$</span>
                          <span className={obj.packagePrice > 1000 ? `price-1000` : obj.packagePrice > 0 ? `price-100` : ``}>{obj.packagePrice}</span>
                        </div>
                        <p className={'pb-2 desc'}>{obj?.description ?? "N/A"}</p>
                        <p className={'circle'}><CheckCircle /> 2 Week Free Trial</p>
                        <hr/>
                        <p className={'circle'}><CheckCircle /> Unrestricted access to B-Low exclusive recipes, meal plans, program support and more.</p>
                        <p className={'desc-s pt-2'}>Losing or maintaining weight has never been tastier!</p>
                      </div>
                    </div>
                  </Col>
                })
              }
            </Row>
          </div>
        </div>:null}
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0 text-center  pb-3'}>
            <Col md={12} >
              <p className={'title fr-font'}>SIGN UP BELOW</p>
            </Col>
            <Row className={'m-0 signup-section'}>
              <Col md={12} className={'text-input-wrapper'}>
                <p>Username</p>
                <Input
                  type="text" placeholder="" value={username} onChange={e => this.setState({username: e.target.value})}/>
              </Col>
              <Col md={12} className={'text-input-wrapper'}>
                <p>First Name</p>
                <Input
                  type="text" placeholder="" value={fname} onChange={e => this.setState({fname: e.target.value})}/>
              </Col>
              <Col md={12} className={'text-input-wrapper'}>
                <p>Last Name</p>
                <Input
                  type="text" placeholder="" value={lname} onChange={e => this.setState({lname: e.target.value})}/>
              </Col>
              <Col md={12} className={'text-input-wrapper'}>
                <p>Email Address</p>
                <Input
                  type="email" placeholder="" value={email} onChange={e => this.setState({email: e.target.value})}/>
              </Col>
              <Col md={12} className={'text-input-wrapper'}>
                <p>Password</p>
                <InputPasswordToggle className='input-group-merge'
                                     placeholder={' '}
                                     value={password} onChange={e => this.setState({password: e.target.value})}
                />
                <PasswordStrengthBar password={password} scoreWords={['Weak', 'Good', 'Good', 'Strong']} shortScoreWord={"Very Weak"} minLength={6} onChangeScore={this.onChangeScore}/>
              </Col>
            </Row>
          </Row>
          {/*<hr/>*/}
          {activePackage ? <div className={'pt-0 pb-0'}>
            <Row className={'m-0 text-center summary-section none-border-top pt-0'}>
              <Col md={12}>
                <p className={'fr-font pb-1'}>Payment Summary</p>
                <p className={'fr-font pb-4'}>Your currently selected plan : <span className={'fr-font bold'}>{planName}</span>, Plan Amount : <span className={'fr-font bold'}>{price} AUD</span>
                  <br/>Current Payable Amount: <span className={'fr-font bold'}>0.00 AUD</span></p>
                <button className={'submit-outline-btn submit-circle'} onClick={this.validationHandler}>Submit</button>
                <p className={'pt-4 login-txt'}>Already have an account? <a onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>Log In</a></p>
              </Col>
            </Row>
          </div>:null}
          {/*<Row className={'m-0 text-center summary-section_'}>*/}
          {/*    <Col md={12}>*/}
          {/*      <button className={'submit-outline-btn submit-circle'} onClick={this.validationHandler}>Submit</button>*/}
          {/*      <p className={'pt-4 login-txt'}>Already have an account? <a onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>Login</a></p>*/}
          {/*    </Col>*/}
          {/*</Row>*/}
        </div>
        <Modal centered={true} size={"md"} isOpen={isModal} >
          <ModalHeader className={'forgot-haader-modal_ email-verification-header'} toggle={()=>this.setState({isModal: false})}>
            Email Verification
          </ModalHeader>
          <ModalBody className="modal-dialog-centered_ forgot-psw-wrapper">
            <div className={'body-modal-wrapper text-center'}>
              <p>{`Please enter your verification code ${email ? `sent to ${email}`:``}`}</p>
              <div className={'mt-2 input-wrapper'}>
                <p>Verification Code</p>
                <Input
                  type="text" placeholder="" value={verificationCode} onChange={e => this.setState({verificationCode: e.target.value})}/>
              </div>
              <button className={'submit-outline-btn mt-2'} onClick={this.confirmOTPHandler}>Submit</button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// export default withRouter(App);


const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

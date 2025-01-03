import React,{Component} from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import './style.scss';
import HeaderStaticBar from "../header-static-bar";
import Section1 from "./section-1";
import InputPasswordToggle from "../../../components/@vuexy/input-password-toggle";
import PasswordStrengthBar from "react-password-strength-bar";
import {history} from "../../../history";
import * as constant from "../../../configs/constant";
import {withRouter} from "react-router-dom";
import {Check} from "react-feather";
import {notifyMessage} from "../../../utility/commonFunc";
import * as validator from "../../../utility/validator";
import * as services from "../../../services/auth";
import * as commonFunc from "../../../utility/commonFunc";
import * as actionCreator from "../../../store/domain/auth/action";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {confirmOTPHandler} from "../../../services/auth";

class App extends Component {
  state = {
    password:"", username: "", fname:"", lname:"", email:"", isModal:false, verificationCode: "", activePackage: 1, planName:"Monthly Plan", price:"5.00",score: 0
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  validationHandler = () => {
    let {password, username, fname, lname, email, score, price, planName} = this.state;
    username.trim() === "" ? notifyMessage("Username can not be left blank"):
      fname.trim() === "" ? notifyMessage("First Name can not be left blank"):
        lname.trim() === "" ? notifyMessage("Last Name can not be left blank"):
          email.trim() === "" ? notifyMessage("Email Address can not be left blank"):
            !validator.emailRegex.test(email.trim()) ? notifyMessage("Please enter valid email") :
            password.length < 6 ? notifyMessage("Password very weak. Please enter at least 6 characters with") :
              this.submitHandler()
  }
  submitHandler = () => {
    let {password, username, fname, lname, email, score, price, planName} = this.state;
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
        console.log("res",response)
        this.props.spinnerHandler(false)
        if(response.code !== 200) commonFunc.notifyMessage(response.message);
        if(response.code === 200) this.setState({isModal: true})
      })
}
  onChangeScore = (score) => {
    this.setState({score: score})
  }
  confirmOTPHandler = () => {
    let {verificationCode, email} = this.state;
    if(verificationCode.trim() === "") return notifyMessage("Verification code can not be left blank")
    confirmOTPHandler({
      "email":email.trim(),
      "verifyCode":verificationCode.trim().replaceAll(" ","")
    })
      .then(response => {
        this.props.spinnerHandler(false)
        commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
        if(response.code === 200){
          this.setState({isModal: false})
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)
        }
      })
  }
  render() {
    let {password, username, fname, lname, email, activePackage, price, planName, isModal, verificationCode} = this.state;
    return (
      <div className={'register-wrapper'}>
        <HeaderStaticBar bannerURL={"/image-folder/image-section-92-min.jpg"} mainTitle={"Joining Options"} subTitle={<span>CHOOSE THE PLAN THAT <br/> FITS YOUR LIFESTYLE</span>}/>
        <Section1 />

        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0 text-center  pb-3'}>
            <Col md={12} >
              <p className={'title fr-font'}>SIGN UP BELOW</p>
              <p className={'sub-title fr-font'}>Select your plan.</p>
            </Col>
            <Row className={'m-0 d-flex justify-content-center'}>
              {/*<Col md={3}></Col>*/}
              <Col className={`package-card-wrapper ${activePackage === 1 ? `active-card`:``}`}>
                <div className={'package-card'} onClick={()=>this.setState({activePackage: 1, planName:"Monthly Plan", price:"5.00"})}>
                  {activePackage === 1 ? <div className={'check-circle'}><Check /></div> : <div className={'check-circle'} />}
                  <p className={"fr-font pp-1"}>Monthly Plan</p>
                  <p className={"fr-font pp-2"}>$5.00</p>
                  <p className={"fr-font pp-3"}>You will not be charged until your trial ends and only if you continue your plan.</p>
                </div>
              </Col>
              <Col className={`package-card-wrapper ${activePackage === 2 ? `active-card`:``}`}>
                <div className={'package-card'} onClick={()=>this.setState({activePackage: 2, planName:"Yearly Plan", price:"60.00"})}>
                  {activePackage === 2 ? <div className={'check-circle'}><Check /></div> : <div className={'check-circle'} />}
                  <p className={"fr-font pp-1"}>Yearly Plan</p>
                  <p className={"fr-font pp-2"}>$60.00</p>
                  <p className={"fr-font pp-3"}>You will not be charged until your trial ends and only if you continue your plan.</p>
                </div>
              </Col>
              <Col className={`package-card-wrapper ${activePackage === 3 ? `active-card`:``}`}>
                <div className={'package-card'} onClick={()=>this.setState({activePackage: 3, planName:"Test Plan", price:"1.00"})}>
                  {activePackage === 3 ? <div className={'check-circle'}><Check /></div> : <div className={'check-circle'} />}
                  <p className={"fr-font pp-1"}>Test Plan</p>
                  <p className={"fr-font pp-2"}>$1.00</p>
                  <p className={"fr-font pp-3"}>You will not be charged until your trial ends and only if you continue your plan.</p>
                </div>
              </Col>
            </Row>
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
          <Row className={'m-0 text-center summary-section'}>
              <Col md={12}>
                <p className={'fr-font pb-1'}>Payment Summary</p>
                <p className={'fr-font pb-4'}>Your currently selected plan : <span className={'fr-font bold'}>{planName}</span>, Plan Amount : <span className={'fr-font bold'}>{price} AUD</span>
                  <br/>Current Payable Amount: <span className={'fr-font bold'}>0.00 AUD</span></p>

                <button className={'submit-outline-btn submit-circle'} onClick={this.validationHandler}>Submit</button>

                <p className={'pt-4 login-txt'}>Already have an account? <a onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>Log In</a></p>
              </Col>
          </Row>
        </div>
        <Modal centered={true} size={"md"} isOpen={isModal} >
          <ModalHeader className={'forgot-haader-modal_'} toggle={()=>this.setState({isModal: false})}>
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

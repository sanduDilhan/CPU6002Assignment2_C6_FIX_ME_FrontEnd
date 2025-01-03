import React, {Component} from 'react';
import {Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import TopButtons from "../top-buttons";
import './style.scss'
import {getUserEmail, getUserId, notifyMessage} from "../../../../utility/commonFunc";
import {getUserDetailsById, updateUserDetails} from "../../../../services/auth";
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import * as commonFunc from "../../../../utility/commonFunc";
import {getCurrentPackageDetails} from "../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../configs/constant";
import {
  NO_TYPE
} from "../../../../configs/constant";
import {history} from "../../../../history";
import {withRouter} from "react-router-dom";
import '../common.scss';

class App extends Component {
  state = {
    userObj : null, isModal: false,
    firstName: null,
    lastName: null,
    userName: null,
  }
  dataHandler = () => {
    this.setState({isModal: false})
    this.props.spinnerHandler(true)
    getUserDetailsById().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let result = response?.result?.result;
        let packageName = result?.packageDetail?.packageName ?? "-"
        let userDetail = result?.userDetail;
        const userObj = {
          firstName: userDetail?.firstName ?? "-",
          lastName: userDetail?.lastName ?? "-",
          userName: userDetail?.userName ?? "-",
          package: packageName
        }
        this.setState({userObj, firstName: userObj.firstName, lastName: userObj.lastName, userName: userObj.userName})
      }else{
        notifyMessage(response.message);
        history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`);
      }
    })
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getCurrentPackageDetailsHandler();
  }

  updateHandler = () => {
    let {firstName, lastName, userName} = this.state;
    if(userName.trim() === "") return notifyMessage("Username can not be left blank");
    if(firstName.trim() === "") return notifyMessage("First Name can not be left blank");
    if(lastName.trim() === "") return notifyMessage("Last Name can not be left blank");

    const obj = {
      "userId":getUserId(),
      "firstName":firstName.trim(),
      "lastName":lastName.trim(),
      "userName":userName.trim()
    }
    this.props.spinnerHandler(true)
    updateUserDetails(obj).then(response => {
      this.props.spinnerHandler(false)
      commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
      if(response.code === 200) this.dataHandler();
    })
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
            this.dataHandler();
          }

      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  render() {
    let {userObj, isModal, firstName, lastName, userName} = this.state;
    return (
      userObj ? <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={0}/>
        <div className={'container_ '}>
          <div className={'pt-5 profile-wrapper'}>
            <Row className={'row-wrapper pl-5 pr-5'}>
              <Col md={12}>
                <p className={'ma-title'}>Profile Details</p>
              </Col>
              <Col md={12} className={'pt-3'}>
                <div className={'w-100 text-right mb-1 edit-profile-nav'}>
                  <a className={'a-tag'} onClick={()=>this.setState({isModal: true})}>Edit Profile</a>
                </div>
                <div className={'p-2 per-78'}>
                  <p className={'ma-sub'}><label>First Name</label> <label>{userObj?.firstName ?? "-"}</label></p>
                  <p className={'ma-sub'}><label>Last Name</label> <label>{userObj?.lastName ?? "-"}</label></p>
                  <p className={'ma-sub'}><label>Username</label> <label>{userObj?.userName ?? "-"}</label></p>
                  {/*<p className={'ma-sub'}><label>Phone Number</label> <label>+61 4 1234 5678</label></p>*/}
                  <p className={'ma-sub'}><label>Email Address</label> <label>{getUserEmail()}</label></p>
                  <p className={'ma-sub'}><label>Selected Plan</label> <label>{userObj?.package ?? "-"}</label></p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Row className={'m-0 mt-2 pt-5 pb-2 pl-5 pr-5'}>
          <Col md={3}>
            <div className={'p-box p-box-1 fr-font'} onClick={()=>this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_SUBSCRIPTION}`)}>
              My <br/> Subscription
            </div>
          </Col>
          <Col md={3}>
            <div className={'p-box p-box-2 fr-font'} onClick={()=>this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_FAVOURITE_RECIPES}`)}>
              My <br/> Favourites
            </div>
          </Col>
          <Col md={3}>
            <div className={'p-box p-box-3 fr-font'} onClick={()=>this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_ASK_A_QUESTION}`)} >
              Ask A  <br/> Question
            </div>
          </Col>
          <Col md={3}>
            <div className={'p-box p-box-4 fr-font'} onClick={()=>this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_WEIGHT_TRACKER}`)}>
              My Weight  <br/>  Tracker
            </div>
          </Col>

        </Row>
        <Modal centered={true} size={"md"} isOpen={isModal} >
          <ModalHeader className={'forgot-haader-modal'} toggle={()=>this.dataHandler()}>
            Edit Profile
          </ModalHeader>
          <ModalBody className="modal-dialog-centered_ forgot-psw-wrapper">
            <div className={'body-modal-wrapper'}>
              <Row className={'m-0'}>
                <Col md={12} className={'text-input-wrapper mb-2'}>
                  <p>Username</p>
                  <Input
                    type="text" placeholder="" value={userName} onChange={e => this.setState({userName: e.target.value})}/>
                </Col>
                <Col md={12} className={'text-input-wrapper mb-2'}>
                  <p>First Name</p>
                  <Input
                    type="text" placeholder="" value={firstName} onChange={e => this.setState({firstName: e.target.value})}/>
                </Col>
                <Col md={12} className={'text-input-wrapper mb-2'}>
                  <p>Last Name</p>
                  <Input
                    type="text" placeholder="" value={lastName} onChange={e => this.setState({lastName: e.target.value})}/>
                </Col>
                {/*<Col md={12} className={'text-input-wrapper mb-2'}>*/}
                {/*  <p>Email Address</p>*/}
                {/*  <Input*/}
                {/*    type="email" placeholder="" value={getUserEmail()} disabled={true}/>*/}
                {/*</Col>*/}
              </Row>
              <div className={'text-center'}>
                <button className={'submit-outline-btn mt-3 mb-2'} onClick={this.updateHandler}>Submit</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>:null
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});
export default connect(null, mapDispatchToProps)(withRouter(App));

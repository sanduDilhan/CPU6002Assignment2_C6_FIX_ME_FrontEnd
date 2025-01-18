import React, {useState} from "react"
import ScrollToTop from "react-scroll-up"
import {Button, Row, Col} from "reactstrap"
import {ArrowUp, Check, Facebook, Instagram} from "react-feather"
import classnames from "classnames"
import bconPng from "../../../assets/img/logo/logo.png";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL
} from "../../../configs/constant";
import * as actionCreator from "../../../store/domain/auth/action";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import * as constant from "../../../configs/constant";
import {history} from "../../../history";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import * as validator from "../../../utility/validator";
import {notifyMessage} from "../../../utility/commonFunc";
import {subscribeUser} from "../../../services/user";

const Footer = props => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  let footerTypeArr = ["sticky", "static", "hidden"];
  let token = Cookies.get(constant.ACCESS_TOKEN);
  const subscribeHandler = () => {
    if(!validator.emailRegex.test(email.trim())) return notifyMessage("Please enter valid email")
    props.spinnerHandler(true);
    subscribeUser({email: email.trim()}).then(res => {
      // if(res.code !== 200) notifyMessage(res.message);
      if(res.code === 200) setEmail("");
      notifyMessage(res.message, res.code === 200 ? 1 : 0)
      setSuccess(res.code === 200)
      props.spinnerHandler(false);
    })
  }
  const onChange = (value) => {
    setEmail(value)
  }
  return (
    <footer id={'footer-section'}
      className={classnames("footer footer-light", {
        "footer-static": props.footerType === "static" || !footerTypeArr.includes(props.footerType),
        "d-none": props.footerType === "hidden"
      })}
    >
      <Row className={"footer-top m-0"}>
        <Col xl={5} className={"f-sec-1"}>
          <div className={'f-main-wrapper'}>
            <img src={bconPng} alt={"."} className={"footer-logo-img"} />
            <p className={'f-title fr-font'}>STAY IN THE LOOP</p>
            <p className={'f-sub-title mt-2'}>Sign up to be the first to hear about any additions to our platform, new exclusive recipes, promotions & specials offers.</p>
            <div className={'d-flex mt-3'}>
              <input value={email} onChange={e => onChange(e.target.value)} />
              <button onClick={subscribeHandler}>SUBSCRIBE</button>
            </div>
            {success ? <div className={'pt-1 text-left'}>
              <Check size={18} /> Thanks for subscribing to B-Low!
            </div>:null}
          </div>
        </Col>
        <Col  className={"f-sec-2"}>
          <div className={'f-main-wrapper'}>
            {token ? <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_MA_PROFILE}`)}>My Account</p> : <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>Log In</p>}
            {token ? <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)}>Logout</p> : <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_REGISTER}`)}>Register</p>}
            {/*<p>My Account</p>*/}
            {/*<p>Logout</p>*/}
            <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PRIVACY_POLICY}`)}>Privacy Policy</p>
            <p onClick={()=>history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_TERMS_CONDITIONS}`)}>Terms and Conditions</p>
            <div className={'social-media mt-2'}>
              <div>
                <a target={"_blank"} href={FACEBOOK_URL} ><Facebook /></a>
              </div>
              <div>
                <a target={"_blank"} href={INSTAGRAM_URL} ><Instagram /></a>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={5} className={"f-sec-3"}>
          <div className={'f-main-wrapper'}>
            <p className={'f-title fr-font'}>ABOUT B-LOW</p>
            <p className={'mt-2'}>B-LOW was created by Bianca Braun, a professional data scientist and former My Kitchen Rules semi-finalist, who has combined her elite culinary and mathematical skills to create an innovative, easy-to-use, tasty wellness and long-term weight loss platform – perfect for those with the busiest of lifestyles or who want to lose weight with minimal effort.</p>
          </div>
        </Col>
      </Row>
      <div className={'footer-bottom'}>
        <p className="mb-0 clearfix">
        <span className="float-md-center_ d-block_ d-md-inline-block_ mt-25 d-flex justify-content-center">
          <span>
            {/*Copyright © {new Date().getFullYear()}*/}
            Copyright © 2024 B-low Wellness
            {/*Copyright © 2023 B-low Wellness | Website created by Sentura Technologies*/}
          </span>
        </span>
        </p>
      </div>

      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160} style={{zIndex:'1000'}}>
          <Button color="primary" className="btn-icon scroll-top">
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}
    </footer>
  )
}
const mapStateToProps = (state) => ({
  loggedInStatus: state.auth.loggedInStatus,
  status: state.auth.status,
  message: state.auth.message
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: userCredentials => dispatch(actionCreator.logoutUser(userCredentials)),
  resetHandler: () => dispatch(actionCreator.resetWarningHandler()),
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

import React,{Component} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import './style.scss';
import {Form, Radio} from "semantic-ui-react";
import {notifyMessage} from "../../../utility/commonFunc";
import IntlTelInput from "react-intl-tel-input";
import * as validator from "../../../utility/validator";
import {askQuestionUser, contactUser} from "../../../services/user";
import * as actionCreator from "../../../store/domain/auth/action";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
const initialState = {
  name:"", email:"", message:"", subject:"",
  mobileNumber: "", mobileFormat: "", validMobile: false,
};
class App extends Component {
  state = Object.assign({}, initialState);
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onPhoneNumberChange = (condition, value, object, withdialcode) => {
    value = value.startsWith("00") ? "+" + value.substr(2) : value;
    condition = validator.customMobileValidation(withdialcode.substr(1).replace(/\s/g, ""), condition);
    this.setState({validMobile: condition, mobileFormat: withdialcode, mobileNumber: value});
  };
  render() {
    let {name, message, email, subject, mobileNumber, mobileFormat, validMobile} = this.state;
    return (
      <div className={'ask-a-question-wrapper'}>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0 pt-5 pb-5 min-width-400'}>
            <Col md={12} className={'header pb-5'}>
              <p className={'fr-font'}>ASK A QUESTION</p>
              <p>We're here to help.</p>
            </Col>
            <Col md={6} className={'right-panel'}>
              <div className={'sub-wrapper'}>
                {/*<p className={'required'}>Your Name</p>*/}
                <Input
                  type="text" placeholder="Your Name" value={name} onChange={e => this.setState({name: e.target.value})}/>
              </div>
            </Col>
            <Col md={6} className={'right-panel'}>
              <div className={'sub-wrapper'}>
                {/*<p className={'required'}>Your Email</p>*/}
                <Input
                  type="email" placeholder="Your Email" value={email} onChange={e => this.setState({email: e.target.value})}/>
              </div>
            </Col>
            <Col md={12} className={'right-panel'}>
              <div className={'sub-wrapper'}>
                {/*<p className={'required'}>Subject</p>*/}
                <Input
                  type="text" placeholder="Subject" value={subject} onChange={e => this.setState({subject: e.target.value})}/>
              </div>
            </Col>
            <Col md={12} className={'right-panel'}>
              <div className={'sub-wrapper'}>
                {/*<p className={'required'}>Ask Away</p>*/}
                <Input
                  type="textarea" placeholder="Ask Away" value={message} onChange={e => this.setState({message: e.target.value})}/>
              </div>
              <div className="d-flex justify-content-center center mt-0 submit-btn-wrapper">
                <Button.Ripple color="primary" type="submit" className={"cmn-gradient-bg signin-btn"} onClick={this.contactHandler}>
                  Send Your Message
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  contactHandler = () => {
    let {name, message, email, subject} = this.state;
    if(name.trim() === "") return notifyMessage("Name can not be left blank")
    if(email.trim() === "") return notifyMessage("Email address can not be left blank")
    if(!validator.emailRegex.test(email.trim())) return notifyMessage("Please enter valid email")
    if(subject.trim() === "") return notifyMessage("Subject can not be left blank")
    if(message.trim() === "") return notifyMessage("Message can not be left blank")

    const obj = {
      customerName: name.trim(),
      customerEmail: email.trim(),
      emailSubject: subject.trim(),
      emailBody: message.trim()
    }
    this.props.spinnerHandler(true)
    askQuestionUser(obj).then(res => {
      if(res.code === 200) this.setState(initialState)
      notifyMessage(res.message, res.code === 200 ? 1 : 0)
      this.props.spinnerHandler(false)
    })
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(App);

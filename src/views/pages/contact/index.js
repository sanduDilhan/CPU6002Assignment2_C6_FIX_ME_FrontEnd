import React,{Component} from 'react';
import {Button, Col, Input, Row} from "reactstrap";
import './style.scss';
import {Form, Radio} from "semantic-ui-react";
import {customPlaceholder, notifyMessage} from "../../../utility/commonFunc";
import IntlTelInput from "react-intl-tel-input";
import * as validator from "../../../utility/validator";
import {contactUser} from "../../../services/user";
import * as actionCreator from "../../../store/domain/auth/action";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
const initialState = {
  name:"", email:"", message:"", type:"",
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
    let {name, message, email, type, mobileNumber, mobileFormat, validMobile} = this.state;
    return (
      <div className={'container contact-wrapper'}>
        <Row className={'m-0 pt-5 pb-5'}>
          <Col md={12} className={'header pb-5'}>
            <p className={'fr-font'}>WE’D LOVE TO HEAR FROM YOU</p>
            <p>We're here for you! Please feel free to use the form below and we will get back to you within 24-48 hours.</p>
          </Col>
          <Col md={6}>
            <div className={'mid-box'}>
              <p className={'fr-font'}>Tech Support</p>
              <p>Something not working the way it should? Having issues when entering your data into our automated system? Please let us know as soon as possible so we can get it sorted for you!</p>
            </div>
            <div className={'mid-box'}>
              <p className={'fr-font'}>Media Enquiries</p>
              <p>If you are doing a media story about low-carb diets, weight-loss or if you have a product that you think fits perfectly with what we’re about, please feel free to contact us regarding cross-promotions across social media or our website.</p>
            </div>
            <div className={'mid-box'}>
              <p className={'fr-font'}>General Queries</p>
              <p>Something else? Have a query, question or feedback about B-LOW? We’re always here to help.</p>
            </div>
          </Col>
          <Col md={6} className={'right-panel'}>
            <div className={'sub-wrapper'}>
              <p className={'required'}>Name</p>
              <Input
                type="text" placeholder="" value={name} onChange={e => this.setState({name: e.target.value})}/>
            </div>
            <div className={'sub-wrapper'}>
              <p className={'required'}>Email</p>
              <Input
                type="email" placeholder="" value={email} onChange={e => this.setState({email: e.target.value})}/>
            </div>
            {/*<div className={'sub-wrapper'}>*/}
            {/*  <p className={'required'}>Mobile Number</p>*/}
            {/*  <IntlTelInput*/}
            {/*    type={"text"} fieldName={"Mobile Number"} value={mobileNumber}*/}
            {/*    containerClassName="intl-tel-input dashboard-intl" inputClassName="form-control"*/}
            {/*    onPhoneNumberChange={this.onPhoneNumberChange} required={true}*/}
            {/*    preferredCountries={['au']} defaultCountry={"au"} nationalMode={false}*/}
            {/*    customPlaceholder={customPlaceholder}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className={'sub-wrapper'}>
              <p className={'required'}>Type</p>
              <div className={'radio-wrapper'}>
                <Form.Field>
                  <Radio
                    label='Tech Support' name='radioGroup' value='Tech Support'
                    checked={type === 'Tech Support'}
                    onChange={()=>this.setState({type: "Tech Support"})}
                  />
                  <Radio
                    label='Media Enquiries' name='radioGroup' value='Media Enquiries'
                    checked={type === 'Media Enquiries'}
                    onChange={()=>this.setState({type: "Media Enquiries"})}
                  />
                  <Radio
                    label='General Queries' name='radioGroup' value='General Queries'
                    checked={type === 'General Queries'}
                    onChange={()=>this.setState({type: "General Queries"})}
                  />
                </Form.Field>
              </div>
            </div>
            <div className={'sub-wrapper'}>
              <p className={'required'}>Message</p>
              <Input
                type="textarea" placeholder="" value={message} onChange={e => this.setState({message: e.target.value})}/>
            </div>
            <div className="d-flex justify-content-center center mt-0 submit-btn-wrapper">
              <Button.Ripple color="primary" type="submit" className={"cmn-gradient-bg signin-btn"} onClick={this.contactHandler}>
                SEND MESSAGE
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  contactHandler = () => {
    let {name, message, email, type, mobileNumber, mobileFormat, validMobile} = this.state;
    if(name.trim() === "") return notifyMessage("Name can not be left blank")
    if(email.trim() === "") return notifyMessage("Email address can not be left blank")
    if(!validator.emailRegex.test(email.trim())) return notifyMessage("Please enter valid email")
    if(type.trim() === "") return notifyMessage("Type can not be left blank")
    if(message.trim() === "") return notifyMessage("Message can not be left blank")

    const obj = {
      customerName: name.trim(),
      customerEmail: email.trim(),
      emailSubject: type.trim(),
      emailBody: message.trim()
    }
    this.props.spinnerHandler(true)
    contactUser(obj).then(res => {
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

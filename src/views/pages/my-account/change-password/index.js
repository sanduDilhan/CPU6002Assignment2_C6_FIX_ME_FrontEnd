import React from 'react';
import {Row, Col} from "reactstrap";
import InputPasswordToggle from "../../../../components/@vuexy/input-password-toggle";
import '../profile/style.scss'
import TopButtons from "../top-buttons";
import PasswordStrengthBar from 'react-password-strength-bar';
import ReactPasswordStrength from "react-password-strength";
import {changePassword} from "../../../../services/auth";
import {getUserEmail, notifyMessage} from "../../../../utility/commonFunc";
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import * as commonFunc from "../../../../utility/commonFunc";

class App extends React.Component {
  state = {
    password: "", newPassword: "", oldPassword: "", score: 0
  }
  onChangeScore = (score) => {
    console.log("score",score)
    this.setState({score: score})
  }
  validationHandler = () => {
    let {password, newPassword, oldPassword} = this.state;
    // if(oldPassword === "") return notifyMessage("Old password can not be left blank");
    if(oldPassword === "") return notifyMessage("Old password can not be left blank");
    if(password === "") return notifyMessage("New password can not be left blank");
    if(password.length < 6) return notifyMessage("New password very weak. Please enter at least 6 characters");
    if(password !== newPassword) return notifyMessage("New password and confirm password do not match");
    const obj = {
      "email":getUserEmail(),
      "oldPassword":oldPassword.trim(),
      "newPassword":password.trim()
    }
    this.props.spinnerHandler(true)
    changePassword(obj).then(response => {
      this.props.spinnerHandler(false)
      commonFunc.notifyMessage(response.message, response.code === 200 ? 1 : 0);
      if(response.code === 200) {
        this.setState({password: "", newPassword: "", oldPassword: "", score: 0})
      }
    })
  }

  render() {
    let {password, newPassword, oldPassword} = this.state;
    return (
      <div className={'pt-0 pb-5'}>
        <TopButtons activeIndex={1}/>
        <div className={'container '}>
          <div className={'pt-5 profile-wrapper'}>
            <Row className={'row-wrapper-sub max-width-400'}>
              <Col md={12} className={'pb-5'}>
                <p className={'ma-title'}>Change Password</p>
              </Col>
              <Col md={12} className={'pt-2 underline-only'}>
                <p>Old Password</p>
                <InputPasswordToggle className='input-group-merge'
                                     placeholder={' '}
                                     value={oldPassword} onChange={e => this.setState({oldPassword: e.target.value})}
                />
              </Col>
              <Col md={12} className={'pt-2 underline-only'}>
                <p>New Password</p>
                <InputPasswordToggle className='input-group-merge'
                                     placeholder={' '}
                                     value={password} onChange={e => this.setState({password: e.target.value})}
                />
                <PasswordStrengthBar password={password} scoreWords={['Weak', 'Good', 'Good', 'Strong']} shortScoreWord={"Very Weak"} minLength={6} onChangeScore={this.onChangeScore}/>
              </Col>
              <Col md={12} className={'pt-0 underline-only'}>
                <p>Confirm Password</p>
                <InputPasswordToggle className='input-group-merge'
                                     placeholder={' '}
                                     value={newPassword} onChange={e => this.setState({newPassword: e.target.value})}
                />
              </Col>
              <Col md={12} className={'pt-5 text-center'}>
                <button className={'submit-outline-btn'} onClick={this.validationHandler}>Submit</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
// ●●●●●●
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});
export default connect(null, mapDispatchToProps)(App);

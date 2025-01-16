import React,{Component} from 'react';
import './style.scss'
import {Col, Row} from "reactstrap";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  NO_TYPE,
  ROUTE_DASHBOARD,
  SELECTED_PACKAGE_ID,
  WEBSITE_URL,
  YES_TYPE
} from "../../../configs/constant";
import {Check, Facebook, Instagram} from "react-feather";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import * as actionCreator from "../../../store/domain/auth/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {successPayment} from "../../../services/package";
import swal from "sweetalert";
import {history} from "../../../history";
import * as constant from "../../../configs/constant";
import Cookies from "js-cookie";
import {getSelectedPackageId} from "../../../utility/commonFunc";

class App extends Component {
  state = {
    pageStatus: false
  }
  componentDidMount() {
    let packageId = getSelectedPackageId();
    if(packageId) {
      this.props.spinnerHandler(true);
      successPayment().then(response => {
        this.props.spinnerHandler(false);
        if(response.code === 200) {
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, YES_TYPE);
          this.setState({pageStatus: true})
        }else{
          // swal({
          //   title: response.message,
          //   icon: 'error',
          //   closeOnClickOutside: false,
          //   buttons: {
          //     dangerMode: {
          //       text: "Got it",
          //       value: "action",
          //       className: "okay-btn"
          //     }
          //   }
          // })
           swal({
            title: response.message,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: {
              dangerMode: {
                text: "Got it",
                value: "action",
                className: "okay-btn"
              }
            }
          })
            .then((value) => {
              switch (value) {
                case "action":
                  Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
                  history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`)
                  break;
                default:
              }
            })
        }
      })
    }else{
        swal({
          title: "Session not found",
          icon: 'error',
          closeOnClickOutside: false,
          buttons: {
            dangerMode: {
              text: "Okay", value: "action", className: "okay-btn"
            }
          }
          
        })
        .then((value) => {
          switch (value) {
            case "action":
              this.visitHomePage()
              break;
            default:
          }
        })
    }
  }

  render() {
    let {pageStatus} = this.state;
    return (
      <div className={'payment-wrapper container '}>
        {pageStatus ? <div className={'text-center'}>
          <div className={'check-icon'}><Check size={24} /></div>
          <p className={'title fr-font mb-2'}>Thank You!</p>
          <p className={'sub-title'}>We've sent your free report to your inbox so it's easy to access. You can find more information on our website and social pages.</p>
        </div>:null}

        {pageStatus ? <Row className={'m-0 pt-5'}>
          <Col md={6} className={'pb-2 social-wrapper'}>
            <div className={'sw-wrapper'}>
              <p>Connect With Us</p>
              <div className={'social-media '}>
                <div>
                  <a target={"_blank"} href={FACEBOOK_URL} ><Facebook /></a>
                  <a target={"_blank"} href={INSTAGRAM_URL} ><Instagram /></a>
                </div>
              </div>
            </div>


          </Col>
          {/* <Col md={6} className={'pb-2 our-website-wrapper'}>
            <div className={'sw-wrapper'}>
              <p>Visit Our Website</p>
              <button onClick={()=> this.visitHomePage()}>Visit Website</button>
            </div>

          </Col> */}
           <Col md={6} className={'pb-2 our-website-wrapper'}>
            <div className={'sw-wrapper'}>
              <p>Visit Our Website</p>
              <button onClick={()=> this.visitHomePage()}>Visit Website</button>
            </div>

          </Col>
        </Row>:null}
      </div>
    );
  }
  visitHomePage = () => {
    localStorage.removeItem(SELECTED_PACKAGE_ID);
    // window.location.href = WEBSITE_URL
    history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`)
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));

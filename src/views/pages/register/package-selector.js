import React,{Component} from 'react';
import {Col, Row} from "reactstrap";
import './style.scss';
import HeaderStaticBar from "../header-static-bar";
import {withRouter} from "react-router-dom";
import {Check, CheckCircle} from "react-feather";
import {notifyMessage} from "../../../utility/commonFunc";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {createCheckoutSession, getAllPackages} from "../../../services/package";
import {NO_TYPE, SELECTED_PACKAGE_ID} from "../../../configs/constant";
import swal from "sweetalert";
import Cookies from "js-cookie";
import * as constant from "../../../configs/constant";
import {history} from "../../../history";

class App extends Component {
  state = {
    isModal:false, verificationCode: "", activePackage: 0, planName:"", price:"",score: 0,
    packages: [], isPreview: false
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.getAllPackageDetails()
    this.showToastMessage();
  }
  showToastMessage = () => {
    // history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`)
    // notifyMessage("Your current package has now expired. Please renew again",2)
    swal({
      title: "Your current package has now expired. Please re-new again", icon: 'warning', closeOnClickOutside: false,
      buttons: {dangerMode: {text: "Okay", value: "action", className: "okay-btn"}}
    })
      .then((value) => {
        switch (value) {
          case "action":
            this.getAllPackageDetails()
            break;
          default:
        }
      })
  }

  validationHandler = () => {
     this.submitHandler()
  }
  submitHandler = () => {
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
  onChangeScore = (score) => {
    this.setState({score: score})
  }
  getAllPackageDetails = () => {
    this.props.spinnerHandler(true);
    getAllPackages().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let packages = response?.result?.listData ?? [];
        let obj = packages.length > 0 ? packages[0] : null
        this.setState({packages: packages, })
        if(obj) this.setState({activePackage: obj.packageId, planName:obj.packageName, price:obj.packagePrice.toFixed(2), isPreview: true})
      }else{
        notifyMessage(response.message)
      }
    })
  }

  render() {
    let {packages, activePackage, price, planName, isPreview} = this.state;
    return isPreview ? <div className={'register-wrapper'}>
        <HeaderStaticBar bannerURL={"/image-folder/image-section-92-min.jpg"} mainTitle={"Joining Options"} subTitle={<span>CHOOSE THE PLAN THAT <br/> FITS YOUR LIFESTYLE</span>}/>
        <div className={'section-1-wrapper pb-5 pt-5'}>
          {/*<p className={'p1 fr-font'}>Congratulations on taking your first step towards a healthier you!</p>*/}
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
                          <span className={obj.packagePrice > 1 ? `price-100` : obj.packagePrice > 1000 ? `price-1000` : ``}>{obj.packagePrice}</span>
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
        </div>
        {activePackage ? <div className={'container pt-5 pb-5'}>
          <Row className={'m-0 text-center summary-section none-border-top pt-0'}>
              <Col md={12}>
                <p className={'fr-font pb-1'}>Payment Summary</p>
                <p className={'fr-font pb-4'}>Your currently selected plan : <span className={'fr-font bold'}>{planName}</span>, Plan Amount : <span className={'fr-font bold'}>{price} AUD</span>
                  {/*<br/>Current Payable Amount: <span className={'fr-font bold'}>0.00 AUD</span>*/}
                </p>

                <button className={'submit-outline-btn submit-circle'} onClick={this.validationHandler}>Submit</button>
              </Col>
          </Row>
        </div>:null}
      </div>:null
  }
}
// export default withRouter(App);

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));

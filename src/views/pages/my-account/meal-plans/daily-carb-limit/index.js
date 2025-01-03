import React, {Component} from 'react';
import {Row, Col, Input} from "reactstrap";
import TopButtons from "../../top-buttons";
import '../../profile/style.scss';
import './style.scss'
import {getUserId, notifyMessage} from "../../../../../utility/commonFunc";
import {getCarbLimit, saveCarbLimit} from "../../../../../services/carb";
import {spinnerHandler} from "../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {priceInputRegex, priceRegex} from "../../../../../utility/validator";

class App extends Component {
  state = {
    limit: "",
    carbLimit: ""
  }
  setCarbLimit = () => {
    let {limit} = this.state;
    if(limit === "") return notifyMessage("Carb limit can not be left blank")
    if(!priceRegex.test(limit)) return notifyMessage("Invalid carb limit value")
    const obj = {
      "userDetailId":getUserId(),
      "carbLimit":parseFloat(limit).toFixed(2)
    }
    this.props.spinnerHandler(true)
    saveCarbLimit(obj).then(response => {
      this.props.spinnerHandler(false)
      notifyMessage(response.message, response.code === 200 ? 1: 0)
      if(response.code === 200) this.getCarbLimitHandler();
    })
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getCarbLimitHandler();
  }
  getCarbLimitHandler = () => {
    this.props.spinnerHandler(true)
    getCarbLimit().then(response => {
      this.props.spinnerHandler(false)
      if(response.code === 200){
        this.setState({carbLimit: response.result.carbLimit, limit: response.result.carbLimit})
      }else{
        // notifyMessage(response.message, 0)
        this.setState({carbLimit: "", limit: ""})
      }
    })
  }

  render() {
    let {limit, carbLimit} = this.state;
    return (
      <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={8}/>
        <div className={'container'}>
          <div className={'pt-5 carb-wrapper'}>
            <Row className={'m-0 profile-wrapper'}>
              <Col md={12}>
                <p className={'fr-font ma-title'}>SET YOUR OWN DAILY CARB LIMIT</p>
              </Col>
              <Col md={12} className={'row-wrapper pt-3'}>
                <p>Daily Carb Limit:</p>
                <div className={'d-flex- '}>
                  <Input
                    type="text" placeholder="" value={limit} onChange={e => {
                    if(priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({limit: e.target.value})
                  }}/>
                  <button onClick={this.setCarbLimit}>SUBMIT</button>
                </div>
                {carbLimit ? <p className={'pt-3 success-note'}>{`Success! Your daily carb limit has been set to ${carbLimit} grams.`}</p>:null}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(App);

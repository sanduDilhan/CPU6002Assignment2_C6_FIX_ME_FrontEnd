import React,{Component} from 'react';
import TopButtons from "../top-buttons";
import {Col, Row} from "reactstrap";
import './style.scss'
import * as constant from "../../../../configs/constant";
import '../common.scss';
import {TrendingUp, Grid, Calendar} from "react-feather";
import History from "./history";
import Overview from "./overview";

class App extends Component {
  state = {
    activeTab: 1
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    let {activeTab} = this.state;
    return (
      <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={11}/>
        <div className={'container'}>
          <div className={'pt-5 weight-tracker-wrapper'}>
            <Row className={"m-0"}>
              <Col md={12} className={'header-section pb-3'}>
                <p className={"fr-font"}>Your Weight Tracker</p>
              </Col>
              <Col md={12} className={'pb-0 d-flex tab-pane'}>
                <div className={`tab-1 ${activeTab === 1 ? 'active-tab':''}`} onClick={()=>this.setState({activeTab: 1})}>
                  <TrendingUp size={14}/> <span>OVERVIEW</span>
                </div>
                <div className={`tab-2 ${activeTab === 2 ? 'active-tab':''}`} onClick={()=>this.setState({activeTab: 2})}>
                  <Calendar size={14}/> <span>HISTORY</span>
                </div>
              </Col>
              {activeTab === 1 ? <Overview /> : <History />}

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
              Favourite <br/> Recipes
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
      </div>
    );
  }
}
export default App;

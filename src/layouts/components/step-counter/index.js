import React,{Component} from 'react';
import './stepCounter.scss'
import {ASSET_TYPE_1, ASSET_TYPE_2, ASSET_TYPE_3} from "../../../configs/constant";

class App extends Component{

  setIndexHandler = async (step) => {
    // this.props.stepNoHandler(step);
    // let {index,isInvestment} = this.props;
    // let routePath = isInvestment ? quoteStorage.INVESTMENT_ROUTE : quoteStorage.CLICKLIFE_ROUTE;
    //
    // if(index > step){
    //   switch (step) {
    //     case 1:
    //       navigate(`/${routePath}/${isSecoundRoute ? SECOND_ROUTE : `quote/${PICKPLAN_ROUTE}`}`);
    //       break;
    //     case 2:
    //       navigate(`/${routePath}/quote/${HABITS_ROUTE}`);
    //       break;
    //     case 3:
    //       navigate(`/${routePath}/quote/${HEALTH_FORM_ROUTE}`);
    //       break;
    //     case 4:
    //       navigate(`/${routePath}/quote/${YOURSELF_ROUTE}`);
    //       break;
    //     case 5:
    //       navigate(`/${routePath}/quote/${BENEFICIARY_ROUTE}`);
    //       break;
    //   }
    // }
  }
  render() {
    let {index} = this.props;
    let assetTypes1List = localStorage.getItem(ASSET_TYPE_1) ? JSON.parse(localStorage.getItem(ASSET_TYPE_1)) : [];
    let assetTypes2List = localStorage.getItem(ASSET_TYPE_2) ? JSON.parse(localStorage.getItem(ASSET_TYPE_2)) : [];
    let assetTypes3List = localStorage.getItem(ASSET_TYPE_3) ? JSON.parse(localStorage.getItem(ASSET_TYPE_3)) : [];

    let count = (assetTypes1List.length > 0 ? 1 : 0) + (assetTypes2List.length > 0 ? 1 : 0) + (assetTypes3List.length > 0 ? 1 : 0);
    return (
      <div className={"header-section"}>
        <div>
          <ul className="vx-wizard  nav nav-tabs">
            <li className="step-wrapper nav-item">
              <p className={`step step-0 nav-link ${index === 1 ? `active` : ``} ${index > 1 ? `done` : ``} ${index === 10 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(1)} className="step-text">1</span>
              </p>
            </li>
            <li className="step-wrapper nav-item">
              <p className={`step step-1 nav-link ${index === 2 ? `active` : ``} ${index > 2 ? `done` : ``} ${index === 10 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(2)} className="step-text">2</span>
              </p>
            </li>
            <li className="step-wrapper nav-item">
              <p className={`step step-2 nav-link ${index === 3 ? `active` : ``} ${index > 3 ? `done` : ``} ${index === 10 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(3)} className="step-text">3</span>
              </p>
            </li>
            <li className="step-wrapper nav-item">
              <p className={`step step-2 nav-link ${index === 4 ? `active` : ``} ${index > 4 ? `done` : ``} ${index === 10 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(4)} className="step-text">4</span>
              </p>
            </li>
            <li className="step-wrapper nav-item">
              <p className={`step ${(count === 0 || count === 1) ? `step-5`:`step-2`} nav-link step-5 ${index === 5 ? `active` : ``} ${index > 5 ? `done` : ``} ${index === 5 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(5)} className="step-text">5</span>
              </p>
            </li>
            {count > 1 ? <li className="step-wrapper nav-item">
              <p className={`step ${count === 2 ? `step-5`:`step-2`} nav-link ${index === 6 ? `active` : ``} ${index > 6 ? `done` : ``} ${index === 10 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(6)} className="step-text">6</span>
              </p>
            </li> : null}
            {count > 2 ? <li className="step-wrapper nav-item">
              <p className={`step step-5 nav-link ${index === 7 ? `active` : ``} ${index > 7 ? `done` : ``} ${index === 7 ? `disabled`:``}`}>
                <span onClick={()=>this.setIndexHandler(7)} className="step-text">{7}</span>
              </p>
            </li>:null}
          </ul>
        </div>
      </div>
    )
  }
}
export default App;

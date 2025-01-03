import React,{Component} from 'react';
import './style.scss'
import {Col, Row} from "reactstrap";
import {X} from "react-feather";
import {WEBSITE_URL} from "../../../configs/constant";

class App extends Component {
  render() {
    return (
      <div className={'payment-wrapper container '}>
        <div className={'text-center'}>
          <div className={'check-icon cancel-icon'}><X size={24} /></div>
          <p className={'title fr-font mb-2'}>We're sorry to see you go :(</p>
          <p className={'sub-title w-550'}>We've just cancelled your subscription and you will no longer to be charged.</p>

          <button className={'button-back mt-3'} onClick={()=> window.location.href = WEBSITE_URL}>Back to Homepage</button>
        </div>

      </div>
    );
  }
}
export default App;

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 6/20/19
 * Time: 2:08 PM
 */
import React from 'react'
import {connect} from 'react-redux'
import './Delay.scss';

const App = (props) => {
    return props.isSpinner ?
      <div className={"delay-form"}>
        <div className="ui segment" id="data-fetch-loader" >
          <div className="ui active inverted dimmer">
            <div className="ui text loader">
            </div>
          </div>
          <p/>
        </div>
      </div>
    :null
  };

const mapStateToProps = (state) => ({
  isSpinner: state.spinner.isSpinner
});

export default connect(mapStateToProps, null)(App);

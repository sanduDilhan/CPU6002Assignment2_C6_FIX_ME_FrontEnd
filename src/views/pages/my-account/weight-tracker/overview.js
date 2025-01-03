import React, {Component} from 'react';
import {Col, Input} from "reactstrap";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Chart from "react-apexcharts";
import cloneDeep from "lodash/cloneDeep";
import AreachartData from './charts/area-config';
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserId, notifyMessage} from "../../../../utility/commonFunc";
import {
  getActiveTargetWeight,
  getWeightTrackerHistory,
  saveTargetOrActualWeight
} from "../../../../services/weightTracker";
import {priceInputRegex, priceRegex} from "../../../../utility/validator";

class App extends Component {
  state = {
    targetWeight:'',
    originalWeight: '', note:"", date:[moment(new Date()).format("YYYY-MM-DDT00:00:00")],kg:"",
    dateArr: [], weightArr: [], targetArr: []
  }
  componentDidMount() {
    this.getActiveTargetWeightHandler();
  }
  getActiveTargetWeightHandler = (msg = null) => {
    this.props.spinnerHandler(true)
    getActiveTargetWeight().then(response => {
      if(response.code === 200) this.setState({originalWeight: response?.result?.weight, targetWeight:""})
      this.getChartDetails(response?.result?.weight ?? null, msg);
    })
  }
  setTargetHandler = () => {
    let {targetWeight} = this.state;
    if(targetWeight === "") return notifyMessage("Target weight can not be left blank")
    if(!priceRegex.test(targetWeight)) return notifyMessage("Please enter valid target weight")
    this.setTargetHandler_({"userDetailId":getUserId(), "weight":parseFloat(targetWeight).toFixed(2), "isTargetWeight":true});
  }
  clearTargetHandler = () => {
    this.setTargetHandler_({"userDetailId":getUserId(), "weight":null, "isTargetWeight":true});
  }
  setTargetHandler_ = (obj) => {
    this.props.spinnerHandler(true)
    saveTargetOrActualWeight(obj).then(response => {
      if(response.code === 200) return this.getActiveTargetWeightHandler(response?.message ?? "Success");
      this.props.spinnerHandler(false)
      notifyMessage(response.message)
    })
  }
  saveEntryHandler = () => {
    let {note, date, kg, originalWeight} = this.state;
    if(kg === "") return notifyMessage("Weight can not be left blank")
    if(!priceRegex.test(kg)) return notifyMessage("Please enter valid weight")

    const obj = {
      "userDetailId":getUserId(),
      "weight":parseFloat(kg).toFixed(2),
      "isTargetWeight":false,
      "specialNote":note.trim(),
      "actualWeightDate": moment(date[0]).format("YYYY-MM-DD")
    }

    this.props.spinnerHandler(true)
    saveTargetOrActualWeight(obj).then(response => {
      if(response.code === 200){
        this.getChartDetails(originalWeight, response?.message ?? "Success")
      }else{
        this.props.spinnerHandler(false)
        notifyMessage(response.message, response.code === 200 ? 1 : 0)
      }
    })
  }
  getChartDetails = (targetWeight = null, msg = null) => {
    this.props.spinnerHandler(true)
    getWeightTrackerHistory().then(response => {
      let dateArr = [];
      let weightArr = [];
      let targetArr = []
      if(response.code === 200) {
        if(response.result && response.result.length > 0){
          response.result.sort(function(a, b){
            return new Date(a.actualWeightDate.split(" ")[0]).getTime() - new Date(b.actualWeightDate.split(" ")[0]).getTime()
          });

          response.result.map(obj => {
            dateArr.push(obj?.actualWeightDate ? moment(obj.actualWeightDate).format("DD MMM YY") : "-")
            weightArr.push(obj.weight)
            if(targetWeight) targetArr.push(targetWeight)
          })
        }
      }
      this.setState({dateArr, weightArr, targetArr, note:"",kg:""})
      this.props.spinnerHandler(false)
      if(msg) notifyMessage(msg, 1);
    })
  }
  render() {
    let {targetWeight, originalWeight, note, date, kg, dateArr, weightArr, targetArr} = this.state;
    let areaChartOptions = cloneDeep(AreachartData);

    // areaChartOptions.series[0].data = [35, 42, 56, 32, 72, 89];
    // areaChartOptions.series[1].data = [50, 50, 50, 50, 50, 50];
    // areaChartOptions.options.xaxis.categories = ["11 Dec","23 Dec","25 Jul","31 Oct","23 Nov", "10 Dec"];
    areaChartOptions.series[0].data = weightArr;
    areaChartOptions.series[1].data = targetArr;
    areaChartOptions.options.xaxis.categories = dateArr;
  console.log("weightArr",weightArr)
    return (
      <Col md={12}>
        <div className={'panel'}>
          {
            weightArr.length >= 2 ?
              <div className={'mb-3'}>
                <p className={'mb-2 title'}>In a chart</p>
                <Chart
                  options={areaChartOptions.options}
                  series={areaChartOptions.series}
                  type="area"
                  height={400}
                />
              </div>:
              <div className={'mb-3'}>
                <p className={'mt-1 text-center'}>A graph shall appear when 2 or more weight entries have been entered.</p>
              </div>
          }

          <div className={'top-wrapper'}>
            <p className={'mb-2 title'}>Target weight</p>
            {originalWeight ? <p className={'sub-title'}>Your target weight is <span className={'bold black_'}>{`${originalWeight}kg`}</span>.</p>:null}
            <Input
              type="text" placeholder="kg" value={targetWeight} onChange={e => {
              if(priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({targetWeight: e.target.value})
            }}/>
            <div className={'d-flex target-btns'}>
              <button onClick={this.setTargetHandler}>Set Target</button>
              <button onClick={this.clearTargetHandler}>Clear Target</button>
            </div>
          </div>
          <div className={'pt-3 pb-0'}>
            <p className={'mb-2 title'}>Add a new weight entry</p>
            <div>
              <div className={'weight-entry-field'}>
                <Flatpickr
                  options={{
                    // mode: 'range',
                    maxDate: moment(new Date()).format("YYYY-MM-DDT23:59:59")
                  }}
                  className="form-control mw-100"
                  placeholder={"Select range"}
                  value={date}
                  onChange={date => {this.setState({date:date})}}
                />
              </div>
              <div className={'weight-entry-field'}>
                <Input type="text" placeholder="72kg" value={kg} onChange={e => {
                  if(priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({kg: e.target.value})
                }}/>
              </div>
              <div className={'weight-entry-field'}>
                <Input type="textarea" placeholder="Notes" value={note} onChange={e => this.setState({note: e.target.value})}/>
              </div>
              <div className={'target-btns'}>
                <button onClick={this.saveEntryHandler}>Save Entry</button>
              </div>

            </div>
          </div>
        </div>
      </Col>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));


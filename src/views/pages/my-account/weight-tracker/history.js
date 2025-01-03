import React, {Component} from 'react';
import {Col, Input} from "reactstrap";
import DataTable from "react-data-table-component";
import {conditionalRowStyles, getUserId, notifyMessage} from "../../../../utility/commonFunc";
import {
  getActiveTargetWeight,
  getWeightTrackerHistory,
  saveTargetOrActualWeight
} from "../../../../services/weightTracker";
import {priceInputRegex, priceRegex} from "../../../../utility/validator";
import moment from "moment";
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

let data = [
  {
    date:"11/12/2021", kg:"65kg", notes:"", index: 1,
  },
  {
    date:"12/12/2021", kg:"65kg", notes:"", index: 2
  },
  {
    date:"25/07/2022", kg:"72kg", notes:"Test Message", index: 3
  },
  {
    date:"13/07/2022", kg:"75kg", notes:"", index: 4
  }
]
class App extends Component {
  state = {
    targetWeight:'',
    originalWeight: '', tblData: []
  }
  componentDidMount() {
    this.getActiveTargetWeightHandler();
  }
  getActiveTargetWeightHandler = (msg = null) => {
    this.props.spinnerHandler(true)
    getActiveTargetWeight().then(response => {
      if(response.code === 200) this.setState({originalWeight: response?.result?.weight, targetWeight:""})
      this.getChartDetails();
    })
    if(msg) notifyMessage(msg, 1);
  }
  setTargetHandler = () => {
    let {targetWeight} = this.state;
    if(targetWeight === "") return notifyMessage("Target weight can not be left blank")
    if(!priceRegex.test(targetWeight)) return notifyMessage("Please enter valid target weight")

    this.setTargetHandler_({
      "userDetailId":getUserId(),
      "weight":parseFloat(targetWeight).toFixed(2),
      "isTargetWeight":true
    });
  }
  clearTargetHandler = () => {
    this.setTargetHandler_({
      "userDetailId":getUserId(),
      "weight":null, "isTargetWeight":true
    });
  }
  setTargetHandler_ = (obj) => {
    this.props.spinnerHandler(true)
    saveTargetOrActualWeight(obj).then(response => {
      if(response.code === 200) return this.getActiveTargetWeightHandler(response?.message ?? "Success");
      this.props.spinnerHandler(false)
      notifyMessage(response.message)
    })
  }
  getChartDetails = () => {
    this.props.spinnerHandler(true)
    getWeightTrackerHistory().then(response => {
      let result = response?.result ?? [];
      let tblData = [];
      let tblData_ = [];
      result.map((obj,index) => {
        tblData.push({
          actualWeightDate: obj.actualWeightDate ? moment(obj.actualWeightDate).format("DD/MM/YYYY") : "-",
          weight: `${obj.weight}kg`,
          specialNote: obj.specialNote,
          actualWeightDateFormat: obj.actualWeightDate ? moment(obj.actualWeightDate).format("YYYY-MM-DD") : "-",
        })
      })
      tblData.sort(function(a, b){
        return new Date(a.actualWeightDateFormat).getTime() - new Date(b.actualWeightDateFormat).getTime()
      });

      tblData.map((obj,index) => {
        tblData_.push({
          ...obj, index: index+1,
        })
      })
      this.setState({tblData: tblData_})
      this.props.spinnerHandler(false)
    })
  }
  render() {
    let {targetWeight, originalWeight, tblData} = this.state;
    return (
      <Col md={12}>
        <div className={'panel panel-2'}>
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
            <p className={'mb-2 title'}>Weight History</p>
            <DataTable
              className="dataTable-custom rdt_TableHeadRow-color-white"
              // progressPending={true}
              conditionalRowStyles={conditionalRowStyles}
              ignoreRowClick={true}
              data={tblData} pointerOnHover highlightOnHover={false} responsive
              columns={[
                {
                  // style: {backgroundColor: 'rgba(63, 195, 128, 0.9)',color: 'white'},
                  name: "Date", selector: "actualWeightDate", sortable: false, maxWidth: "150px",
                  cell: row => (<p className="text-bold-500  mb-0">{row.actualWeightDate}</p>)
                },
                {
                  name: "Weight (Kg)", selector: "weight", sortable: false,width: '150px',
                  cell: row => (<p className="text-bold-500  mb-0">{row.weight}</p>)
                },
                {
                  name: "Notes", selector: "specialNote", sortable: false,
                  cell: row => (<p className="text-bold-500  mb-0">{row.specialNote}</p>)
                },

              ]}
              noHeader={true}
              pagination={false}
            />
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

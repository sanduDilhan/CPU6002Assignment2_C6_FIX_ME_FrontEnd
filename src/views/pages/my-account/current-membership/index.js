import React,{Component} from 'react';
import TopButtons from "../top-buttons";
import {Col, Row} from "reactstrap";
import './style.scss'
import DataTable from "react-data-table-component";
import '../common.scss';
import {cancelSubscription, getCurrentPackageDetails} from "../../../../services/package";
import {history} from "../../../../history";
import * as constant from "../../../../configs/constant";
import Cookies from "js-cookie";
import {NO_TYPE} from "../../../../configs/constant";
import * as commonFunc from "../../../../utility/commonFunc";
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from "moment";
import {notifyMessage} from "../../../../utility/commonFunc";
import swal from "sweetalert";

let data = [
  {
  no:1943,
  plan:"Monthly Plan",
  type:"Type",
  start:"2023-12-20",
  expire:"2024-02-21",
  cycleDate: "2024-01-01"
},
  {
    no:1945,
    plan:"Annual Plan",
    type:"Type",
    start:"2023-12-20",
    expire:"2024-02-21",
    cycleDate: "2024-01-01"
  }
]
class App extends Component {
  state = {
    tblData: [], isLoading: false
  }
  componentDidMount() {
    window.scrollTo(0, 0);
   this.getCurrentPackageDetailsHandler();
  }
  getCurrentPackageDetailsHandler = (msg = null) => {
    // this.props.spinnerHandler(true);
    this.setState({isLoading: true})
    getCurrentPackageDetails().then(response => {
      let tblData = [];
      if(response.code === 200) {
        let results = response.result;
        // if(results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        results.map(obj => {
          tblData.push({
            no: obj.userPackageId,
            plan: obj?.packageDetail?.packageName ?? "-",
            type: obj.packageDetail ? <div className={'sub-wrapper'}><p className={'sub-text'}>Subscription</p><p>{`$${obj.packageDetail.packagePrice} - ${obj.packageDetail.validDayCount === 30 ? "Monthly": obj.packageDetail.validDayCount === 365 ? "Yearly": `Every ${obj.packageDetail.validDayCount} days`}`}</p></div> : "-",
            // start: obj.startDate ? moment(obj.startDate).format("DD/MM/YYYY"): "-",
            start: obj.cycleDate ? <div className={'sub-wrapper'}><p>{moment(obj.startDate).format("DD/MM/YYYY")}</p>{obj.isTrialActive ? <p className={'color-green'}>(Trial Active)</p>:null}</div> : "-",
            // expire: obj.expireDate ? moment(obj.expireDate).format("DD/MM/YYYY"): "-",
            expire: "Never Expires",
            cycleDate: obj.cycleDate ? <div className={'sub-wrapper'}><p>{moment(obj.cycleDate * 1000).format("DD/MM/YYYY")}</p><p>(Auto Debit)</p></div> : "-",
          })
        })
      }
      this.setState({tblData})
      this.setState({isLoading: false})
      this.props.spinnerHandler(false);
      if(msg) notifyMessage(msg, 1)
    })
  }
  cancelHandler = () => {
    swal({
      title: commonFunc.sureTxt,
      closeOnClickOutside: false,
      buttons: {cancel: 'No', dangerMode: {text: "Yes", value: "action", className: "okay-btn"}}
    })
      .then((value) => {
        switch (value) {
          case "action":

            this.props.spinnerHandler(true);
            cancelSubscription().then(response => {
              if(response.code === 200) {
                this.getCurrentPackageDetailsHandler(response?.message ?? "Success");
              }else{
                this.props.spinnerHandler(false);
                notifyMessage(response.message)
              }
            })

            break;
          default:
        }
      })
  }
  render() {
    let {tblData, isLoading} = this.state;
    return (
      <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={-1}/>
        <div className={'container'}>
          <div className={'pt-5 current-membership-wrapper'}>

            <Row className={"m-0"}>
              <Col md={12} className={'header-section pb-3'}>
                <p className={"fr-font"}>Current Membership</p>
              </Col>
              <Col md={12} className={'pb-3'}>
                <DataTable
                  className="dataTable-custom"
                  progressPending={isLoading}
                  progressComponent={<p className={'loading-text'}>Loading ...</p>}
                  data={tblData} pointerOnHover highlightOnHover={false} responsive
                  columns={[
                    {
                      name: "No.", selector: "no", sortable: false, width: "80px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.no}</p>)
                    },
                    {
                      name: "Membership Plan", selector: "plan", sortable: false, minWidth: "200px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.plan}</p>)
                    },
                    {
                      name: "Plan Type", selector: "type", sortable: false, minWidth: "200px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.type}</p>)
                    },
                    {
                      name: "Starts On", selector: "start", sortable: false, width: "120px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.start}</p>)
                    },
                    {
                      name: "Expires On", selector: "expire", sortable: false, width: "120px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.expire}</p>)
                    },
                    {
                      name: "Cycle Date", selector: "cycleDate", sortable: false, width: "120px",
                      cell: row => (<p className="text-bold-500  mb-0">{row.cycleDate}</p>)
                    },
                    {
                      name: "Action", selector: "action", sortable: false, width: "150px",
                      cell: row => (<div><button className={'btn btn-danger cmn-btn-style'} onClick={this.cancelHandler}>Cancel</button></div>)
                    },
                  ]}
                  noHeader={true}
                  pagination={false}
                />
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
export default connect(null, mapDispatchToProps)(withRouter(App));

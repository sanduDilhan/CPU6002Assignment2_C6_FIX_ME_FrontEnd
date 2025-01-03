import React from 'react';
import {Table} from "reactstrap";
import * as commonFunc from "../../../utility/commonFunc";

class App extends React.Component {
  render() {
    let {obj} = this.props;
    let innerObj = obj;
    return (
      <div className={"query-wrapper w-100"}>
        <div className={"row m-0"}>
            <div className={"col-md-12"}>
              <Table
                responsive
                className="dashboard-table table-hover-animation mb-0"
              >
                <thead>
                {commonFunc.getTableHeader()}
                </thead>
                <tbody>
                {
                  innerObj.items.length !== 0 ?
                    innerObj.items.map((obj, index) => {
                      return <tr>
                        <img src={obj.image} className={"tbl-item-img"}/>
                        <td>{obj.name}</td>
                        <td>{obj.qty}</td>
                        <td>{commonFunc.numberWithCommas(obj.unitPrice.toFixed(2))}</td>
                        <td>{commonFunc.numberWithCommas(obj.price.toFixed(2))}</td>
                      </tr>
                    }) : !this.props.isSpinner ? <tr><td colSpan="3"><center>{" No Data"}</center></td></tr> : null
                }
                </tbody>
              </Table>
              <p className={'tbl-full-amount'}>{`Total price: LKR ${commonFunc.numberWithCommas(obj.price.toFixed(2))}`}</p>
            </div>
          </div>
      </div>
    );
  }
}
export default App;

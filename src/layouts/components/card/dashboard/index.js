import React from 'react';
import {CardBody, Card, Spinner} from "reactstrap";
import './style.scss';

const App = (props) => {
  return <Card className={"dashboard-card"}>
    <CardBody
      className={`${"stats-card-body"} d-flex ${
        !props.iconRight && !props.hideChart
          ? "flex-column align-items-start"
          : props.iconRight
          ? "justify-content-between flex-row-reverse align-items-center"
          : props.hideChart && !props.iconRight
            ? "justify-content-center flex-column text-center"
            : null
        } ${!props.hideChart ? "pb-0" : "pb-2"} pt-2`}
    >
      <div className="icon-section">
      </div>
      <div className="title-section">
        <h2 className="text-bold-600 mt-3__ mb-25">{props.count !== null ? props.count:<Spinner color={"#1e1e1e"} className={"dashboard-loader"} size={5}/>}</h2>
        <p className=" stat-title">{`${props.name}`}</p>
      </div>
    </CardBody>

  </Card>
};
export default App;

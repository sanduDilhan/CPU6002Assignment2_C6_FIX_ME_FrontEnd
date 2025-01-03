import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {BASE_ROUTE_PATH, ROUTE_MA_MAIN_MEAL_PLANNER, SELECTED_TEMPLATE_ID} from "../../../../../configs/constant";
import {withRouter} from "react-router-dom";

class App extends Component {
  navigateHandler = (templateId) => {
    localStorage.setItem(SELECTED_TEMPLATE_ID, templateId)
    this.props.history.push({pathname: `${BASE_ROUTE_PATH}${ROUTE_MA_MAIN_MEAL_PLANNER}`})
  }
  render() {
    const { item, itemSelected, dragHandleProps } = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;
    let index = item.key;
    return (
      <div
        style={{
          transform: `scale(${scale})`,
          // boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
        }}
        className={`item ${ dragged ? `dragged`:`` }`}
      >
        <div>
          <Row key={index} className={'m-0'}>
            <Col md={1} className={'drag-icon-wrapper'}>
              <div className="dragHandle" {...dragHandleProps} />
            </Col>
            <Col md={11} className={'d-flex align-items-center text-name-wrapper cursor-pointer'} onClick={()=>this.navigateHandler(item.id)}>
              <p>{item.name}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default withRouter(App);

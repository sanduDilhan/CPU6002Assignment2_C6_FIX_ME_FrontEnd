import React from 'react';
import {Col, Row, ModalHeader, ModalBody, Modal} from "reactstrap";
import moment from "moment";
import './styles.scss';
import * as commonFunc from "../../../utility/commonFunc";
import * as dropdownConst from "../../../utility/dropdownConstant";
import OrderItems from "./order-items";
import swal from "sweetalert";
import {getAllOrders, updateOrderStatus} from "../../../services/orders";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {connect} from "react-redux";
import NoData from "../../../layouts/components/no-data";
import {orderTypes} from "../../../utility/dropdownConstant";
import {RefreshCcw} from "react-feather";
import {getAllItems} from "../../../services/item";
import * as constant from "../../../configs/constant";


class App extends React.Component {
  state = {
    data: [],
    filterType:"ALL",
    selectedObj:null, isPreview: false
  }
  dropdownHandler = (status) => (e, {value}) => {
    this.setState({[status]:value})
    this.getAllOrders(value)
  }
  getAllItems = async (msg = null) => {
    await getAllItems()
      .then(response => {
        if (response.code === 200) this.cartQtyUpdate(response.data);
      })
  }
  cartQtyUpdate = (customList) => {
    let {cartList} = this.props;
    cartList.map(obj => {
      let selectedItem = customList.find(object => obj.id === object.id);
      obj.availableQty = selectedItem ? selectedItem.qty : obj.availableQty;
    })
    this.props.addToCartHandler(cartList)
  }
  receivedOrder = (orderId) => {
    swal({
      title: commonFunc.receivedTxt, closeOnClickOutside: false, buttons: {cancel: 'No', dangerMode: {text: "Yes", value: "action", className: "okay-btn"}}
    })
      .then(async (value) => {
        switch (value) {
          case "action":
            this.pickHandler(orderId);
            break;
          default:
        }
      });
  }
  pickHandler = async (orderId) => {
    this.props.spinnerHandler(true);
    await updateOrderStatus(orderTypes[4].value, orderId)
      .then(response => {
        if (response.code === 200) {
          this.getAllOrders(orderTypes[4].value, response.message)
        }else{
          this.props.spinnerHandler(false);
          commonFunc.notifyMessage(response.message);
        }
      })
  }
  // componentDidMount() {
  //   this.getAllItems();
  //   this.getAllOrders("ALL")
  // }

  getAllOrders = async (status,msg = null) => {
    // let isAccess = checkAccessHandler();
    // if(isAccess) return this.dashboardPageHandler();
    this.props.spinnerHandler(true)
    await getAllOrders(status)
      .then(response => {
        let customList = [];
        if(response.code === 200){
          if(response.data.length > 0) {
            response.data.map(obj => {
              let items = [];
              obj.items.map(itemObj => items.push({image: itemObj.image, name: itemObj.itemName, qty: itemObj.qty, unitPrice: itemObj.price, price: itemObj.subTotalPrice}))
              customList.push({id: obj.id, date:obj.dateOfPlaced, status:obj.orderStatus, price:obj.totalOrderPrice, items: items, dateOfCompleted: obj.dateOfCompleted})
            })
          }
        }
        this.setState({data: customList})
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
        if(msg) commonFunc.notifyMessage(msg, 1);
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.spinnerHandler(true)
    // let isAccess = checkAccessHandler();
    // if(isAccess) return this.dashboardPageHandler();
    this.previewHandler();
  }
  dashboardPageHandler = () => {
    this.props.history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_DASHBOARD}`);
  }
  previewHandler = () => {
    this.props.spinnerHandler(false);
    this.setState({isPreview: true})
  }
  render() {
    let {data, filterType, selectedObj, isPreview} = this.state;
    let {isSpinner} = this.props;
    return (
      isPreview ? <div className={"my-order"}>
        <Col xs={12} className={"p-0 d-flex justify-content-right w-100"}>
          <div className={"filter_"}>
            {/*<span className={"wrap-lbl"}>Filter: </span>*/}
            {/*<Dropdown placeholder='' fluid search selection options={orderTypes} value={filterType} onChange={this.dropdownHandler('filterType')} selectOnBlur={false}/>*/}
            <div className={"refresh-tbl-wrapper"}>
              <button className={"icon-btn-tbl"} onClick={()=>this.getAllOrders(filterType)}><RefreshCcw color={"gray"} size={16}/></button>
            </div>
          </div>
        </Col>
        <Row>
          {data.length > 0 ?
              data.map((obj,index)=>{
                return <Col md={4} className={'main-card-wrapper'} key={index}>
                  <div className={`card-wrapper `}>
                    {/*<p className={'order-id'}>{`#${obj.id}`}</p>*/}
                    <p className={`status ${obj.status}`}>{obj.status.replace('_', ' ')}</p>
                    <p className={'price-tile'}>Price: <span>{`LKR ${commonFunc.numberWithCommas(obj.price.toFixed(2))}`}</span></p>
                    <p className={'normal_'}>Date of Placed: <span>{moment(obj.date).format("DD MMM, YYYY - hh:mm a")}</span></p>
                    {obj.dateOfCompleted ? null:<hr/>}
                    <div className={`btn-wrapper d-flex justify-content-space-between ${obj.dateOfCompleted ? `comp-sec`:``}`}>
                      <div className={'order-id-wrapper'}>
                        {obj.dateOfCompleted ?
                          <div className={"first-div"}>
                            <p className={'order-id mr-1'}>{`#${obj.id}`}</p>
                            <div className={'comp-div'}>
                              <p>Date of Completion: </p>
                                <p><span>{`${moment(obj.dateOfCompleted).format("DD MMM, YYYY - hh:mm a")}`}</span></p>
                              </div>
                          </div>
                            :<p className={'order-id'}>{`#${obj.id}`}</p>}
                      </div>
                      <div>
                        <button className={'view-items-btn'} onClick={()=>this.setState({selectedObj:obj})}>View Items</button>
                        {dropdownConst.orderTypes[3].value === obj.status ?
                          <button className={'pick-up-btn'} onClick={()=>this.receivedOrder(obj.id)}>Confirm Order Received</button>:null}
                      </div>
                    </div>
                  </div>
                </Col>
              }) : !isSpinner ? <NoData message={`There are no submissions for you`} /> : null}

          <Col md={12} className={'coming-soon-txt'}>We are currently working on something new and we will be back soon with awesome new features.</Col>
        </Row>
        <Modal size={"lg"} isOpen={selectedObj !== null}>
          {selectedObj ? <ModalHeader toggle={()=>this.setState({selectedObj: null})} className={"selector-wrapper inline-flex"}>
            Order Items
          </ModalHeader>:null}
          <ModalBody className="modal-dialog-centered">
            {selectedObj ? <OrderItems obj={selectedObj} />:null}
          </ModalBody>
        </Modal>
      </div>:null
    );
  }
}
const mapStateToProps = (state) => ({
  isSpinner: state.spinner.isSpinner,
});
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from "react"
import {Button, Col, Row} from "reactstrap"
import {X, Trash, ShoppingCart, CheckCircle} from "react-feather"
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { ContextLayout } from "../../../utility/context/Layout"
import "../../../assets/scss/components/customizer.scss"
import * as Icon from "react-feather";
import * as commonFunc from "../../../utility/commonFunc";
import {spinnerHandler} from "../../../store/domain/spinner/action";
import {addToCartHandler} from "../../../store/domain/cart/action";
import {connect} from "react-redux";
import NoData from "../../../layouts/components/no-data";
import * as constant from "../../../configs/constant";
import {placeOrder} from "../../../services/orders";
import {withRouter} from "react-router-dom";
import swal from 'sweetalert';

class Customizer extends React.Component {
  componentDidMount() {
    this.sessionDataHandler();
  }
  sessionDataHandler = () => {
    let cartData = localStorage.getItem('CART_');
    if(cartData) {
      this.props.addToCartHandler(JSON.parse(cartData))
    }
  }
  updateCountHandler = (status, index) => {
    let {cartList} = this.props;
    let selectedItem = cartList[index];
    if(status === "UP") {
      if((selectedItem.qty + 1) > selectedItem.availableQty) return commonFunc.notifyMessage(`Quantity exceeded`);
      selectedItem.qty = selectedItem.qty + 1;
    }else{
      selectedItem.qty = selectedItem.qty > 1 ? selectedItem.qty - 1 : 1;
    }
    this.props.addToCartHandler(cartList);
    this.props.spinnerHandler(true);
    this.props.spinnerHandler(false);
  }
  removeHandler = (index) => {
    this.props.spinnerHandler(true);
    let {cartList} = this.props;
    if(cartList.length === 1) this.props.handleCustomizer(false);
    commonFunc.notifyMessage(`${cartList[0].name} has been removed`, 1, 1000, 'center');
    cartList.splice(index, 1);
    this.props.addToCartHandler(cartList);
    this.props.spinnerHandler(false);
  }
  submitHandler = async () => {
    swal({
      title: commonFunc.sureTxt,
      closeOnClickOutside: false,
      buttons: {cancel: 'No', dangerMode: {text: "Yes", value: "action", className: "okay-btn"}}
    })
      .then((value) => {
        switch (value) {
          case "action":
            this.apiHandler();
            break;
          default:
        }
      })
  }
  apiHandler = async () => {
    this.props.spinnerHandler(true)
    let {cartList} = this.props;
    let items = [];
    cartList.map(obj => {
      items.push({"id": obj.id, "qty": obj.qty})
    })
    const obj = {
      items: items
    }
    await placeOrder(obj)
      .then(response => {
        if(response.code === 200){
          this.props.addToCartHandler([]);
          this.props.handleCustomizer(false);
          this.props.history.push(constant.BASE_ROUTE_PATH+constant.ROUTE_MY_ORDERS);
        }
        commonFunc.notifyMessage(response.message, response.code === 200 ? 1:0)
      })
      .finally(fin => {
        this.props.spinnerHandler(false)
      });
  }
  render() {
    let {cartList} = this.props;
    let price = 0;
    return (
      <ContextLayout.Consumer>
        {context => {
          return (
            <div
              className={classnames("customizer  d-md-block", {
                open: this.props.customizerState === true
              })}
            >
              <div className="header d-flex justify-content-between px-2 pt-2">
                <div className="title">
                  <h4 className="text-uppercase_ mb-0">{`Shopping Cart (${cartList.length})`}</h4>
                  <small>Proceed with Selected items</small>
                </div>
                <div
                  className="close-icon cursor-pointer"
                  onClick={() => this.props.handleCustomizer(false)}
                >
                  <X size={24} />
                </div>
              </div>
              <hr />
              <PerfectScrollbar
                options={{
                  wheelPropagation: false
                }}
                className="customizer-content p-2"
              >
                {
                 cartList.length > 0 ? cartList.map((obj,index)=>{
                    price = price + (obj.price * obj.qty);
                     return <Row key={index} className={"cart-zone-list"}>
                       <Col xs={1} className={"cart-rem"}>
                         {/*<Trash size={24} color={'white'}/>*/}
                         <div className={"remove-wrapper"} onClick={()=>this.removeHandler(index)}>
                           <X size={24} />
                         </div>
                       </Col>
                       <Col xs={2} className={"cart-img"}>
                          <img src={obj.icon}  alt={"."}/>
                       </Col>
                       <Col md={7} className={'cart-middle'}>
                         <div className={"cart-txt"}>
                           <p>{obj.name}</p>
                         </div>
                         <div className={"cart-price"}>
                           <p>{`LKR ${commonFunc.numberWithCommas(obj.price.toFixed(2))}`} <span className={'dark-clr_'}>x {`${obj.qty.toString()}`}</span></p>
                         </div>
                       </Col>

                       <Col md={2} className={"cart-count"}>
                         <div className={"cart-count-wrapper"}>
                           <button className={"sec-1"} onClick={()=>this.updateCountHandler('DOWN',index)}><Icon.Minus size={14} /></button>
                           <p className={"sec-2"}>{obj.qty}</p>
                           <button className={"sec-3"} onClick={()=>this.updateCountHandler('UP',index)}><Icon.Plus size={14} /></button>
                         </div>
                       </Col>
                     </Row>
                  }) : <NoData message={"No items added to cart yet"} width={'w-75'} type={"CART"} />}
                {
                  price > 0 ?
                    <div>
                      <hr />
                      <div className={'total-wrapper'}>
                        <p>Total:</p>
                        <p>{`LKR ${commonFunc.numberWithCommas(price.toFixed(2))}`}</p>
                      </div>
                      <div>
                        <div className="d-flex justify-content-center center btn-wrapper">
                          <Button.Ripple color="primary" type="submit" className={"cmn-gradient-bg signin-btn"} onClick={this.submitHandler}>
                            <CheckCircle size={18} /> &nbsp;&nbsp;Checkout
                          </Button.Ripple>
                        </div>
                      </div>
                    </div>:null
                }
              </PerfectScrollbar>
            </div>
          )
        }}
      </ContextLayout.Consumer>
    )
  }
}
const mapStateToProps = (state) => ({
  isSpinner: state.spinner.isSpinner,
  cartList: state.cartStock.cartList,
});
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data)),
  addToCartHandler: data => dispatch(addToCartHandler(data)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customizer));
// export default Customizer

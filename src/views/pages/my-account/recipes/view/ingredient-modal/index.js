import React,{Component} from 'react';
import {Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import {Dropdown} from "semantic-ui-react";
import {getAllActiveIngredientPublicSite, getIngredientObj} from "../../../../../../services/ingredient";
import {spinnerHandler} from "../../../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {notifyMessage} from "../../../../../../utility/commonFunc";
import {onlyDigit, passwordRegex, priceInputRegex, priceRegex} from "../../../../../../utility/validator";


class App extends Component {
  state = {
    ingredientId: "",
    obj: null,
    measurement: "",
    ingredients: []
  }
  componentDidMount() {
    let {editObj} = this.props;
    if(editObj) {
      this.setState({
        // obj: editObj,
        measurement: editObj.measurement,
        ingredients: [editObj],
        // ingredientId: editObj.ingredientDetailId
      })
      this.getIngredientObjDetails(editObj.ingredientDetailId)
    }else{
      this.getAllIngredientsHandler();
    }
  }
  getIngredientObjDetails = (ingredientDetailId) => {
    this.props.spinnerHandler(true)
    getIngredientObj(ingredientDetailId).then(response => {
      this.props.spinnerHandler(false)
      if(response.code === 200) {
        this.setState({obj: response.result, ingredientId: ingredientDetailId})
      }else{
        notifyMessage(response.message)
      }
    })
  }
  getAllIngredientsHandler = () => {
    this.props.spinnerHandler(true)
    getAllActiveIngredientPublicSite().then(response => {
      this.props.spinnerHandler(false)
      if(response.code === 200) {
        this.setState({ingredients: response.result})
      }
    })
  }
  dropdownHandler = (e, {value}) => {
    let {ingredients} = this.state;
    let findObj = ingredients.find(obj => obj.ingredientDetailId === value);
    this.setState({ingredientId: value, obj: findObj, measurement: findObj?.measurement})
  }
  render() {
    let {editObj} = this.props;
    let {ingredientId,ingredients, obj, measurement} = this.state;
    let data = [];
    ingredients.map(obj => {
      data.push({value: obj.ingredientDetailId, text: `${obj.subTitle ?? obj.externalRecipe ?? obj.ingredient} ${obj.brand ? `(${obj.brand})` : ``}`})
    })
    return (
      <div>
        <Modal centered={true} size={"md"} isOpen={true} >
          <ModalHeader className={'forgot-haader-modal'} toggle={()=>this.props.closeHandler(null)}>
            {editObj !== null ? "Update Ingredient" : "Add Ingredient"}
          </ModalHeader>
          <ModalBody className="modal-dialog-centered_ pt-0">
            <div className={'body-modal-wrapper text-center_ p-1'}>
              <p className={'mt-1'}>Search Ingredients</p>
              <Dropdown placeholder='' disabled={editObj !== null} fluid search selection multiple={false} options={data} value={ingredientId} onChange={this.dropdownHandler} selectOnBlur={false}/>

              {obj ? <div className={'mt-2'}>
                <p className={'mt-1'}>Measurement</p>
                <Input type="text" placeholder="" value={measurement} onChange={e => {
                  if(priceInputRegex.test(e.target.value) || e.target.value === "") this.setState({measurement: e.target.value})
                }}/>
                <p className={'mt-1'}>Measurement Type</p>
                <Input type="text" placeholder="" value={obj?.measurementType ?? ""} disabled={true}/>
              </div> : null}

              <div className={'text-center'}>
                <button className={'submit-outline-btn mt-2'} onClick={this.validateHandler}>{editObj !== null ? "Update" : "Add"}</button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
  validateHandler = () => {
    let {obj, measurement} = this.state;
    if(obj === null) return notifyMessage("Please select a ingredient")
    if(measurement === "") return notifyMessage("Measurement can not be left blank")
    if(!priceRegex.test(measurement)) return notifyMessage("Invalid measurement")

    obj.originalMeasurement = obj.measurement;
    obj.measurement = parseFloat(parseFloat(parseFloat(measurement).toFixed(2)));
    this.props.closeHandler(obj)
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(App);

import React, {Component} from 'react';
import TopButtons from "../top-buttons";
import {Col, Row} from "reactstrap";
import './style.scss'
import {getAllIngredients} from "../../../../services/ingredient";
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import Footer from "../../../../layouts/components/footer/Footer";
import ReactDOM from "react-dom";

class App extends Component {
  state = {
    ingredients: []
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllIngredientsHandler();
    window.addEventListener('scroll', this.handleScroll);
  }

  getAllIngredientsHandler = () => {
    this.props.spinnerHandler(true)
    getAllIngredients().then(response => {
      this.props.spinnerHandler(false)
      if (response.code === 200) {
        this.setState({ingredients: response.result})
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // console.log("abc...")
    // let scrollAmount = window.scrollY || window.pageYOffset;
    // console.log("scrollAmount", scrollAmount)

    let header = document.getElementById("myHeader");
    let sticky = header.offsetTop;
    const chatContainer = ReactDOM.findDOMNode(this.tblArea)

    if ((window.pageYOffset + 100) > sticky) {
      // header.classList.add("sticky");
      // document.getElementById("content-wrapper").classList.add("content-wrapper-clone");
      document.getElementById("static-view-wrapper").classList.remove("d-none");
      document.getElementById("static-view-wrapper").style.width = `${chatContainer.clientWidth}px`
    } else {
      // header.classList.remove("sticky");
      // document.getElementById("content-wrapper").classList.remove("content-wrapper-clone");
      document.getElementById("static-view-wrapper").classList.add("d-none");
    }

    if ((window.pageYOffset) > 0 &&  (window.pageYOffset) < 10) {
      // header.classList.remove("sticky");
      // document.getElementById("content-wrapper").classList.remove("content-wrapper-clone");
      document.getElementById("static-view-wrapper").classList.add("d-none");
    }



  }

  render() {
    let {ingredients} = this.state;
    return (
      <div className={'pt-0 pb-5'}>
        <TopButtons activeIndex={10}/>
        <div className={'container  '}>
          <div className={'pt-5 carb-counts-wrapper'}>

            <Row className={"m-0"}>
              <Col md={12} className={'header-section pb-3'}>
                <p className={"fr-font"}>CARB COUNT TRACKER</p>
                <p>Please note, the carb counts are subject to change as they may vary slightly between brands and
                  research sources. Also, brands themselves sporadically update their products and consequently their
                  nutrition values. If you are alerted to a change before we’ve updated it, please let us know!</p>
              </Col>
              <Col md={12} className={'scroll-x tableFixHead'} id={"myHeader"}>
                <div id={'static-view-wrapper'} className={'d-none'}>
                  <p>Ingredient</p>
                  <p>Brand</p>
                  <p>Measurement</p>
                  <p>Carbs per 100g/ml</p>
                </div>
                <table id="dalt-table-35" className="dalt-table" ref={el => {this.tblArea = el}}>
                  <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Brand</th>
                    <th>Measurement</th>
                    <th>Carbs per 100g/ml</th>
                  </tr>
                  </thead>

                  <tbody>
                  {
                    ingredients.map((obj, index) => {
                      return <tr key={index}>
                        <td>{obj.ingredient}</td>
                        <td>{obj.brand}</td>
                        <td>{obj.measurementType === "g" || obj.measurementType === "ml" ? "" : `${obj.measurement ? obj.measurement : ""} ${obj.measurementType ?? ""}`}</td>
                        <td>{obj.carbs}</td>
                      </tr>
                    })
                  }

                  </tbody>
                </table>
              </Col>
              {/*<Col md={12}>*/}
              {/*  <Footer />*/}
              {/*</Col>*/}
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

export default connect(null, mapDispatchToProps)(App);

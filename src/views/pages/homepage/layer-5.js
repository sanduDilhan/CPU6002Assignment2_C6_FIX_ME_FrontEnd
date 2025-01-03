import React,{Component} from 'react';
import {Col, Row} from "reactstrap";
import {Counter} from "./counter";
let LIST = ["No Maths", "No Writing"]
class App extends Component {
  state = {
    subTitle:LIST[0], count: 1
  }
  componentDidMount() {
    let index = 0;
    this.ly5 = setInterval(()=>{
      index = index === 1 ? 0 : index + 1;
      this.setState({subTitle: LIST[index]})
      // document.getElementById("animate-l5").classList.add("opacity-none")
      if(document.getElementById("animate-l5")) document.getElementById("animate-l5").classList.add("aos-animate")

      setTimeout(()=>{
        // document.getElementById("animate-lbl").classList.add("d-block")
        // document.getElementById("animate-l5").classList.remove("opacity-none")
        if(document.getElementById("animate-l5")) document.getElementById("animate-l5").setAttribute('data-aos', 'zoom-in')
        if(document.getElementById("animate-l5")) document.getElementById("animate-l5").classList.remove("aos-animate")
      },1700)
    },2000)
  }
  onScrollToMiddle = () => {
    this.ly51 = setInterval(()=>{
      if(this.state.count < 50) {
        this.setState({count: this.state.count + 1})
      }else{
        clearInterval(this.ly51)
      }
    },75)
  }
  componentWillUnmount() {
    if(this.ly5) clearInterval(this.ly5)
    if(this.ly51) clearInterval(this.ly51)
  }

  render() {
    let {subTitle, count} = this.state;
    return (
      <div className={''}>
        <Row className={"layer-5-wrapper m-0 mb-0 green-sec"}>
          <Col md={12}>
            <p className={'section-title fr-font'} id={'animate-l5'} data-aos={'zoom-down'}>{subTitle}</p>
          </Col>
          <Col md={7}>
            <p className={'left-txt'} >
              <p className={'mb-0'} data-aos="slide-right">Are you diabetic and tracking your carb intake? Measuring your macros perhaps? Setting a daily carb limit for weight loss?
                Well, B-LOW was designed so that our members virtually don’t need to calculate a thing!</p>
              <br/><br/>
              <p className={'mb-0'} data-aos="slide-right">Create your own meal plan with our drag and drop functionality, you can bring in any recipes and hundreds of ingredients of your choice, and B-LOW does all the counting for you! Additionally, you can adjust the serving size and customise a recipe by editing, adding and removing ingredients to suit your palate, or whatever you have in your fridge!</p>
            </p>
          </Col>
          <Col md={5} className={'layer-plus'}>
            <Counter onScrollToMiddle={this.onScrollToMiddle}/>
            <p className={'right-txt rr-font'}>+{count}</p>
          </Col>
          <Col md={12} className={'p-0 svg-section'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path className="elementor-shape-fill" d="M500.2,94.7L0,0v100h1000V0L500.2,94.7z"></path>
            </svg>
          </Col>
        </Row>
      </div>
    );
  }
}
export default App;

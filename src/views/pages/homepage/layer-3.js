import React,{Component} from 'react';
import {Col, Row} from "reactstrap";

let LIST = [
  "INCREASE ENERGY LEVELS",
  "LOOK AND FEEL AMAZING",
  "LIVE LIFE TO THE FULLEST",
  "LOSE WEIGHT LONG TERM"
]
class App extends Component {
  state = {
    prevTitle: 2,
    subTitle:LIST[0]
  }
  componentDidMount() {
    let index = 0;
    this.l3 = setInterval(()=>{
      index = index === 3 ? 0 : index + 1;
      let element = document.getElementById("animate-lbl");
      // document.getElementById("animate-lbl").removeAttribute('data-aos')
      // document.getElementById("animate-lbl").setAttribute('data-aos', 'fade-left')
      this.setState({subTitle: LIST[index], prevTitle:index})
      if(element) element.classList.add("opacity-none")
      if(element) element.classList.remove("aos-animate")

      this.l3t = setTimeout(()=>{
        let element = document.getElementById("animate-lbl");
        // document.getElementById("animate-lbl").classList.add("d-block")
        if(element) element.classList.remove("opacity-none")
        if(element) element.setAttribute('data-aos', 'slide-right')
        if(element) element.classList.add("aos-animate")
      },200)
    },2000)
  }
  componentWillUnmount() {
   if(this.l3) clearInterval(this.l3)
    if(this.l3t) clearTimeout(this.l3t)
  }

  render() {
    let {subTitle, prevTitle} = this.state;
    return (
      <div>
        <Row className={"layer-3-wrapper m-0 mb-2"}>
          <Col md={12}>
            <p className={'section-title'}><label className={'fr-font'}>B-LOW HELPS YOU... </label> <label id={'animate-lbl'} className={'fr-font'} data-aos={'slide-right'}>{subTitle}</label></p>
          </Col>
          {cardList.map((obj,index)=>{
            return <Col md={3} key={index} data-aos="zoom-in" data-aos-easing__="ease-in-back" data-aos-delay="250">
              <div className={'card-obj'}>
                <div className={'card-img-wrapper-v1'}>
                  <img className={'w-100'} src={obj.img} />
                </div>
                <div className={'card-inner'}>
                  <p className={'fr-font'} >{obj.title}</p>
                  <p>{obj.subTitle}</p>
                </div>
              </div>
            </Col>
          })}
        </Row>
      </div>
    );
  }
}
const cardList = [
  {img: "/image-folder/Screen-Shot-2021-07-02-at-6.11.24-pm-1024x584.png", title:"REVOLUTIONARY MEAL PLANNER", subTitle:"A revolutionary drag & drop meal planner that is completely customisable and user-friendly. This means you can easily add and remove meals or single ingredients as frequently as you like. All the data and statistics are instantly calculated for you, leaving you with more time to do the things you love.."},
  {img: "/image-folder/Never-go-hungry2-1024x1024.jpeg", title:"EXCLUSIVE RECIPES", subTitle:"Access hundreds of delectable recipes tried and tested by a celebrity cook. Our impressive repertoire is purposefully developed for low-carb lifestyles, whilst also being 100% exclusive to this program. We have also made sure that everything you need to take part in B-Low can be easily sourced from your local supermarket - including Coles, Woolworths, Aldi and IGA."},
  {img: "/image-folder/Tailored-to-you.jpg", title:"TAILORED FOR YOU", subTitle:"Gluten free? Vegetarian? Don’t like lamb? Have a vicious sweet tooth?? Easy, we’ve got it all here for you! Chose and save your favourite recipes and snacks and drag them into a meal planner for an organised week of eating well."},
  {img: "/image-folder/summer-healthy-clean-eating-breakfast.jpg", title:"NEVER GO HUNGRY", subTitle:"Just starting low carb? Don’t know what to eat? Well, we’ve got you covered. Such an amazing variety of snacks and meals that you will always have something to excite you so you wont need to grab junk to fill a void. Skip the hunger, and just eat amazing, tasty food all day long!"}
]
export default App;

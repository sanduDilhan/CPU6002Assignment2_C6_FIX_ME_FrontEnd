import React,{Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {ChevronRight} from "react-feather";
import {withRouter} from "react-router-dom";
import * as config from "../../../configs/constant";

class App extends Component {
  state = {
    svgStatus: 1
  }
  componentDidMount() {
    let count = 0;
    this.bottomInterval = setInterval(()=>{
      count = count === 9 ? 1 : (count + 1);
      // console.log("count",count)
      if(count === 1) {
        document.getElementById("svg-icon").classList.remove("transition-in")
        document.getElementById("svg-icon").classList.add("d-none")
        // document.getElementById("svg-icon").classList.add("transition-out")
        // document.getElementById("svg-icon").classList.remove("transition-out")

      }
      if(count === 2) {
        document.getElementById("svg-icon").classList.remove("d-none")

      }
      if(count >= 4) {
        document.getElementById("svg-icon").classList.add("transition-in")
      }
      // this.setState({svgStatus: this.state.svgStatus === 1 ? 2 : this.state.svgStatus === 2 ? 3 : 1})
    }, 1000)
  }
  componentWillUnmount() {
    // console.log("cleared...")
      clearInterval(this.bottomInterval);
  }

  render() {
    let {svgStatus} = this.state;
    return (
      <div className={'top-carousel-wrapper bottom-carousel-wrapper'}>
        <Carousel animationHandler={'fade'} swipeable={false} autoPlay={true} infiniteLoop={true} interval={3000} showArrows={false} showIndicators={false}>
          {bannerList.map((item, i) => (
            <div  key={i} >
              <div className="bg-banner" style={{backgroundImage: `url(${item.url})`}} />
            </div>
          ))}
        </Carousel>
        <div className={'text-section'}>
          <p className={'fr-font svg-custom'}>
            Become a <br/>
            B-LOW member<br/>
            <span className={'fr-font italic'}>today
              {svgStatus === 2 ? null : <svg className={'svg-icon'}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none"><path id={"svg-icon"} d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path></svg>}
            </span>
          </p>
          <button className={'mt-5 '} data-aos="fade-down" onClick={()=>this.props.history.push(`${config.BASE_ROUTE_PATH}${config.ROUTE_REGISTER}`)}>CLICK TO JOIN B-LOW <ChevronRight /> </button>
        </div>
      </div>
    );
  }
}
const bannerList = [{url: "/image-folder/break-from-fitness-1.jpg"}, {url: "/image-folder/join.banner.mobile.jpg"}];
export default withRouter(App);

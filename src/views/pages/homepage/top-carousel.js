import React,{Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from 'react-responsive-carousel';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index'
let res_ = 0;
class App extends Component {
  onChange = (res) => {
    if(res !== res_) {
      res_ = res;
      let classList = document.getElementsByClassName("animate-ly1");
      for(let i = 0; i < classList.length; i++) {
        classList[i].className = "text-section animate-ly1";
      }
      // if(this.ly1) clearTimeout(this.ly1);
      // this.ly1 = setTimeout(()=>{
      //
      // },500)
      if(this.ly2) clearTimeout(this.ly2);
      this.ly2 = setTimeout(()=>{
        let classList = document.getElementsByClassName("animate-ly1");
        for(let i = 0; i < classList.length; i++) {
          classList[i].className = "text-section animate-ly1 aos-animate";
        }
      },500)
    }
  }
  render() {
    return (
      <div className={'top-carousel-wrapper'}>
        {/*animationHandler={'fade'} swipeable={false}*/}
        <Carousel onChange={this.onChange} onClickItem={this.onChange} swipeable={false} autoPlay={true} infiniteLoop={true} interval={3000} showArrows={true} showIndicators={true}>
          {bannerList.map((item, i) => (
            <div  key={i} >
              <div className="bg-banner" style={{backgroundImage: `url(${item.url})`}} />
              <div className={'text-section animate-ly1'} data-aos="zoom-in">
                <p className={'rr-font'}>{item.title}</p>
                <p className={'fr-font'}>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
const getConfigurableProps = () => ({
  showArrows: true,
  showStatus: true,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: true,
  stopOnHover: true,
  swipeable: true,
  dynamicHeight:true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 100,
  selectedItem: 0,
  interval: 2000,
  transitionTime: 500,
  swipeScrollTolerance: 5,
  ariaLabel: 'ariaLabel',
});
const bannerList = [{url: "/image-folder/B-Low-Banner2.jpeg", title:"Your Favourite Meals", subTitle:"Redesigned to keep the weight off"}, {url: "/image-folder/Family-Eating-LowCarb.jpg", title:"Healthy and Delicious", subTitle:"Meals for the Whole Family"}];
export default App;

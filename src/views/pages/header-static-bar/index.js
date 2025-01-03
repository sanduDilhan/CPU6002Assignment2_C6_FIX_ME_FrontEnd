import React,{Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './style.scss';

class App extends Component {
  render() {
    let {bannerURL, mainTitle, subTitle, nonFilter, mainTitleColor} = this.props;
    return (
      <div className={'header-static-bar-wrapper'}>
        <Carousel animationHandler={'fade'} swipeable={false} showArrows={false} showIndicators={false} showThumbs={false}>
            <div>
              <div className={`bg-banner ${nonFilter ? 'non-filter-bg-banner':''}`} style={{backgroundImage: `url(${bannerURL})`}} />
            </div>
        </Carousel>
        <div className={'text-section'}>
          {mainTitle ? <p className={`fr-font ${mainTitleColor}`}>{mainTitle}</p> : null}
          {subTitle ? <p className={'sub-text'}>{subTitle}</p> : null}
        </div>
      </div>
    );
  }
}
export default App;

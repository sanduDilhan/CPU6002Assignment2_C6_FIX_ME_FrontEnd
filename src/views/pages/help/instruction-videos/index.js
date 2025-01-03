import React,{Component} from 'react';
import TopButtons from "../../my-account/top-buttons";
import {Col, Input, Row} from "reactstrap";
import './style.scss'
import ReactPlayer from "react-player";

let videos = [
  // {name:"Add Ingredient", videoLink:"https://youtu.be/bE9nCtXE8sY"},
  // {name:"Add Item to Meal Planner", videoLink: "https://youtu.be/bE9nCtXE8sY"},
  // {name:"Adjust Serving Size", videoLink: "https://youtu.be/YEv3o-tboPQ"},
  // {name:"Change Recipe Name", videoLink: "https://youtu.be/mEKfLKP7B9A"},
  // {name:"Copy Meal Planner", videoLink: "https://youtu.be/MSehbc7WQQo"},
  // {name:"Delete Ingredient", videoLink: "https://youtu.be/EzY1wGBW1hc"},
  // {name:"Edit Ingredient", videoLink: "https://youtu.be/z7Bebfl_x5M"},
  // {name:"Edit Meal Planner Name", videoLink: "https://youtu.be/9jHfyVhRRnA"},
  // {name:"Hide Nutrition Details", videoLink: "https://youtu.be/Fb9HeOut4uU"},
  // {name:"Remove item from Meal Planner", videoLink: "https://youtu.be/S81JI0XCPz4"},
  // {name:"Save Meal Plan", videoLink: "https://youtu.be/KnfLLv7l8zQ"},
  // {name:"Save to Favorites", videoLink: "https://youtu.be/yG2Qy_kuBh4"},
  // {name:"Save to Meal Planner", videoLink: "https://youtu.be/vSHNkLpyQvw"},
  // {name:"Set Carb Limit", videoLink: "https://youtu.be/Ecs8XFxNXX8"}
  {name:"Meal Planner", videoLink: "https://youtu.be/HwYrSj4kPbc"},
  {name:"Recipes", videoLink: "https://youtu.be/TY_36y8tDOY"},
  {name:"Intro to B-Low", videoLink: "https://youtu.be/hKxQFiT7rxQ"}
]
class App extends Component {
  render() {
    return (
      <div className={' pt-0 pb-5 '}>
        <TopButtons activeIndex={13}/>
        <div className={'container'}>
          <div className={'pt-5 help-2-wrapper'}>
            <Row className={'m-0 profile-wrapper'}>
              <Col md={12} className={'text-center'}>
                <p className={'fr-font ma-title mb-1'}>INSTRUCTION VIDEOS</p>
                <p className={'ma-sub-title mb-5'}>Please select an option below for guidance on using the B-Low program.</p>
              </Col>
              {
                videos.map((obj,index) => {
                  return <Col md={6}>
                    <div className={'help-video-wrapper mb-4'}>
                      <p className={'video-name mb-2'}>{obj.name}</p>
                      <div className={'video-wrapper'}>
                        <ReactPlayer url={obj?.videoLink} />
                      </div>
                    </div>
                  </Col>
                })
              }
            </Row>
          </div>
        </div>

      </div>
    );
  }
}
export default App;

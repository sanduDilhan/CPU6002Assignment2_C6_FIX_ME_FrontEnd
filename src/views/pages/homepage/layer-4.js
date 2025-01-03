import React,{Component} from 'react';
import {Row, Col} from "reactstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Row className={"layer-4-wrapper m-0 mb-0"}>
          <Col md={4} className={"p-0"}>
            <Row className={"m-0"}>
              {
                IMG_LIST_1.map((obj,index)=>{
                  return <Col xs={6} key={index} className={"p-0 img-gallery-wrapper"} data-aos="zoom-in">
                    <img src={obj.img} className={'w-100'}/>
                  </Col>
                })
              }
            </Row>
          </Col>
          <Col md={4} className={'p-0 middle-section'}>
            <img src={require("../../../assets/img/pages/menu.png")} className={'w-100'} />
            <p>You’ll be thrilled with the variety of food you can eat on our program.
              <br/><br/>
              B-LOW will open your eyes to the sensational and flavoursome meals you can eat to create a healthier you. It will ‘B-LOW’ your mind!
              <br/><br/>
              B-LOW recipes are tried and tested, offering a variety of cuisines and easy-to-source ingredients to deliver you a long-term meal program that you will never tire of. Our food is intentionally designed to be easy to cook, extremely tasty, and specifically tailored for meal prepping. Plus, we will be adding new delicious recipes all the time.</p>
          </Col>
          <Col md={4} className={"p-0"}>
            <Row className={"m-0"}>
            {
              IMG_LIST_2.map((obj,index)=>{
                return <Col xs={6} key={index} className={"p-0 img-gallery-wrapper"}  data-aos="zoom-in">
                  <img src={obj.img} className={'w-100'}  />
                </Col>
              })
            }
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
const IMG_LIST_1 = [
  {img:"/image-folder/b-low-Menu1.jpeg"},
  {img:"/image-folder/b-low-pasta.jpeg"},
  {img:"/image-folder/b-salad.jpeg"},
  {img:"/image-folder/blow-burgers.jpeg"},
  {img:"/image-folder/b-low-soup.jpeg"},
  {img:"/image-folder/b-low-meatballs.jpeg"},
  {img:"/image-folder/B-low-Beans.jpeg"},
  {img:"/image-folder/B-low-fruit-bowl.jpeg"}
]
const IMG_LIST_2 = [
  {img:"/image-folder/B-low-dumplings.jpeg"},
  {img:"/image-folder/b-low-chicken-stuffed.jpeg"},
  {img:"/image-folder/B-low-Bake.jpeg"},
  {img:"/image-folder/asparagus-wrapped.jpeg"},
  {img:"/image-folder/B-low-tacos.jpeg"},
  {img:"/image-folder/B-low-Almond-Biscuts.jpeg"},
  {img:"/image-folder/B-low-balls.jpeg"},
  {img:"/image-folder/B-low-Muffins.jpeg"},
 ]
export default App;

import React,{Component} from 'react';
import Faq from "react-faq-component";
import {Col, Row} from "reactstrap";
import './style.scss';
import HeaderStaticBar from "../header-static-bar";

class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={'faq-wrapper'}>
        <HeaderStaticBar bannerURL={"/image-folder/FAQs-Banner.jpeg"} mainTitleColor={'black'} mainTitle={"FAQs"} nonFilter={true}/>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0'}>
            <Col md={12}>
              <Faq
                data={faqData}
                styles={styles}
                config={config}
              />
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}
const styles = {

}
const config = {
  animate: true,
  arrowIcon: "V",
  openOnload: 0,
  expandIcon: "+",
  collapseIcon: "-",
};
const faqData = {
  title: "",
  rows: [
    {
      key:1,
      title: "Should I be exercising while i'm on a low carb diet?",
      content: <p>An intense exercise regime is not necessarily required. You actually don’t even need to work up a sweat. You just need to make sure you get your body moving.
<br/><br/>
        An easy way to monitor this is by counting steps, we recommend an active daily step count of around 10,000 a day. Most of these can be achieved through the things you do every day, like cleaning, walking the dog or doing the groceries.
        <br/><br/>
        Also, exercise/moving in conjunction with a low carb diet will use up the free floating glucose in your bloodstream to lower your sugar levels and increase insulin sensitivity (making insulin work more effectively).</p>,
    },
    {
      key:2,
      title: "Why will the reduction in carbs help me to lose weight?",
      content:
        <p>When you have too much glucose (from carbohydrates) in your blood, your body stores it for later use as fat cells. The pockets of fat you complain about, are there because your body saves the glucose as an energy source for future use
          <br/><br/>
          When you remove sugar and carbs from your diet, your body will use up all the extra glucose in your blood. You’ll be able to reset your blood sugar and insulin levels since all the extra sugar floating around in your blood will be gone after a few days on a very low carb diet. Once you have got rid of these glucose reserves, your body will start to burn fat as a fuel source instead of carbohydrates which is our goal here at B-low.</p>,
    },
    {
      key:3,
      title: "Can I snack between meals?",
      content: <p>It is really important that you don’t let yourself get hungry, which is why snacking is paramount. Snack between meals if needed to avoid hunger and consequent over-eating.
        <br/><br/>
        If you start to get hungry, you’ll usually grab whatever is convenient or in close proximity, so it’s important to have these snacks prepared. If you are going to snack, ensure it is with protein-rich, low-carb foods.</p>,
    },
    {
      key:4,
      title: "How does a low-carb lifestyle differ from a keto diet?",
      content: <p>Firstly, it is true both the low carb and keto diets apply the same principle in terms of cutting out most carbohydrates from your diet, including starches such as pasta, rice, bread, potatoes etc.
        <br/><br/>
        Put simply, a low carb diet replaces carbohydrates with moderate protein, healthy fats and vegetables, whereas the keto diet assigns a much lower carb limit and replaces them with. significantly higher fats. This can be quite restrictive and difficult to obtain long term.</p>,
    },
    {
      key:5,
      title:"If I'm avoiding carbs, does this mean I can just eat meat all day?",
      content: <p>We suggest a carb count that you stick to, but this does not mean that we recommend you meet your quota by eating just meats, protein bars, sugar free chocolates and deserts and other foods that lack health benefits, although technically yes, you may still lose weight this way.
        <br/><br/>
        We recommend that you’re carbs are low but your fats and proteins are healthy and moderate. There are a range of recipes and ingredients that you can eat so its suggested you diversity your daily intake to include lots of nutritious rich foods.
        <br/><br/>
        Also, it is very important to note, that excess amounts of protein will be turned into glucose, which reverses what we are trying to achieve.</p>,
    },
    {
      key:6,
      title:"Should I be taking supplements alongside this low carb way of eating?",
      content: <p>It is important that you contact your health care professional here for their advice. As you are reducing your intake of carbohydrates, you may be missing some essential vitamins and minerals that can be found in some (high carb) fruits and vegetables.</p>,
    },
    {
      key:7,
      title:"How does consuming carbs lead to Type 2 diabeties?",
      content: <p>Carbohydrates that you consume are transformed into glucose and this is what our body runs on. When glucose runs through your bloodstream your blood sugars rise, so, your pancreas is alerted to produce insulin to push the glucose out of your bloodstream and into the cells where they can be used.
        <br/><br/>
        When your blood sugars are high and your body cannot produce enough insulin to combat the glucose, instead of going into the fat cells where they are used, they just remain in the bloodstream and as a consequence, you will be diagnosed with Type 2 diabetes.
        <br/><br/>
        When you remove sugar and carbs from your diet, your body will use up all the extra glucose in your blood, bringing your blood sugar levels down and consequently managing or even reversing Type 2 diabetes.</p>,
    }
  ],
};
export default App;

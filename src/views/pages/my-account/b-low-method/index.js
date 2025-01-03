import React,{Component} from 'react';
import {Col, Row} from "reactstrap";
import './style.scss';
import TopButtons from "../top-buttons";
import AOS from 'aos';

class App extends Component {
  componentDidMount() {
    AOS.init();
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={'b-low-method-wrapper'}>
        <div className={'bg-white pt-0 pb-0'}>
          <div className={'container_ pt-0 pb-0'}>
            <TopButtons activeIndex={12}/>
          </div>
        </div>

        <div>
          <div className="bg-banner" style={{backgroundImage: `url(/image-folder/The-B-Low-Method.jpeg)`}} />
        </div>
        <div className={'bg-white main-screen'}>
          <div className={'container pt-0 pb-5'}>
            <Row className={'m-0'}>
              <Col md={6}>

              </Col>
              <Col md={6} className={'mb-2'}>
                <div className={'blow-top-wrapper'} data-aos="fade-up">
                  <p className={'fr-font'}>THE B-LOW METHOD</p>
                  <p>Designed by Bianca Braun</p>
                  <p>Data Scientist & MKR Grand Finalist</p>
                </div>
              </Col>
              <Col md={8} className={'mb-2 second-wrapper'}>
                <h4 className={'pt-2 pb-4'} data-aos="fade-up">If you want a more structured plan or some extra guidance to help you reach your wellness goals, we have developed some tips for a more efficient transition into the low carb world and consequent weight loss. Use some, all or even none! The pace you set is completely up to you. Do what’s best for you and your lifestyle.</h4>
              </Col>
              <Col md={4}>

              </Col>
              <Col md={3} className={'header-kld-wrapper'}>
                <p data-aos="fade-up">TIP 1: PREPARATION</p>
              </Col>
              <Col md={9} className={'body-kld-wrapper'}>
                <p className={'mb-2 header-txt-1'} data-aos="fade-up">Set goals</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">Decide what you plan to achieve. Make it specific, realistic and measurable. Write it down somewhere. It is recommended to share your goals with supportive family or friends who will help to encourage you and keep you accountable.</p>
                <p className={'mb-2 header-txt-1'} data-aos="fade-up">Take measurements</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">Take “before” photos of your body that you will eventually compare with your “after” photos. Weight yourself on a scale. Take your body measurements (waist at belly button, as well as your other areas of concern which may include chest, hips, upper arms and thighs).</p>
                <p className={'mb-2 header-txt-1'} data-aos="fade-up">Equip yourself</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">
                  <ul>
                    <li>Go through your fridge and pantry to remove things that are not suitable for your new lifestyle.</li>
                    <li>Plan your meals and snacks for at least the first week. Write a shopping list.</li>
                    <li>Get appropriate measurement tools such as kitchen scales, bathroom scales (preferably a digital one that also measures body fat), and a pedometer.</li>
                  </ul>
                </p>
                <p className={'mb-2 header-txt-1'} data-aos="fade-up">Research</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">If interested, ask your pharmacist about supplements that may be suitable for you.</p>
              </Col>
              <Col md={3} className={'header-kld-wrapper'}>
                <p data-aos="fade-up">TIP 2: MOVEMENT</p>
              </Col>
              <Col md={9} className={'body-kld-wrapper'}>
                <p className={'mb-2 notice-txt-1'} data-aos="fade-up">You must move your body…but you really don’t need to break a sweat! In fact, an intense exercise regime is not recommended. You just need to move more.</p>
                <p className={'mb-4 notice-txt-1'} data-aos="fade-up">Using your muscles causes your body to utilise its fat stores as fuel, which is our objective</p>
                <p className={'mb-2 header-txt-1'} data-aos="fade-up">To achieve this</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">
                  Walk 5,000 steps before breakfast and total between 10,000-15,000 steps per day (use a pedometer to help you track this).
                  <br/><br/>
                  Don’t sit for too long. After 60 mins your body starts to idle and process sugar in your bloodstream differently as it’s trying to conserve energy. Stand up, move around (even for literally just a minute), and then sit back down again. Every bit counts!
                  <br/><br/>
                  Incidental movement such as cleaning your house, walking to and from your vehicle and shopping ALL count toward your total daily steps!
                  <br/><br/>
                  Boost your step count by taking the stairs instead of the lift (even for one flight), walking your dog around the block, or parking in the furthest car space.
                </p>
              </Col>

              <Col md={3} className={'header-kld-wrapper'}>
                <p data-aos="fade-up">TIP 3: SNACKING</p>
              </Col>
              <Col md={9} className={'body-kld-wrapper'}>
                <p className={'mb-4 notice-txt-1'} data-aos="fade-up">Do not let yourself get hungry! This is why snacking is fundamental to your progress.</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">
                  Snack between meals as needed to avoid hunger and consequent over-eating.
                  <br/><br/>
                  Fuel your body with protein-rich, low-carb snacks. This will prevent you from experiencing overwhelming cravings, whilst simultaneously helping your body to burn fat.
                  <br/><br/>
                  Snack every 1-2 hours if required, ensuring that the snack is mostly protein. i.e. if you are snacking on other food groups, fruit, vegetables, carbs (low) ensure that they are paired with a protein. Your body will break down these food groups quicker if paired with a protein.
                  <br/><br/>
                  If you start to get hungry, you’ll usually grab whatever is convenient, so it’s incredibly important to have these snacks prepared.
                </p>
              </Col>

              <Col md={3} className={'header-kld-wrapper'}>
                <p data-aos="fade-up">TIP 4: PROTEIN</p>
              </Col>
              <Col md={9} className={'body-kld-wrapper'}>
                <p className={'mb-4 notice-txt-1'} data-aos="fade-up">Protein is essential for your body to build and repair tissue, build muscles and produce hormones.</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">
                  Your body needs protein. If it doesn’t have enough, it will break down existing proteins in your body (i.e. muscle). Once this process begins, your body goes into “starvation mode”, where it anticipates food restriction and consequently holds on to fat.
                  <br/><br/>
                  Avoid the “starvation” process by reducing your carbohydrate and fat intake, whilst keeping protein at a sufficient level to help you to manage cravings and burn fat.
                  <br/><br/>
                  Your goal is to stick to moderate levels of protein, as your body would convert excess amounts of protein into carbohydrates anyway.
                </p>
              </Col>

              <Col md={3} className={'header-kld-wrapper'}>
                <p data-aos="fade-up">TIP 5: CARB INTAKE</p>
              </Col>
              <Col md={9} className={'body-kld-wrapper'}>
                <p className={'mb-4 notice-txt-1'} data-aos="fade-up">There are many different views on how many carbs to consume a day. Keto diets have as little as a 20g carb a day intake while a low carb lifestyle can be maintained between 100-150g carbs.</p>
                <p className={'mb-4 body-txt-1'} data-aos="fade-up">We have developed a meal planner that counts your daily carbs for you! All you have to do is drag in what you’ve eaten by way of a recipe (main meal or snack) or single ingredients.
                  <br/><br/>
                  B-Low recommends that women consume between 50-65g carbs daily, while men should aim for between 60-75g. However, you can set your carb count at any level you like! You can set a limit in your meal planner so it can track your variance to your daily total at any point throughout the day, or you can simple use an open meal planner and accumulate carbs as you go!</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React,{Component} from 'react';
import './style.scss'
import {ROUTE_GET_IN_TOUCH, WEBSITE_URL} from "../../../configs/constant";
import {Col, Row} from "reactstrap";

class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={'pp-wrapper'}>
        <div className={'container pt-5 pb-5'}>
          <Row className={'m-0'}>
            <Col md={12}>
              <h2 className={'fr-font mb-2'}>Terms and Conditions</h2>

              <p>Thank you for visiting&nbsp;<strong><a href={WEBSITE_URL}>{WEBSITE_URL}</a>.</strong>&nbsp;Please review the following basic rules that govern your use of our site. Please note that your use of our site constitutes your agreement to follow and be bound by these terms. If you do not agree to these terms, please discontinue using this site.</p>

              <br />
              <p><strong>INTELLECTUAL PROPERTY</strong><br /><br />
                This website is owned and operated by B-Low. All design and content featured on&nbsp;<strong><a href={WEBSITE_URL}>{WEBSITE_URL}</a></strong>&nbsp;&ndash; including images, artwork, graphics, photography, and the like &ndash; are copyrights, trademarks, and/or intellectual property that are owned, controlled, or licensed by B-Low. The content of our website is intended solely for your personal use. Any use of our website and its content for commercial purposes is prohibited without the prior written permission of B-Low. Do not reproduce, publish, display, modify, sell, or distribute any of the materials from B-Low without permission. You may, however, download or electronically copy and print any of the page contents displayed on the site, for your personal use only.</p>

              <br />
              <p><strong>INACCURACIES</strong><br /><br />
                We endeavour to present the most recent, accurate, and reliable information on our website at all times. However, there may be occasions when some of the information featured on&nbsp;<strong><a href={WEBSITE_URL}>{WEBSITE_URL}</a></strong>&nbsp;may contain data errors. Any errors are wholly unintentional and we apologise if erroneous information in any way affects your individual order. We reserve the right to amend errors or to update information at any time without prior notice.&nbsp;</p>

              <br />
              <p><strong>SUBSCRIPTIONS</strong><br /><br />
                When you purchase a B-Low subscription, you agree to pay the price stated at the time of your order. You also agree to the billing frequency specified at the time of your order.&nbsp;Any discount eligibility is determined at the time of order. Discounts cannot be applied retrospectively. All prices are in Australian Dollars (AUD).&nbsp;B-Low reserves the right to change the prices and fees at any time. We will provide you with 14 days&rsquo; notice if the regular rate of a subscription changes from what was stated at the time of your order.&nbsp;Price changes will take effect from your next billing date after the notice period. If you do not wish to continue your subscription at the revised price, you may cancel your subscription before the end of your current direct debit pay cycle. No refunds will be offered for the days remaining on your subscription.</p>

              <p>If you wish to cancel your subscription, email us at&nbsp;<strong><a href="mailto:info@b-low.com.au">info@b-low.com.au</a></strong>&nbsp;or click&nbsp;<a href={`${WEBSITE_URL}${ROUTE_GET_IN_TOUCH}`}><strong>here</strong></a>.</p>

              <p>When you cancel, you cancel only future charges associated with your subscription. You may notify us of your intent to cancel at any time, but the cancellation will become effective at the end of your current billing period. You will continue to have the same access and benefits until the end of your current billing period.</p>

            </Col>
          </Row>
        </div>

      </div>
    );
  }
}
export default App;

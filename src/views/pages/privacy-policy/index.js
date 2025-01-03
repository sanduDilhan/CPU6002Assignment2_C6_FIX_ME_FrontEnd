import React,{Component} from 'react';
import './style.scss'
import {Col, Row} from "reactstrap";
import {WEBSITE_URL} from "../../../configs/constant";

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
              <h2 className={'fr-font mb-2'}>PRIVACY POLICY</h2>

              <p>B-Low is strongly committed to protecting your privacy while interacting with our content, products and services. We want to provide a safe and secure environment for you.</p>

              <p>The purpose of this Privacy Policy is to tell you what kind of information we may gather about you when you visit our site, how we may use that information, whether we disclose it to anyone, and the choices you have regarding our use of, and your ability to correct this information. Our policy allows you to choose what kind and how much information you provide to us and to control how we use whatever information you give us. Our goal is to provide you with a satisfying experience while allowing you to control your privacy and to give you a means to voice any questions or concerns you may have.</p>

              <p>This policy applies only to B-Low and not to other companies&rsquo; or organisations&rsquo; websites to which B-Low is linked.</p>

              <br />
              <p><strong>COLLECTION OF INFORMATION</strong><br /><br />
                Information is collected from you primarily to make it easier and more rewarding for you to use our services. Depending on the service you are accessing, you could be asked to provide information such as your name, email address or information about what you like and do not like. It is entirely your choice whether to respond to these questions or not.</p>

              <p>B-Low collects two types of information. The first type is anonymous information. For instance, we may collect information to tell us that five thousand people visit this Privacy Policy today, but we do not know their names, where they live or their date of birth &ndash; they are &lsquo;anonymous&rsquo; to us. The second type of information that B-Low collects is personal information. B-Low will collect personal information that lets us know the specifics of who you are such as your name, email address, or postal address, when you provide it to us. With this information, B-Low can provide a variety of personalised and enhanced services that are not available to anonymous users. We hope that you will find it beneficial to provide individually identifiable information about yourself to us because it will make our services more valuable to you.</p>

              <p>Sometimes, we may specifically ask for personal information about you when you sign up to use a service. Certain information may be required, such as your name, age, internet address or screen name, billing address, type of computer, credit card number, in order to provide that service or product to you. This information may also be used to inform you of additional products and services which may interest you. You can choose not to receive such information when you are undertaking product or service registration on our website. We may also ask about your interests, but it is your choice whether to respond.</p>

              <p>How much of your personal information that you choose to disclose to B-Low is completely up to you. The only way we know something about you personally is if you provide it to us, for example when you take part in a discussion forum or enter one of the competitions on our websites.</p>

              <br />
              <p><strong>USE OF ANONYMOUS INFORMATION</strong><br /><br />
                B-Low automatically gathers anonymous information to monitor the use of our website, like the numbers and frequency of visitors to&nbsp;<a href={WEBSITE_URL}>{WEBSITE_URL}</a>. We only use such data in the aggregate. This collective data helps us determine how much our audiences use parts of the site, so we can improve it to assure that it is as appealing as we can make it for as many users as possible. B-Low may publish or provide this aggregate data to other people.</p>

              <br />
              <p><strong>USE OF PERSONAL INFORMATION</strong><br /><br />
                B-Low will only use the personal information you have chosen to provide us for the purpose for which you provided it. B-Low will not use it for any other purpose without your consent.</p>

              <br />
              <p><strong>DISCLOSURE</strong><br /><br />
                There will be occasions where it will be necessary for B-Low to disclose your personal information to third parties. B-Low may be required by law to disclose the information, or B-Low may be required to disclose your personal information to third parties to provide the service you have requested, for example, if you purchase products online, B-Low will need to disclose your personal information to third parties in order to bill and deliver your products. However, the disclosure will only be made where it is necessary to fulfil the purpose for which you disclosed your personal information. Otherwise than stated above, we do not disclose personal information that you may give us, such as your name, address, email address or telephone number, to any organisation or person outside B-Low unless you have authorised us to do so.</p>

              <br />
              <p><strong>NO SALE OF PERSONAL INFORMATION</strong><br /><br />
                Under no circumstances will B-Low sell or receive payment for licensing or disclosing your personal information.</p>

              <br />
              <p><strong>INTERACTING WITH B-LOW</strong><br /><br />
                Ultimately, you are solely responsible for maintaining the secrecy of your passwords and/or any personal information. Be responsible whenever you are online.</p>

              <br />
              <p><strong>SECURITY</strong><br /><br />
                B-Low operates secure data networks that are designed to protect your privacy and security.</p>

              <br />
              <p><strong>COMPLAINTS ABOUT PRIVACY</strong><br /><br />
                If you have any complaints relating to online privacy issues on our websites, please notify B-Low. While B-Low accepts no liability for any material or links posted to the service, we will investigate all complaints.</p>

              <br />
              <p><strong>CHANGES TO B-LOW&rsquo;S PRIVACY POLICY</strong><br /><br />
                If we decide to change the B-Low Privacy Policy, we will post those changes here.</p>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}
export default App;

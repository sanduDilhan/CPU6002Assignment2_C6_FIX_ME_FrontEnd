import React,{Component} from 'react';
import './style.scss';
import TopCarousel from "./top-carousel";
import Layer2 from "./layer-2";
import Layer3 from "./layer-3";
import Layer4 from "./layer-4";
import Layer5 from "./layer-5";
import Layer6 from "./layer-6";
import BottomCarousel from "./bottom-carousel";
// import axios from "axios";
// import AOS from 'aos';

class App extends Component {
  componentDidMount() {
    // AOS.init();
    // document.addEventListener('DOMContentLoaded', function () {
    //   console.log("dfdddd")
    //   AOS.init();
    // });
    // AOS.init();
    window.scrollTo(0, 0);
    // this.test();
  }
  // test = () => {
  //   axios.post('https://sf-timesheet-apis.ceyentra.lk/api/v1/employee/apply-ot?recordId=115',{},{headers:{Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMDE5Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNzA1NDgxMzI5LCJ1c2VyIjp7ImlkIjoyNywidXNlcm5hbWUiOiIxMDE5IiwicHJvbW90ZXJOYW1lRU4iOiJOR09XIEFNUE9STiIsInByb21vdGVyTmFtZVRDIjoi5ZCz6buD57Sg5Y2_IiwidXNlclJvbGUiOiJFTVBMT1lFRSIsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRob3JpdGllcyI6WyJST0xFX0VNUExPWUVFIl0sImp0aSI6IjMzMzNkZDc4LTI0NWUtNDU1Yi05MThhLTA2MmFmMWFlMTBiMSIsImNsaWVudF9pZCI6IkVtcGxveWVlIn0.irJ0g68r3V7_Bau4uHvIxEgatWtxTYWPqILioAqDnGI"}})
  //     .then(res => {
  //       console.log(res)
  //     })
  // }
  render() {
    return (
      <div>
        <TopCarousel />
        {/* ==== Top Texts ==== */}
        <Layer2 />
        {/* ==== Purple cards ==== */}
        <Layer3 />
        {/* ==== The menu ==== */}
        <Layer4 />
        {/* ==== No Maths / Writing ==== */}
        <Layer5 />
        {/* ==== Say Goodbye ====  */}
        <Layer6 />
        <BottomCarousel />
      </div>
    );
  }
}
export default App;

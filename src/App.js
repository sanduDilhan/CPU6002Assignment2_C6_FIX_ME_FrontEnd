import React from "react"
import Router from "./Router"
import "./components/@vuexy/rippleButton/RippleButton"

import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"
import Loading from "./layouts/components/loading/Delay/Delay";
import 'react-quill/dist/quill.snow.css';

const App = props => {
  return <div>
    <Loading/>
    <Router />
  </div>
};
// "homepage": ""
// "homepage": "/oneapp-admin"
export default App

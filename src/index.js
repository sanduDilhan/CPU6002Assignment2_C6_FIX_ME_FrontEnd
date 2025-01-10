import 'semantic-ui-css/semantic.css';
import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Layout } from "./utility/context/Layout"
import * as serviceWorker from "./serviceWorker"
import { store } from "./store/storeConfig/store"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"
import 'react-intl-tel-input/dist/main.css';
import "toastr/build/toastr.min.css"
import 'flatpickr/dist/themes/airbnb.css';
import './status.scss'
import "./index.scss"
import './assets/scss/custom/custom.scss'
import 'aos/dist/aos.css'

const LazyApp = lazy(() => import("./App"));


ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
            <LazyApp />
        </Layout>
      </Suspense>
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//scp -r build/*  ssh root@103.125.216.56:/var/www/html/blow/web/customer

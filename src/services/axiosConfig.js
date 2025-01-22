import axios from 'axios'
import apiConfig from "./apiConfig";
import * as constant from "../configs/constant";
import Cookies from "js-cookie";
import swal from "sweetalert";
let isRefresh = false;
const instance = axios;

// instance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     // console.log("response",response)
//     console.log("response",error)
//     console.log("IS_LOGIN",error.response.config.url.indexOf("oauth/token") !== -1)
//     if(error.response.config.url.indexOf("oauth/token") === -1) {
//       const status = error.response ? error.response.status : 0
//       if (status === 401) {
//         if(isRefresh) {
//           swal({
//             title: "Session expired. Please login again",
//             closeOnClickOutside: false,
//             buttons: {
//               dangerMode: {
//                 text: "Okay",
//                 value: "action",
//                 className: "okay-btn"
//               }
//             }
//           })
//             .then((value) => {
//               switch (value) {
//                 case "action":
//                   Cookies.remove(constant.ACCESS_TOKEN);
//                   window.location = constant.BASE_ROUTE_PATH+'/login';
//                   break;
//                 default:
//               }
//             })
//           return;
//         }
//         isRefresh = true;
//         const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refreshToken`;
//         const config = {
//           headers: {
//             Authorization: `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`,
//             isRefreshToken: true
//           }
//         }
//
//         let isAccessTokenRefreshed = false
//         await axios.post(`${URL}`, {}, config)
//           .then(async (res) => {
//             await Cookies.set(constant.ACCESS_TOKEN, res.data.result);
//             isAccessTokenRefreshed = true
//           })
//           .catch(err => {
//             console.log("ererer,",err)
//             // window.location = constant.BASE_ROUTE_PATH+'/login';
//           })
//         if (isAccessTokenRefreshed) {
//           error.config.headers['Authorization'] = `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`
//           return axios.request(error.config)
//         }
//       } else {
//         return Promise.reject(error)
//       }
//     }
//   }
// )
export default instance;

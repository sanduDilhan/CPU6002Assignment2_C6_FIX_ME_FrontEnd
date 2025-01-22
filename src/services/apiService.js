import axios from './axiosConfig';
import apiConfig from './apiConfig';
import Cookies from "js-cookie";
import * as constant from "../configs/constant";
import {renewToken} from "./auth";
import {notifyMessage} from "../utility/commonFunc";
import {ACCESS_TOKEN, AUTH_TYPE, ROUTE_LOGIN, SOCIAL_AUTH} from "../configs/constant";
import {history} from "../history";

async function callApi(apiObject) {
  let body = {};
  let headers;
  let method = apiObject.method ? apiObject.method.toLowerCase() : 'get';
  if (method === 'post' || method === 'put' || method === 'patch') {
    body = apiObject.body ? apiObject.body : {};
  }

  headers = {
    'Content-Type': apiObject.urlencoded ? 'application/x-www-form-urlencoded' : apiObject.multipart ? 'multipart/form-data':'application/json',
  };
  if (apiObject.authentication) {
    headers.Authorization = `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`;
  }
  if (apiObject.isAccessToken) body = {accessToken: Cookies.get(constant.ACCESS_TOKEN)};


  let basePath = apiConfig.basePath;

  if (apiObject.basePath){
    basePath = apiObject.basePath;
  }
  if (apiObject.type === "RENEW_TOKEN") headers.isRefreshToken = true;

  const url = apiObject.isSocial ? apiObject.endpoint : `${apiConfig.serverUrl}/${basePath}/${apiObject.endpoint}`;
  let result;

  await axios[method](url, method !== 'get' && method !== 'delete' ? body:{headers: headers} , {headers: headers})
    .then(async response => {
      let code = response && response.data && response.data.code ? parseInt(response.data.code) : 500;
      let status = response && response.status ? response.status : 0;
      let message = response && response.data && response.data.result && typeof response.data.result === "string" ? response.data.result : null;
      result = {...await response.data, status: status, code: code, message: message} ;
    })
    .catch(async error => {
      if (error !== undefined) {
        if (error.response === undefined) {
          result = await {
            success: false,
            status: 2,
            message: "Your connection was interrupted",
            data: null,
          }
        } else if (error.response.status === 401) {
          // result = await {
          //   success: false,
          //   status: 2,
          //   message: error.response.data && error.response.data.message ? error.response.data.message : "Your session expired! Please login again..",
          //   data: null
          // };
          // if(apiObject.type !== "AUTH"){
          //   Cookies.remove(constant.ACCESS_TOKEN);
          //   commonFunc.notifyMessage("Your session expired! Please login again..",0);
          //   history.push(constant.BASE_ROUTE_PATH+'/login');
          // }

          if (apiObject.type === "RENEW_TOKEN") {
            result = await {
              success: false,
              status: 2,
              message: "Your session expired! Please login again..",
              data: null,
            };
          } else if (apiObject.type === "AUTH") {
            result = await {
              success: false, status: 0,data: null,
              message: error.response.data.message
            };
          } else {
            result = await renewTokenHandler(apiObject);
          }

        } else if (error.response.status === 403) {
          result = await  {
            success: false,
            status: 2,
            message: "Access is denied.",
            data: null,
          };
        } else if (error.response.status === 417) {
          result = await  {
            success: false,
            status: 2,
            message: "Oops! Something went wrong.",
            data: null,
          };
        } else if(error.response.data !== undefined){
          result = await {
            success: false,
            status: 0,
            message: error.response.data.result ? error.response.data.result : 'Sorry, something went wrong',
            data: null,
          }
        } else {
          result = await  {
            success: false,
            status: 2,
            message: "Sorry, something went wrong.",
            data: null,
          };
        }
      } else {
        result = await  {
          success: false,
          status: 2,
          message: "Your connection was interrupted!",
          data: null,
        };
      }
    });

  return result;
}

export const renewTokenHandler = async (apiObject) => {
  let result;
  // renew token - start
  const headers = {isRefreshToken: true};
  await renewToken({headers: headers})
    .then(async response => {
      // console.log("renew:response",response)
      if (response.result) {
        Cookies.set(constant.ACCESS_TOKEN,response.result);
        // Cookies.set(constant.REFRESH_TOKEN,response.refresh_token);
        result = await callApi(apiObject);
      } else {
        result = await response;
        Cookies.remove(constant.ACCESS_TOKEN);
        Cookies.remove(constant.REFRESH_TOKEN);
        notifyMessage(response && response.message ? response.message : "Your session expired! Please login again..",0);
        history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_LOGIN}`)
      }
    });
  // renew token - end
  return result;
};
export default {callApi};

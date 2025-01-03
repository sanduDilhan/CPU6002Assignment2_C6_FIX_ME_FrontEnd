import ApiService from './apiService';
import qs from "qs";
import conf from "./apiConfig";
import {getUserId} from "../utility/commonFunc";

// confirmSignInHandler
export async function loginUser(userCredentials) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = 'auth/signIn';
  apiObject.body = userCredentials;
  // apiObject.basePath = "signIn";
  apiObject.type = "AUTH";
  return await ApiService.callApi(apiObject);
}

export async function sendOTPHandler(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = 'auth/user/sign-in';
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function changePassword(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = 'auth/changePassword';
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

//auth/forgetPassword/sandundilhan123@gmail.com
export async function forgetPasswordStep1(email) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/forgetPassword/${email}`;
  apiObject.body = {};
  return await ApiService.callApi(apiObject);
}
export async function forgetPasswordStep2(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/resetPassword`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function regUserAPIHandler(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/signUp`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
//package/get-trial
export async function confirmOTPHandler(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/verifyEmail`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function resendOTPHandler(number) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/otp/resend/${number}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function regUserSocialAPIHandler(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `${conf.awsCognitoUrl}/oauth2/token`;
  apiObject.isSocial = true;
  apiObject.urlencoded = true;
  apiObject.body = qs.stringify(obj);
  return await ApiService.callApi(apiObject);
}
//
export async function updateUserDetails(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `auth/updateUserDetail`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
//auth/getUserDetailById/15
export async function getUserDetailsById() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `auth/getUserDetailById/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function renewToken() {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = 'auth/refreshToken';
  apiObject.body = {};
  apiObject.type = "RENEW_TOKEN";
  return await ApiService.callApi(apiObject);
}

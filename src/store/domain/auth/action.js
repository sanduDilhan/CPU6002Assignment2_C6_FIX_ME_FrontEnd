/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 4:59 PM
 */

import * as actionTypes from "./actionType";
import * as AuthService from '../../../services/auth';
import Cookies from "js-cookie";
import {spinnerHandler} from '../spinner/action';
import * as constant from "../../../configs/constant";


export const setAuth = (data) => {
  return {
    type: actionTypes.SET_AUTH,
    value: data
  }
};
export const resetWarningHandler = (data) => {
  return {
    type: actionTypes.RESET_WARNING,
    value: data
  }
};
export function loginUser(userCredentials) {
  // Cookies.set(constant.ACCESS_TOKEN,"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDAwMDAsMiIsImV4cCI6MTY0ODY3MzI1NSwiaWF0IjoxNjQ4MjY0NTUyfQ.lxIPDsI6Ak7To1PnTSrZjPixSp9HAJ2JBAeIzZgNTr0TpuKQrKJEGB0jjNu1CsmltjOExgY5ZEAPsYfhGwSAqgg");
  // return {
  //   type: actionTypes.LOGIN_USER_SUCCESS,
  //   value: "ABCD"
  // }

  return dispatch => {
    dispatch(spinnerHandler(true));
    AuthService.loginUser(userCredentials)
      .then((response) => {
        if (response.ACCESS_TOKEN) {
          Cookies.set(constant.ACCESS_TOKEN,response.ACCESS_TOKEN);
          Cookies.set(constant.REFRESH_TOKEN,response.REFRESH_TOKEN);
          // localStorage.setItem(constant.ADMIN_ID, response.data.user.name)
          dispatch(loginUserSuccess(response.ACCESS_TOKEN));
        } else {
          dispatch(spinnerHandler(false));
          dispatch(loginUserUnsuccessfull(response));
        }
      })
      .catch((e) => {
        dispatch(spinnerHandler(false));
        dispatch(loginUserFailed({
          status: 2,
          message: "Communication Failure",
        }));
      })
      .finally(fin=>{})
  };
}
export const loginUserSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    value: data
  }
};
export const loginUserUnsuccessfull = (data) => {
  return {
    type: actionTypes.LOGIN_USER_UNSUCCESSFULL,
    value: data
  }
};
export const loginUserFailed = (data) => {
  return {
    type: actionTypes.LOGIN_USER_FAILED,
    value: data
  }
};
export function logoutUser() {
  // return dispatch => {
  //   logoutUserSuccess(null)
  // };
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
    value: null
  }
}
export const logoutUserSuccess = (data) => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
    value: data
  }
};

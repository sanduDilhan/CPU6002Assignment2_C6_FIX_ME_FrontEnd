/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  user: null,
  loggedInStatus: null,

  auth: null,
  status: -1,
  message: null,

  isFailed: true,
  isFailedUser: true,
  loading: true,
};

const reducer=(state=initialState,action)=>{
  switch(action.type){

    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.value,
        loggedInStatus: true,
        status: -1,
      };
    case actionTypes.LOGIN_USER_UNSUCCESSFULL:
      return {
        ...state,
        user: null,
        loggedInStatus: false,
        status: action?.value?.status ? action?.value?.status : 0,
        message: action?.value?.message
      };

    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loggedInStatus: false,
        // status: 1,
        message: action.value ? action.value.message: null
      };
    case actionTypes.LOGOUT_USER_UNSUCCESSFULL:
      return {
        ...state,
        loggedInStatus: true,
        status: action.value.status?action.value.status:0,
        message: action.value.message
      };

    case actionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        status: action.value.status?action.value.status:0,
        message: action.value.message
      };

    //  activate-email
    case actionTypes.ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isFailed: false,
      };

    case actionTypes.ACTIVATE_USER_UNSUCCESSFULL:
      return {
        ...state,
        loading: false,
        isFailed: true,
      };

    //  activate-user
    case actionTypes.ACTIVATE_USER_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isFailedUser: false,
      };
    case actionTypes.ACTIVATE_USER_EMAIL_UNSUCCESSFULL:
      return {
        ...state,
        loading: false,
        isFailedUser: true,
      };

    case actionTypes.RESET_WARNING:
      return {
        ...state,
        status: -1,
        message: null,

        isFailed: true,
        loading: true,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        loggedInStatus: true,
        auth: action.value,

      };
    default:
      return state;
  }
};

export default reducer;

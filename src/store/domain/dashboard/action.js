import * as actionTypes from "./actionType";
import {spinnerHandler} from "../spinner/action";
import Service from "../../../services/dashboard";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 4:59 PM
 */
export const successMessageHandler = (data) => {
  return {
    type: actionTypes.SUCCESS_MESSAGE,
    value: data
  }
};

export const failedMessageHandler = (data) => {
  return {
    type: actionTypes.FAILED_MESSAGE,
    value: data
  }
};

export const resetWarningHandler = () => {
  return {
    type: actionTypes.RESET_WARNING,
    value: null
  }
};
export function mainDashboardHandler(data) {
  return dispatch => {
    dispatch(spinnerHandler(true));
    Service.mainDashboardHandler(data)
      .then((response) => {
        if (response.success) {
          dispatch(successMessageHandler(response));
        } else {
          dispatch(failedMessageHandler(response));
        }
      })
      .catch((e) => {
        dispatch(failedMessageHandler({
          status: 2,
          message: "Communication Failure",
        }));
      })
      .finally(fin=>{
        dispatch(spinnerHandler(false));
      })
  };
}

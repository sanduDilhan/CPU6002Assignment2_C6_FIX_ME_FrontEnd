/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 4:59 PM
 */
import * as actionTypes from "./actionType";

export const resetMessageHandler = (data) => {

  return {
    type: actionTypes.RESET_MESSAGE,
    value: data
  }
};
export const showMessageHandler = (data) => {

  return {
    type: actionTypes.SHOW_MESSAGE,
    value: data
  }
};

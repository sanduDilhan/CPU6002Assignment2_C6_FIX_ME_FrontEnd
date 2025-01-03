/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 4:59 PM
 */
import * as actionTypes from "./actionType";

export const spinnerHandler = (data) => {

  return {
    type: actionTypes.SPINNER,
    value: data
  }
};

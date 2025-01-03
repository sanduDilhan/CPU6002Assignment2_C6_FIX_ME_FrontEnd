/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 4:59 PM
 */
import * as actionTypes from "./actionType";

export const addToCartHandler = (data) => {
  return {
    type: actionTypes.CART_ADD,
    value: data
  }
};

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  cartList: []
};

const reducer=(state=initialState,action)=>{
  switch(action.type){

    case actionTypes.CART_ADD:
      localStorage.setItem('CART_',JSON.stringify(action.value));
      return {
        ...state,
        cartList: action.value
      };

    default:
      return state;
  }
};

export default reducer;

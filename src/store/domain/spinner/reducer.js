/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  isSpinner: false
};

const reducer=(state=initialState,action)=>{
  switch(action.type){

    case actionTypes.SPINNER:
      return {
        ...state,
        isSpinner: action.value
      };

    default:
      return state;
  }
};

export default reducer;

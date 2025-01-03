/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  status: -1,
  message: null
};
const reducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.SUCCESS_MESSAGE:
      return {
        ...state,
        status: 1,
        message: action.value.message
      };

    case actionTypes.FAILED_MESSAGE:
      return {
        ...state,
        status: action.value.status?action.value.status:0,
        message: action.value.message
      };

    case actionTypes.RESET_WARNING:
      return {
        ...state,
        status: -1,
        message: null
      };

    default:
      return state;
  }
};

export default reducer;

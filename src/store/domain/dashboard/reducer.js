import * as actionTypes from "./actionType";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/20/20
 * Time: 8:13 AM
 */

const initialState = {
  data: null,
  status: -1,
  message: null
}
const reducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.SUCCESS_MESSAGE:
      return {
        ...state,
        status: 1,
        message: '',
        data: action.value.data
      };

    case actionTypes.FAILED_MESSAGE:
      return {
        ...state,
        status: action.value.status?action.value.status:0,
        message: action.value.message,
        data: null
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

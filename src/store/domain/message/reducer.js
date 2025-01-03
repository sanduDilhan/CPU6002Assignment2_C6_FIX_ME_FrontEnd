/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:02 PM
 */
import * as actionTypes from './actionType';

const initialState = {
  showMessage:null,
  isError:null
};

const reducer=(state=initialState,action)=>{
  switch(action.type){

    case actionTypes.IS_ERROR:
      return {
        ...state,
        isError: action.value
      };
    case actionTypes.SHOW_MESSAGE:
      return {
        ...state,
        showMessage: action.value
      };

    case actionTypes.MESSAGE_OBJ:
      return {
        ...state,
        showMessage:action.value.showMessage,
        isError:action.value.isError
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        showMessage:null,
        isError:null
      };

    default:
      return state;
  }
};

export default reducer;

import {combineReducers} from "redux";
import customizer from "../../redux/reducers/customizer/index";

// redux
import auth from "../../store/domain/auth/reducer";
import message from "../../store/domain/message/reducer";
import spinner from "../../store/domain/spinner/reducer";
import register from "../../store/domain/register/reducer";
import dashboard from "../../store/domain/dashboard/reducer";
import cartStock from "../../store/domain/cart/reducer";
/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 5:00 PM
 */

const rootReducer = combineReducers({
  // theme configuration
  customizer: customizer,
  // ---------
  auth: auth,
  message: message,
  spinner: spinner,
  register: register,
  dashboard: dashboard,
  cartStock: cartStock,
  // archieve-zoom-packages: archieve-zoom-packages,
});

export default rootReducer

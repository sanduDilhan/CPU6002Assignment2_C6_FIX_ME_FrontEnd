import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 5/4/20
 * Time: 6:55 PM
 */
const middlewares = [thunk, createDebounce()]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
)

export { store }

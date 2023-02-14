import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import expenseReducer from "./expense/expenseReducer";
import loaderReducer from "./loader/loaderReducer";

const reducer = combineReducers({
  expenses: expenseReducer,
  loader: loaderReducer,
})


const store = createStore(reducer, applyMiddleware(thunk));

export default store;
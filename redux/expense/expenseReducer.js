import {
  ADD_EXPENSE,
  addExpense,
  AXIOS_GET_EXPENSES,
  axiosGetExpenses,
  DELETE_EXPENSE, deleteExpense,
  EDIT_EXPENSE,
  editExpense
} from "./expenseActions";
import axios from "axios";
import { hideLoader, showLoader } from "../loader/loaderActions";

const initialState = []

const expenseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EXPENSE:
      return [...state, payload]
    case EDIT_EXPENSE:
      return state.map(expense => expense.id === payload.id ? payload.expense : expense)
    case DELETE_EXPENSE:
      return state.filter(expense => expense.id !== payload)
    case AXIOS_GET_EXPENSES:
      return payload;
    default:
      return state
  }
}

export const getExpenses = () => async (dispatch) => {
  dispatch(showLoader());
  const response = await axios.get('https://expense-app-c098a-default-rtdb.europe-west1.firebasedatabase.app/expenses.json')
    .then(res => res.data)
    .catch(err => console.log(err));
  const expenses = [];
  for (const key in response) {
    expenses.push({
      id: key,
      description: response[key].description,
      amount: response[key].amount,
      date: new Date(response[key].date)
    })
  }
  dispatch(axiosGetExpenses(expenses));
  dispatch(hideLoader())
};

export const setExpense = (expense) => async (dispatch) => {
  dispatch(showLoader());
  await axios.post('https://expense-app-c098a-default-rtdb.europe-west1.firebasedatabase.app/expenses.json', expense)
    .then(res => {
      dispatch(addExpense({
        id: res.data.name,
        ...expense
      }))
    })
    .catch(err => console.log(err));
  dispatch(hideLoader())
}

export const patchExpense = (id, expense) => async (dispatch) => {
  dispatch(showLoader());
  await axios.patch(`https://expense-app-c098a-default-rtdb.europe-west1.firebasedatabase.app/expenses/${id}.json`, expense)
    .then(res => dispatch(editExpense(id, expense)))
    .catch(err => console.log(err));
  dispatch(hideLoader())
}

export const axiosDeleteExpense = (id) => async (dispatch) => {
  dispatch(showLoader());
  await axios.delete(`https://expense-app-c098a-default-rtdb.europe-west1.firebasedatabase.app/expenses/${id}.json`)
    .then(res => dispatch(deleteExpense(id)))
    .catch(err => console.log(err));
  dispatch(hideLoader())
}

export default expenseReducer;
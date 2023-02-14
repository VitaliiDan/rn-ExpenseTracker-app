export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
//API types
export const AXIOS_GET_EXPENSES = 'AXIOS_GET_EXPENSES';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
})

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
})

export const editExpense = (id, expense) => ({
  type: EDIT_EXPENSE,
  payload: { id, expense}
})

//API actions

export const axiosGetExpenses = (expenses) => ({
  type: AXIOS_GET_EXPENSES,
  payload: expenses,
})
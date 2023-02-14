import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getExpenses } from "../redux/expense/expenseReducer";
import { LoadingOverlay } from "../components/Ui/LoadingOverlay";


export const RecentExpenses = () => {
  const { expenses, loader } = useSelector(state => state);

  const nowDate = new Date();
  const last7DaysExpenses = expenses.filter(expense => nowDate - expense.date < 7 * 24 * 60 * 60 * 1000)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses())
  }, [])


  return loader ? <LoadingOverlay/> : (
    <ExpensesOutput
      expensesPeriod='Last 7 days'
      expenses={last7DaysExpenses}
      fallBackText='No expenses registered for the last 7 days'
    />
  )
}
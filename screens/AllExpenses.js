import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { LoadingOverlay } from "../components/Ui/LoadingOverlay";


export const AllExpenses = () => {
  const { expenses, loading } = useSelector(state => state)

  if (loading) return (<LoadingOverlay/>)

  return (
    <ExpensesOutput
      expensesPeriod='total'
      expenses={expenses}
      fallBackText='No registered expenses found!'
    />
  )
}

const styles = StyleSheet.create({
  container: {},
});
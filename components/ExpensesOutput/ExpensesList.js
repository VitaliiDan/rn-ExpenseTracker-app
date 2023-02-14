import { FlatList } from "react-native";
import { ExpenseItem } from "./ExpenseItem";

const renderExpenseItem = (item) => <ExpenseItem {...item.item}/>


export const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  )
}
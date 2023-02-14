import { useLayoutEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { IconButton } from "../components/Ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/Ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseForm } from "../components/MenageExpense/ExpenseForm";
import { dateFormat } from "../utils/dateFormat";
import { axiosDeleteExpense, patchExpense, setExpense } from "../redux/expense/expenseReducer";

export const ManageExpense = ({ route, navigation }) => {
  const editExpenseId = route.params?.id;
  const isEditing = !!editExpenseId;
  const expense = isEditing && useSelector(state => state.expenses.find(expenses => expenses.id === editExpenseId));

  const initialState = {
    amount: {
      value: isEditing ? expense.amount.toString() : '',
      isValid: true
    },
    date: {
      value: isEditing ? dateFormat(expense.date) : '',
      isValid: true
    },
    description: {
      value: isEditing ? expense.description : '',
      isValid: true
    }
  }
  const [currentExpense, setCurrentExpense] = useState(initialState);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    dispatch(axiosDeleteExpense(editExpenseId))
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const onFormChangeHandler = (inputIdetifier, value) => {
    setCurrentExpense(prevState => ({
      ...prevState,
      [inputIdetifier]: { value, isValid: true },
    }))
  }

  const confirmHandler = () => {
    const expenseData = {
      amount: +currentExpense.amount.value,
      date: new Date(currentExpense.date.value),
      description: currentExpense.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setCurrentExpense(prevState => ({
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: { value: prevState.description.value, isValid: descriptionIsValid },
      }))

      return;
    }

    if (isEditing) {
      dispatch(patchExpense(editExpenseId, {
        id: editExpenseId,
        ...expenseData
      }))
    } else {
      dispatch(setExpense(expenseData));
    }
    navigation.goBack();
  }

  const isFormValid = Object.values(currentExpense).every(input => input.isValid);

  return (
    <View style={styles.container}>
      <ExpenseForm currentExpense={currentExpense} onFormChangeHandler={onFormChangeHandler}/>
      {
        !isFormValid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      }
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {
        isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    minWidth: 100,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
});
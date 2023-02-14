import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "./Input";

export const ExpenseForm = ({ currentExpense, onFormChangeHandler }) => {

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          invalid={!currentExpense.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
            value: currentExpense.amount.value,
            onChangeText: (value) => onFormChangeHandler('amount', value),
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          invalid={!currentExpense.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: currentExpense.date.value,
            onChangeText: (value) => onFormChangeHandler('date', value),
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!currentExpense.description.isValid}
        textInputConfig={{
          placeholder: 'Description',
          multiline: true,
          value: currentExpense.description.value,
          onChangeText: (value) => onFormChangeHandler('description', value),
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  }
})
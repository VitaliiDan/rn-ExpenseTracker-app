import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllExpenses, ManageExpense, RecentExpenses } from "./screens";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name='RecentExpenses' component={ RecentExpenses }/>
      <BottomTabs.Screen name='AllExpenses' component={ AllExpenses }/>
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ ExpensesOverview }/>
          <Stack.Screen name='ManageExpense' component={ ManageExpense }/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./User/Login";
import Signup from "./User/Signup";
import Id from "./User/Find/Id";
import Pw from "./User/Find/Pw";
import Home from "./Main/Home";
import Header from "./Components/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="Id" component={Id} options={{headerShown: false}}/>
        <Stack.Screen name="Pw" component={Pw} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Header" component={Header} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

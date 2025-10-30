import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./User/Login";
import Signup from "./User/Signup";
import Id from "./User/Find/Id";
import Pw from "./User/Find/Pw";
import Home from "./Main/Home";
import Community from "./Main/Community";
import Event from "./Main/Event";
import Wishlist from "./Main/Wishlist";
import My from "./Main/Mypage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
    contentStyle: { backgroundColor: '#fff' }}}>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false, animation: 'simple_push'}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Id" component={Id} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Pw" component={Pw} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Community" component={Community} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Event" component={Event} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="Wishlist" component={Wishlist} options={{headerShown: false, animation: 'simple_push'}}/>
        <Stack.Screen name="My" component={My} options={{headerShown: false, animation: 'simple_push'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

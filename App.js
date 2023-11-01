import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";

import Database from "./Database/Database";
import EditScreen from "./screens/EditScreen";
import AddScreen from "./screens/AddScreen";
import HomeScreen from "./screens/HomeScreen";
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Hike" component={AddScreen} />
        <Stack.Screen name="Edit Hike" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Import de NavigationContainer
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import AppList from "./src/AppList";
import WebViewComponent from "./src/WebViewComponent";


//npx expo install --fix
const Stack = createStackNavigator();
const MainStackScreen = () => {
  const [fontsLoaded] = useFonts({
    Dosis: require("./fonts/InstrumentSerif-Italic.ttf"),
    Instrument: require("./fonts/InstrumentSerif-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  
 // https://expo.dev/artifacts/eas/ThPxs85aK6ECWJHjKetj6.apk
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          color: "white",
        }}
      >
        <StatusBar  barStyle="dark-content" />
        <Stack.Navigator
          initialRouteName="AppList"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AppList" component={AppList} />
          <Stack.Screen name="WebViewScreen" component={WebViewComponent} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default MainStackScreen;

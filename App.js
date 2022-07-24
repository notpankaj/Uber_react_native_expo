import { TailwindProvider } from "tailwindcss-react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import { KeyboardAvoidingView, Platform } from "react-native";

function MyAppsProviders({ children }) {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              {children}
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <MyAppsProviders>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </MyAppsProviders>
  );
}

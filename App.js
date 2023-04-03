
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import MovieList from "./src/lib/components/MainContent/Popular/Popular";
import Trailer from "./src/lib/components/MainContent/Trailer/Trailer";
import Homepage from "./src/lib/pages/Homepage";
import MovieDetails from "./src/lib/pages/MovieDetails";
import { ToastProvider } from 'react-native-toast-notifications'
import SearchPage from "./src/lib/pages/SearchPage";
import { WatchList } from "./src/lib/components/Watchlist";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false, animation: "slide_from_right", }}
        >
          <Stack.Screen
            name="Home"
            component={Homepage}
          />
          <Stack.Screen
            name="Movie_Details"
            component={MovieDetails}
          />
          <Stack.Screen
            name="Movie_List"
            component={MovieList}
          />
          <Stack.Screen
            name="Trailer"
            component={Trailer}
          />
          <Stack.Screen
            name="Search"
            component={SearchPage}
          />
          <Stack.Screen
            name="Watch_List"
            component={WatchList}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='light' />
    </ToastProvider>

  );
}
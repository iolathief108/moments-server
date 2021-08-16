import App from "./App";
import { Navigation } from "react-native-navigation";

Navigation.registerComponent("com.MaraApp.WelcomeScreen", () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "com.MaraApp.WelcomeScreen",
            },
          },
        ],
      },
    },
  });
});

import { NavigationContainer } from "@react-navigation/native";

//Routes
import DrawerRoutes from "./drawer.routes";
//Routes

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes></DrawerRoutes>
    </NavigationContainer>
  );
}

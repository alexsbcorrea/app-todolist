import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../features/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dispatch = useDispatch();

export default async function ChangeStatesRedux() {
  const Uuser = await AsyncStorage.getItem("TDUser");
  const Uemail = await AsyncStorage.getItem("TDEmail");
  const Uimage = await AsyncStorage.getItem("TDImage");
  const UimageId = await AsyncStorage.getItem("TDImageId");
  const Utoken = await AsyncStorage.getItem("TDToken");

  const data = {
    user: Uuser,
    email: Uemail,
    image: Uimage || "noimage",
    imageId: UimageId || "noimage",
    token: Utoken,
  };
  dispatch(login(data));
}

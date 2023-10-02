import { View, Image } from "react-native";

export default function logo() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./src/img/logo.png")}
        style={{
          width: 400,
          height: 400,
          marginLeft: 500,
        }}
      />
    </View>
  );
}

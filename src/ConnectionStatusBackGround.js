import React from "react";
import { View, StyleSheet, Dimensions, Image} from "react-native";
import { StatusBar } from "expo-status-bar";

const {  width } = Dimensions.get("window");
const ConnectionStatusBackGround = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E04838",
      }}
    >
      <StatusBar hidden={false} barStyle="default" />
      <Image
        source={require("../assets/images/offlineImage.png")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: width * 0.99,
    resizeMode: "contain",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConnectionStatusBackGround;

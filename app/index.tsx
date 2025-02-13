import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FONTS } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/company_logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>My Demo App</Text>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#666",
  },
});

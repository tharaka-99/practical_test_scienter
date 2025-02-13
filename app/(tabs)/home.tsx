import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import Button from "../../components/Button";
import { FONTS } from "../../constants/theme";

export default function HomeScreen() {
  const handleBack = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image
        source={require("../../assets/images/company_logo.png")}
        style={styles.logo}
      />
      <Button title="Back" onPress={handleBack} style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: "#333",
    marginBottom: 8,
  },
  backButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#666",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { FONTS } from "../../constants/theme";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { validateLogin } from "../../utils/validators";
import { getUser } from "../../services/tempStorage";
type FormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<keyof FormData, string>>({
    username: "",
    password: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleLogin = () => {
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Retrieve stored user details
    const storedUser = getUser(form.username);

    if (!storedUser) {
      setErrors({ username: "Invalid username", password: "" });
      return;
    }

    if (storedUser.password !== form.password) {
      setErrors({ username: "", password: "Invalid password" });
      return;
    }

    // Clear errors and navigate to Home screen on successful login
    setErrors({ username: "", password: "" });
    router.replace("/home");
  };

  const handleBack = () => {
    BackHandler.exitApp();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/company_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Username"
            placeholder="Username"
            value={form.username}
            onChangeText={(text) => handleInputChange("username", text)}
            error={errors.username}
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            placeholder="Password"
            value={form.password}
            onChangeText={(text) => handleInputChange("password", text)}
            error={errors.password}
            isPassword
          />

          <Button
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text
              style={styles.signupLink}
              onPress={() => router.push("/signup")}
            >
              Sign Up
            </Text>
          </View>

          <Button title="Back" onPress={handleBack} style={styles.backButton} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#666",
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  loginButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#666",
  },
  signupLink: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: "#007AFF",
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
});

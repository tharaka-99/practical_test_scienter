import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import RadioButton from "../../components/RadioButton";
import Checkbox from "../../components/Checkbox";
import { validateSignUp } from "../../utils/validators";
import { fetchCountries } from "../../services/api";
import { router } from "expo-router";
import { FONTS } from "../../constants/theme";
import { saveUser } from "../../services/tempStorage"; // Import temp storage

const SignUpScreen = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data));
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSignUp = () => {
    const validationErrors = validateSignUp(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      saveUser(form.email, { username: form.email, password: form.password });
      router.replace("/login"); // Navigate to Login screen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please fill in the form to continue</Text>

        <View style={styles.formSection}>
          <View style={styles.nameContainer}>
            <View style={styles.halfWidth}>
              <InputField
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
                error={errors.firstName}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={(text) => handleInputChange("lastName", text)}
                error={errors.lastName}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <RadioButton
              label="Gender"
              options={["Male", "Female"]}
              selected={form.gender}
              onSelect={(gender) => handleInputChange("gender", gender)}
              error={errors.gender}
            />
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Mobile Number"
              placeholder="Mobile No"
              value={form.mobile}
              onChangeText={(text) => handleInputChange("mobile", text)}
              error={errors.mobile}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Email"
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => handleInputChange("email", text)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Dropdown
              label="Country"
              options={countries}
              selected={form.country}
              onSelect={(country) => handleInputChange("country", country)}
              error={errors.country}
            />
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Password"
              placeholder="Password"
              value={form.password}
              onChangeText={(text) => handleInputChange("password", text)}
              error={errors.password}
              isPassword
            />
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              error={errors.confirmPassword}
              isPassword
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              label="I agree to the Terms & Conditions"
              checked={form.agreeTerms}
              onPress={() => handleInputChange("agreeTerms", !form.agreeTerms)}
              error={errors.agreeToTerms}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signupButton}
          />
          <Button
            title="Back"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#666",
    marginBottom: 24,
  },
  formSection: {
    gap: 16,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  fieldContainer: {},
  checkboxContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  signupButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: "#6c757d",
    borderRadius: 8,
  },
});

export default SignUpScreen;

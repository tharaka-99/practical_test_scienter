import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import { FONTS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  isPassword?: boolean;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType,
  autoCapitalize,
  isPassword = false,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    width: "100%",
  },
  labelContainer: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  inputError: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontFamily: FONTS.regular,
  },
});

export default InputField;

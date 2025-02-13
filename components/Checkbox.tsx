import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONTS } from "../constants/theme";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  error,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checked,
            error && styles.error,
          ]}
        >
          {checked && <View style={styles.checkmark} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#007AFF",
  },
  error: {
    borderColor: "red",
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#333",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontFamily: FONTS.regular,
  },
});

export default Checkbox;

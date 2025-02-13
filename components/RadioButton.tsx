import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONTS } from "../constants/theme";

interface RadioButtonProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  error?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selected,
  onSelect,
  label,
  error,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionWrapper}
            onPress={() => onSelect(option)}
          >
            <View
              style={[
                styles.radio,
                selected === option && styles.radioSelected,
                error && styles.radioError,
              ]}
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#333",
    marginBottom: 6,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "#007AFF",
  },
  radioError: {
    borderColor: "red",
  },
  optionText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontFamily: FONTS.regular,
  },
});

export default RadioButton;

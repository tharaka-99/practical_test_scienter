import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FONTS } from "../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
});

export default Button;

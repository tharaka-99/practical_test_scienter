import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { FONTS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  label,
  error,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.button, error && styles.buttonError]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>{selected || "Select an option"}</Text>
        <Ionicons name="chevron-down" size={24} color="#666" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select {label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected === item && styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonError: {
    borderColor: "red",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#999",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    fontFamily: FONTS.regular,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: "#333",
  },
  selectedText: {
    color: "#007AFF",
    fontFamily: FONTS.medium,
  },
});

export default Dropdown;

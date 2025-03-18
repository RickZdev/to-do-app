import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/utils";

type SearchBarTextInputPropType = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBarTextInput = ({
  value,
  onChangeText,
}: SearchBarTextInputPropType) => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search Task"
          placeholderTextColor={COLORS.BLACK}
          style={styles.textInput}
        />
        <View style={styles.icon}>
          <Ionicons name="search" size={30} color={COLORS.SECONDARY} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: COLORS.WHITE,
    height: 50,
    borderRadius: 5,
    paddingLeft: 50,
  },
  icon: {
    position: "absolute",
    zIndex: 0,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    left: 10,
  },
});

export default SearchBarTextInput;

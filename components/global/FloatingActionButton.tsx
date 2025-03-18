import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import { COLORS } from "@/utils";

type ActionType = {
  icon: string;
  label: string;
  onPress: () => void;
};

type FloatingActionButtonPropType = {
  actions: ActionType[];
};

const FloatingActionButton = ({ actions }: FloatingActionButtonPropType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onStateChange = ({ open }: { open: boolean }) => {
    setIsOpen(open);
  };

  return (
    <FAB.Group
      visible
      actions={actions}
      open={isOpen}
      icon={isOpen ? "calendar-today" : "plus"}
      onStateChange={onStateChange}
      color={COLORS.WHITE}
      fabStyle={styles.fabContainer}
    />
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
});

export default FloatingActionButton;

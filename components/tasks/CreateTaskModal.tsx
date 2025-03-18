import React, { useCallback, useMemo, RefObject } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { COLORS } from "@/utils";
import CreateTaskForm from "./CreateTaskForm";

type CreateTaskModalPropType = {
  bottomSheetRef: RefObject<BottomSheet>;
  category: string;
};

const CreateTaskModal = ({
  bottomSheetRef,
  category,
}: CreateTaskModalPropType) => {
  const snapPoints = useMemo(() => ["60%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const iconSize = 35;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Ionicons
            name="clipboard-outline"
            size={iconSize}
            color={COLORS.PRIMARY}
          />
          <Text variant="titleLarge" style={styles.headerText}>
            Create Task
          </Text>
        </View>

        {/* Task Form */}
        <CreateTaskForm category={category} />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateTaskModal;

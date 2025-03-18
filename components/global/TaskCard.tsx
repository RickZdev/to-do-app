import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "@/utils";
import { TaskItemType } from "@/types";

type TaskCardPropType = {
  task: TaskItemType;
  handleRemoveTaskPress?: (id: string) => void;
  handleCompleteTaskPress?: (id: string) => void;
  showActionButton?: boolean;
};

const TaskCard = ({
  task,
  showActionButton = true,
  handleRemoveTaskPress,
  handleCompleteTaskPress,
}: TaskCardPropType) => {
  const iconSize = 50;
  const actionIconSize = 30;

  return (
    <View style={styles.container}>
      {/* icon */}
      <View style={styles.icon}>
        {task.completed ? (
          <AntDesign
            name="checkcircle"
            color={COLORS.COMPLETE}
            size={iconSize}
          />
        ) : (
          <Ionicons name="timer" color={COLORS.PRIMARY} size={iconSize} />
        )}
      </View>

      {/* text */}
      <View style={styles.textContainer}>
        <Text variant="titleSmall" style={styles.title} numberOfLines={1}>
          {task.title.toUpperCase()}
        </Text>

        <View style={styles.textDescriptionContainer}>
          <Text variant="bodySmall" style={{ fontSize: 10 }}>
            Date: {task.date}
          </Text>

          <Text variant="bodySmall" style={{ fontSize: 10 }} numberOfLines={1}>
            {task.description}
          </Text>
        </View>
      </View>

      {/* action buttons */}
      {showActionButton && (
        <>
          <Pressable
            onPress={() => handleRemoveTaskPress?.(task.id)}
            style={styles.deleteButton}
          >
            <MaterialIcons
              size={actionIconSize}
              name="delete"
              color={COLORS.WHITE}
            />
          </Pressable>

          <Pressable
            onPress={() => handleCompleteTaskPress?.(task.id)}
            style={styles.completeButton}
          >
            <MaterialIcons
              size={actionIconSize}
              name="check-circle"
              color={COLORS.WHITE}
            />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    height: 110,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
    paddingHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  icon: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 50,
    gap: 7,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  textDescriptionContainer: {
    gap: 3,
  },
  deleteButton: {
    backgroundColor: COLORS.SECONDARY,
    borderLeftColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
    borderBottomColor: COLORS.SECONDARY,
    position: "absolute",
    top: 0,
    right: 0,
    padding: 8,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButton: {
    backgroundColor: COLORS.COMPLETE,
    borderLeftColor: COLORS.COMPLETE,
    borderColor: COLORS.COMPLETE,
    borderBottomColor: COLORS.COMPLETE,
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 8,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskCard;

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { COLORS } from "@/utils";
import { useTaskStore } from "@/store";
import { useFilteredTasks, useGenerateTask, useSearchQuery } from "@/hooks/";
import {
  CreateTaskModal,
  EmptyPlaceholder,
  FloatingActionButton,
  SearchBarTextInput,
  TaskCard,
} from "@/components";

const TaskListScreen = () => {
  const router = useRouter();
  const routeName = usePathname();
  const params = useLocalSearchParams<{
    category: string;
    description: string;
  }>();

  // zustand store
  const {
    selectedTasks,
    addTask,
    removeTask,
    completeTask,
    toggleTaskSelection,
    completeSelectedTasks,
    deleteSelectedTasks,
  } = useTaskStore();

  // custom hooks
  const { tasksNotComplete } = useFilteredTasks(params.category);
  const { searchQuery, setSearchQuery, searchableList } = useSearchQuery({
    tasks: tasksNotComplete,
  });

  // tanstack query
  const { refetch } = useGenerateTask();

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSelectOpenPress = () => {
    setIsSelectOpen(!isSelectOpen);
    useTaskStore.setState({ selectedTasks: [] });
  };

  const handleGenerateTaskPress = async () => {
    // Note:
    // I first fetched the API by pressing the "Generate Task" button,
    // then retrieved all the responses.
    // After that, I stored all the responses in my Zustand state.
    const response = await refetch();
    const data = response?.data?.data;

    if (data) {
      const tasks = data.map((item) => ({
        id: uuidv4(),
        title: item.title,
        description: "Generated Task from API",
        date: new Date().toLocaleDateString(),
        category: params.category,
        completed: false,
      }));

      tasks.forEach((task) => addTask(task));
    }
  };

  const handleRemoveTaskPress = (id: string) => {
    removeTask(id);
  };

  const handleCompleteTaskPress = (id: string) => {
    completeTask(id);
  };

  const actions = [
    {
      icon: "api",
      label: "Generate Task",
      onPress: handleGenerateTaskPress,
    },
    {
      icon: "pen",
      label: "Create Task",
      onPress: handlePresentModalPress,
    },
  ];

  // reset selectedTasks state upon mount
  useEffect(() => {
    useTaskStore.setState({ selectedTasks: [] });
  }, [searchQuery]);

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerWrapper}>
            <Ionicons
              onPress={() => router.back()}
              name="arrow-back-sharp"
              size={30}
              color={COLORS.WHITE}
            />
            <Text variant="headlineSmall" style={styles.headerTitle}>
              {params.category}
              {searchableList.length > 0 ? ` (${searchableList.length})` : ""}
            </Text>

            {searchableList.length > 0 && (
              <Button
                mode="contained"
                onPress={handleSelectOpenPress}
                style={styles.selectButton}
              >
                {!isSelectOpen ? "SELECT" : "UNSELECT"}
              </Button>
            )}
          </View>

          {/* search bar */}
          <SearchBarTextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Task List */}
        <View style={styles.tasksContainer}>
          <Animated.FlatList
            data={searchableList}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition}
            ListFooterComponent={<View style={styles.footer} />}
            contentContainerStyle={styles.taskList}
            ListEmptyComponent={() => <EmptyPlaceholder />}
            keyboardDismissMode={"on-drag"}
            renderItem={({ item }) => (
              <View style={styles.taskCardContainer}>
                {/* Checkbox for Selection */}
                {isSelectOpen && (
                  <Checkbox
                    value={selectedTasks.includes(item.id)}
                    onValueChange={() => toggleTaskSelection(item.id)}
                    style={styles.checkbox}
                    color={COLORS.PRIMARY}
                  />
                )}

                {/* Task Card */}
                <View style={styles.taskCard}>
                  <TaskCard
                    task={item}
                    handleRemoveTaskPress={handleRemoveTaskPress}
                    handleCompleteTaskPress={handleCompleteTaskPress}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>

      {/* Bulk Actions (Delete Selected) */}
      {selectedTasks.length > 0 &&
        searchableList.length > 0 &&
        isSelectOpen && (
          <View style={styles.actionButtonContainer}>
            <Button
              onPress={deleteSelectedTasks}
              style={[
                styles.actionButton,
                { backgroundColor: COLORS.SECONDARY },
              ]}
            >
              <Text variant="titleSmall" style={styles.actionButtonLabel}>
                Delete Tasks ({selectedTasks.length})
              </Text>
            </Button>

            <Button
              onPress={completeSelectedTasks}
              style={[
                styles.actionButton,
                { backgroundColor: COLORS.COMPLETE },
              ]}
            >
              <Text variant="titleSmall" style={styles.actionButtonLabel}>
                Complete Tasks ({selectedTasks.length})
              </Text>
            </Button>
          </View>
        )}

      {/* Floating Action Button */}
      {routeName === "/task-list" && !isSelectOpen && (
        <FloatingActionButton actions={actions} />
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        bottomSheetRef={bottomSheetRef}
        category={params.category}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    gap: 20,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 70,
  },
  headerWrapper: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    color: COLORS.WHITE,
    flex: 1,
  },
  selectButton: {
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 8,
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  footer: {
    paddingBottom: 100,
  },
  taskList: {
    gap: 20,
    padding: 5,
  },
  taskCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  checkbox: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  taskCard: {
    flex: 1,
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 20,
    position: "absolute",
    bottom: 0,
  },
  actionButton: {
    flex: 1,
    padding: 5,
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionButtonLabel: {
    color: COLORS.WHITE,
    fontSize: 10,
  },
});

export default TaskListScreen;

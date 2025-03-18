import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";

import { COLORS } from "@/utils";
import { EmptyPlaceholder, SearchBarTextInput, TaskCard } from "@/components";
import { useFilteredTasks, useSearchQuery } from "@/hooks";

const CompletedTasksScreen = () => {
  const { tasksCompleted } = useFilteredTasks();

  const { searchQuery, setSearchQuery, searchableList } = useSearchQuery({
    tasks: tasksCompleted,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Completed Tasks
          {searchableList.length > 0 ? ` (${searchableList.length})` : ""}
        </Text>

        <SearchBarTextInput value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Task List */}
      <View style={styles.taskContainer}>
        <Animated.FlatList
          data={searchableList}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
          ListFooterComponent={<View style={styles.footer} />}
          contentContainerStyle={styles.taskList}
          ListEmptyComponent={() => <EmptyPlaceholder />}
          renderItem={({ item }) => (
            <TaskCard task={item} showActionButton={false} />
          )}
          keyboardDismissMode={"on-drag"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 70,
    gap: 20,
  },
  title: {
    paddingHorizontal: 30,
    color: COLORS.WHITE,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  footer: {
    paddingBottom: 10,
  },
  taskList: {
    gap: 20,
    padding: 5,
  },
});

export default CompletedTasksScreen;

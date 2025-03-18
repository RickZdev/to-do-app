import React from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { categories } from "@/static";
import { COLORS } from "@/utils";
import { useTaskStore } from "@/store";
import { CategoryCard, TaskCard, EmptyPlaceholder } from "@/components";

const CurrentTasksScreen = () => {
  const { tasks } = useTaskStore();
  const tabBarHeight = useBottomTabBarHeight();

  const filteredTasks = [...tasks].reverse().slice(0, 5);
  const avatarSize = 60;
  const username = "John Doe";

  const getInitials = (name: string) =>
    (name.match(/\b\w/g) || []).join("").toUpperCase();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[
            COLORS.SECONDARY,
            COLORS.SECONDARY,
            COLORS.SECONDARY,
            COLORS.SECONDARY,
            "rgba(0, 0, 0, 0)",
          ]}
          style={styles.linearGradient}
        />
        <View style={styles.header}>
          <View style={styles.headerDescription}>
            <Text variant="titleMedium" style={styles.headerGreetings}>
              Good Morning! {username}
            </Text>
            <Text variant="titleLarge" style={styles.headerTitle}>
              Complete your task for a better life
            </Text>
          </View>

          <Avatar.Text
            label={getInitials(username)}
            size={avatarSize}
            style={{ backgroundColor: COLORS.PRIMARY }}
          />
        </View>

        {/* categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={CategoryCard}
          />
        </View>
      </View>

      {/* recent tasks */}
      <View style={styles.recentTasksContainer}>
        <Text variant="headlineSmall" style={styles.recentTaskTitle}>
          Recent Tasks
        </Text>

        {/* task lists */}
        <View style={styles.recentTaskListContainer}>
          <FlatList
            nestedScrollEnabled={false}
            data={filteredTasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyPlaceholder />}
            contentContainerStyle={[
              styles.taskList,
              { paddingBottom: tabBarHeight },
            ]}
            renderItem={({ item }) => (
              <TaskCard task={item} showActionButton={false} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flexGrow: 1,
  },
  headerContainer: {
    flexGrow: 1,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 50,
    paddingRight: 20,
    paddingTop: 80,
    gap: 20,
  },
  headerDescription: {
    flex: 1,
    gap: 5,
  },
  headerGreetings: {
    color: COLORS.WHITE,
  },
  headerTitle: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    lineHeight: 35,
  },
  categoriesContainer: {
    flex: 1,
    bottom: -40,
  },
  recentTasksContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  recentTaskTitle: {
    fontWeight: "bold",
  },
  recentTaskListContainer: {
    marginTop: 15,
  },
  taskList: {
    gap: 20,
    padding: 5,
  },
});

export default CurrentTasksScreen;

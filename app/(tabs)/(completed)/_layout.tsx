import { Stack } from "expo-router";

export default function CompletedTasksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="completed-tasks" />
    </Stack>
  );
}

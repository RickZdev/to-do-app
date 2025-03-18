import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="task-list"
        options={{
          presentation: "card",
        }}
      />
    </Stack>
  );
}

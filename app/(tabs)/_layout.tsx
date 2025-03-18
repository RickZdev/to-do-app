import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "@/utils";

export default function TabLayout() {
  const iconSize = 25;

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.BLACK,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="(tasks)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={iconSize} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(completed)"
          options={{
            title: "Completed",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={iconSize}
                name="check-circle-o"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
});

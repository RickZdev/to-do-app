import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Link } from "expo-router";

import { CategoryItemType } from "@/types";
import { COLORS } from "@/utils";

type CategoryCardPropType = {
  item: CategoryItemType;
};

const CategoryCard = ({ item }: CategoryCardPropType) => {
  return (
    <Link
      href={{
        pathname: "/task-list",
        params: {
          category: item.categoryName,
          description: item.categoryDescription,
        },
      }}
      style={[styles.container, { marginLeft: item.id === 0 ? 40 : 0 }]}
    >
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            {item.categoryName}
          </Text>

          <Text
            variant="bodySmall"
            style={styles.description}
            numberOfLines={1}
          >
            {item.categoryDescription}
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={item.categoryImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    width: 170,
    height: 220,
    borderRadius: 20,
    marginRight: 20,
    paddingVertical: 30,
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
  description: {
    color: COLORS.WHITE,
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default CategoryCard;

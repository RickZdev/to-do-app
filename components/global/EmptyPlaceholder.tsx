import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { IMAGES } from "@/utils";

const EmptyPlaceholder = () => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.EMPTY_LIST}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
  },
});

export default EmptyPlaceholder;

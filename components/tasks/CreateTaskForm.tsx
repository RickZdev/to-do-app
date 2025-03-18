import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { COLORS } from "@/utils";
import { useTaskStore } from "@/store";

type FormPropType = {
  title: string;
  description: string;
};

type CreateTaskFormPropType = {
  category: string;
};

const CreateTaskForm = ({ category }: CreateTaskFormPropType) => {
  const { addTask } = useTaskStore();
  const { control, handleSubmit, setValue } = useForm<FormPropType>();

  const submit: SubmitHandler<FormPropType> = (data) => {
    const task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      date: new Date().toLocaleDateString(),
      category: category,
      completed: false,
    };

    addTask(task);

    // clear the textinput after closing the bottom sheet
    setValue("title", "");
    setValue("description", "");

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              label="Title"
              placeholder="Enter a title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
            />
            {error?.message && (
              <Text variant="bodyMedium" style={styles.errorText}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              label="Description"
              mode="flat"
              placeholder="Enter a description"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!error}
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
              underlineColor="transparent"
            />
            {error?.message && (
              <Text variant="bodyMedium" style={styles.errorText}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />

      {/* Submit Button */}
      <Button
        onPress={handleSubmit(submit)}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.SECONDARY,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    flex: 1,
    minHeight: 80,
  },
  errorText: {
    color: COLORS.DELETE,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonLabel: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateTaskForm;

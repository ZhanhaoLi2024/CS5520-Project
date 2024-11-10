import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

const PostDetail = ({ route, navigation }) => {
  const { post } = route.params;
  const currentUserId = auth.currentUser?.uid;
  const isAuthor = currentUserId === post.userId;

  console.log("Post Detail Debug Info:");
  console.log("Current User ID:", currentUserId);
  console.log("Post User ID:", post.userId);
  console.log("Post Data:", post);
  console.log("Is Author:", isAuthor);

  useEffect(() => {
    navigation.setOptions({
      title: post.title,
    });
  }, [navigation, post.title]);

  const pickImage = () => {
    // Add image picker logic here
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{post.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{post.description}</Text>
        </View>

        <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={[styles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added camera functionality
            {/* {image ? "Change Image" : "Add Image"} */}
          </Text>
        </Pressable>
        <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={[styles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added location functionality
            {/* {image ? "Change Image" : "Add Image"} */}
          </Text>
        </Pressable>

        {/* <View style={styles.section}>
          <Text style={styles.label}>Created At</Text>
          <Text style={styles.value}>
            {new Date(post.createdAt).toLocaleString()}
          </Text>
        </View> */}
      </ScrollView>

      {isAuthor && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.editButtonPressed,
            ]}
            onPress={() => navigation.navigate("EditPost", { post })}
          >
            <Text style={styles.editButtonText}>Edit Post</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  editButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonPressed: {
    opacity: 0.7,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  imageButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  imageButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default PostDetail;

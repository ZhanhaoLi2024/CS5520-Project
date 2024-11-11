import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>
        {new Date(post.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.description}>{post.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default PostDetailScreen;

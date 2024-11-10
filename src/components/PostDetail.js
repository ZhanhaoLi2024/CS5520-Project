import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

const PostDetail = ({ route, navigation }) => {
  const { post } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: post.title,
    });
  }, [navigation, post.title]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{post.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{post.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>
          {new Date(post.createdAt).toLocaleString()}
        </Text>
      </View>

      {/* Add more sections as needed, e.g., user, comments, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});

export default PostDetail;

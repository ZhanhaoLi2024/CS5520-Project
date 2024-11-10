// PostDetail.js
import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";

export default function PostDetail({ route }) {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
});

import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PostItem = ({
  title,
  description,
  createdAt,
  onDelete,
  id,
  showDeleteButton,
}) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription}>{description}</Text>
      <Text style={styles.postDate}>
        {new Date(createdAt).toLocaleDateString()}
      </Text>
      {showDeleteButton && (
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={() => onDelete(id)}
        >
          <AntDesign name="delete" size={20} color="#FF6B6B" />
        </Pressable>
      )}
    </View>
  );
};

const PostList = ({
  posts,
  loading,
  onRefresh,
  emptyMessage = "No posts available",
  onDelete,
  indexCreating = false,
  showDeleteButton = false,
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {indexCreating && (
        <View style={styles.indexingBanner}>
          <Text style={styles.indexingText}>
            Setting up database optimization... Some features may be limited.
          </Text>
        </View>
      )}

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            onDelete={showDeleteButton ? onDelete : null}
            showDeleteButton={showDeleteButton}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>{emptyMessage}</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  indexingBanner: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderWidth: 1,
    borderColor: "#FFE69C",
  },
  indexingText: {
    color: "#856404",
    fontSize: 14,
    textAlign: "center",
  },
  postItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flexShrink: 1,
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    flexShrink: 1,
  },
  postDate: {
    fontSize: 12,
    color: "#999",
    marginRight: 16,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ffeded",
  },
  deleteButtonPressed: {
    opacity: 0.5,
  },
});

export default PostList;

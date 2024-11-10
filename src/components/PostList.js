import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const PostItem = ({
  title,
  description,
  createdAt,
  onDelete,
  id,
  showDeleteButton,
  onPress,
  userId,
  likesCount,
  commentsCount,
  onLike,
}) => {
  const [liked, setLiked] = useState(false);

  // Handle like button press
  const handleLike = () => {
    setLiked(!liked);
    onLike(id, liked ? -1 : 1); // Adjust likes count based on current state
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.postItem, pressed && styles.pressed]}
      onPress={() => onPress({ title, description, createdAt, id, userId })}
    >
      <View style={styles.textContainer}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postDescription}>{description}</Text>
        <Text style={styles.postDate}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.likesContainer}>
            <Pressable onPress={handleLike} style={styles.likeButton}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={20}
                color={liked ? "#FF6B6B" : "#999"}
              />
            </Pressable>
            <Text style={styles.likesCount}>{likesCount}</Text>
          </View>
          <Text style={styles.commentsCount}>
            {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
          </Text>
        </View>
      </View>
      {showDeleteButton && (
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={handleDelete}
        >
          <AntDesign name="delete" size={20} color="#FF6B6B" />
        </Pressable>
      )}
    </Pressable>
  );
};

const PostList = ({
  posts,
  loading,
  onRefresh,
  onDelete,
  onPress,
  indexCreating = false,
  showDeleteButton = false,
  emptyMessage = "No posts available",
  onLike,
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
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

      {posts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostItem
              title={item.title}
              description={item.description}
              createdAt={item.createdAt}
              onDelete={onDelete}
              id={item.id}
              userId={item.userId}
              showDeleteButton={showDeleteButton}
              onPress={onPress}
              likesCount={item.likesCount}
              commentsCount={item.commentsCount}
              onLike={onLike}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      )}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
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
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  likeButton: {
    marginRight: 6,
  },
  likesCount: {
    fontSize: 14,
    color: "#666",
  },
  commentsCount: {
    fontSize: 14,
    color: "#666",
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

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { toggleLikePost, hasUserLikedPost } from "../Firebase/firebaseHelper";
import { auth } from "../Firebase/firebaseSetup";

// PostItem Component
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
}) => {
  const currentUserId = auth.currentUser?.uid;
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount || 0);

  // Fetch the liked status from Firestore to check if the user has already liked this post
  useEffect(() => {
    const checkIfLiked = async () => {
      if (currentUserId) {
        const alreadyLiked = await hasUserLikedPost(id, currentUserId);
        setLiked(alreadyLiked);
      }
    };
    checkIfLiked();
  }, [id, currentUserId]);

  // Handle like button press
  const handleLike = async () => {
    if (!currentUserId) return;

    try {
      const result = await toggleLikePost(id, currentUserId);
      setLiked(result.liked);
      setCurrentLikes(result.likesCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
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
          {/* Likes Section */}
          <View style={styles.likesContainer}>
            <Pressable onPress={handleLike} style={styles.likeButton}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={20}
                color={liked ? "#FF6B6B" : "#999"}
              />
            </Pressable>
            <Text style={styles.likesCount}>{currentLikes}</Text>
          </View>

          {/* Comments Count */}
          <Text style={styles.commentsCount}>
            {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
          </Text>
        </View>
      </View>

      {/* Delete Button for User's Own Posts */}
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

// PostList Component
const PostList = ({
  posts,
  loading,
  onRefresh,
  onDelete,
  onPress,
  showDeleteButton = false,
  emptyMessage = "No posts available",
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

// Styles
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
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
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

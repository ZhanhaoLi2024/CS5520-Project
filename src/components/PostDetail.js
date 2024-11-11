import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, FlatList } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { addComment, getComments } from "../Firebase/firebaseHelper";

const PostDetail = ({ route, navigation }) => {
  const { post } = route.params;
  const currentUserId = auth.currentUser?.uid;
  const isAuthor = currentUserId === post.userId;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: post.title });
  }, [navigation, post.title]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(post.id);
      setComments(fetchedComments);
      setLoadingComments(false);
    };
    fetchComments();
  }, [post.id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    await addComment(post.id, currentUserId, newComment);
    setNewComment("");

    const updatedComments = await getComments(post.id);
    setComments(updatedComments);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{post.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{post.description}</Text>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comments</Text>
        {loadingComments ? (
          <Text style={styles.loadingText}>Loading comments...</Text>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{item.authorName}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyCommentsText}>No comments yet. Be the first to comment!</Text>
            }
          />
        )}
      </View>

      {/* Add Comment Input */}
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor="#999"
        />
        <Pressable style={styles.addCommentButton} onPress={handleAddComment}>
          <Text style={styles.addCommentButtonText}>Post</Text>
        </Pressable>
      </View>

      {isAuthor && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [styles.editButton, pressed && styles.editButtonPressed]}
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
    padding: 16,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: "#333",
    lineHeight: 24,
  },
  commentsSection: {
    flex: 1,
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#FF6B6B",
  },
  loadingText: {
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  commentAuthor: {
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  commentText: {
    color: "#666",
    lineHeight: 20,
  },
  emptyCommentsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  commentInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
    color: "#333",
  },
  addCommentButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    paddingTop: 24,
  },
  editButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  editButtonPressed: {
    opacity: 0.8,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default PostDetail;

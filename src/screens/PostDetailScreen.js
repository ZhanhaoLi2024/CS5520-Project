import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { addComment, getComments } from "../Firebase/firebaseHelper";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;
  const currentUserId = auth.currentUser?.uid;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(post.id);
      setComments(fetchedComments);
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
      <Text style={styles.title}>{post.title}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Pressable onPress={handleAddComment} style={styles.button}>
        <Text style={styles.buttonText}>Post Comment</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  commentItem: { padding: 8, borderBottomColor: "#ddd", borderBottomWidth: 1 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginBottom: 8 },
  button: { backgroundColor: "#FF6B6B", padding: 10, alignItems: "center" },
  buttonText: { color: "#fff" },
});

export default PostDetailScreen;

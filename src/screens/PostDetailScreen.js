import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { addComment, getComments } from "../Firebase/firebaseHelper";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

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
    <View style={generalStyles.postDetailContainer}>
      <Text style={generalStyles.postDetailTitle}>{post.title}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={generalStyles.postCommentItem}>
            <Text style={generalStyles.postCommentText}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={inputStyles.postCommentInput}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Pressable onPress={handleAddComment} style={buttonStyles.postCommentButton}>
        <Text style={buttonStyles.postCommentButtonText}>Post Comment</Text>
      </Pressable>
    </View>
  );
};

export default PostDetailScreen;

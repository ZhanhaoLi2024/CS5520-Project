import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { auth } from "../../Firebase/firebaseSetup";
import { addComment, getComments } from "../../Firebase/firebaseHelper";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { storage } from "../../Firebase/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";

const PostDetail = ({ route, navigation }) => {
  console.log("PostDetail.js", route);
  console.log(route.params.post.location);
  console.log(route.params.post.imageUri);
  const { post } = route.params;
  const currentUserId = auth.currentUser?.uid;
  const isAuthor = currentUserId === post.userId;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      console.log("Post object:", post);
      if (post?.imageUri) {
        try {
          console.log("Attempting to load image from:", post.imageUri);
          const reference = ref(storage, post.imageUri);
          const url = await getDownloadURL(reference);
          console.log("Image URL obtained:", url);
          setImageUrl(url);
        } catch (err) {
          console.error("Error loading image:", err);
        }
      } else {
        console.log("No imageUri found in post object");
      }
    };
    loadImage();
  }, [post, storage]);

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
    <View style={generalStyles.container}>
      {/* Post Title and Description */}
      <View style={generalStyles.postSection}>
        <Text style={generalStyles.postLabel}>Title</Text>
        <Text style={generalStyles.postValue}>{post.title}</Text>
      </View>
      <View style={generalStyles.postSection}>
        <Text style={generalStyles.postLabel}>Description</Text>
        <Text style={generalStyles.postValue}>{post.description}</Text>
      </View>

      {/* Location */}
      <View style={generalStyles.postSection}>
        <Text style={generalStyles.postLabel}>Location</Text>
        <Text style={generalStyles.postValue}>
          {post.location.address || "No location provided"}
        </Text>
      </View>

      {/* Image */}
      {imageUrl && (
        <View style={generalStyles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={generalStyles.imageUri}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Comments Section */}
      <View style={generalStyles.commentsSection}>
        <Text style={generalStyles.commentsHeader}>Comments</Text>
        {loadingComments ? (
          <Text style={generalStyles.loadingText}>Loading comments...</Text>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={generalStyles.commentItem}>
                <Text style={generalStyles.commentAuthor}>
                  {item.authorName}
                </Text>
                <Text style={generalStyles.commentText}>{item.text}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={generalStyles.emptyCommentsText}>
                No comments yet. Be the first to comment!
              </Text>
            }
          />
        )}
      </View>
      {/* Add Comment Input */}
      <View style={generalStyles.addCommentContainer}>
        <TextInput
          style={inputStyles.commentInput}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor="#999"
        />
        <Pressable
          style={buttonStyles.addCommentButton}
          onPress={handleAddComment}
        >
          <Text style={buttonStyles.addCommentButtonText}>Post</Text>
        </Pressable>
      </View>
      {/* Edit Button for the Author */}
      {isAuthor && (
        <View style={generalStyles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              buttonStyles.editButton,
              pressed && buttonStyles.editButtonPressed,
            ]}
            onPress={() => navigation.navigate("EditPost", { post })}
          >
            <Text style={buttonStyles.editButtonText}>Edit Post</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PostDetail;

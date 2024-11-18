import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  toggleLikePost,
  hasUserLikedPost,
} from "../../Firebase/firebaseHelper";
import { auth } from "../../Firebase/firebaseSetup";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

// PostItem Component
const PostItem = ({
  title,
  description,
  createdAt,
  location,
  imageUri,
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

  useEffect(() => {
    const checkIfLiked = async () => {
      if (currentUserId) {
        const alreadyLiked = await hasUserLikedPost(id, currentUserId);
        setLiked(alreadyLiked);
      }
    };
    checkIfLiked();
  }, [id, currentUserId]);

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
      style={({ pressed }) => [
        generalStyles.postItemContainer,
        pressed && generalStyles.postItemPressed,
      ]}
      onPress={() =>
        onPress({
          title,
          description,
          location,
          imageUri,
          createdAt,
          id,
          userId,
          location,
          imageUri,
        })
      }
    >
      <View style={generalStyles.textContainer}>
        <Text style={generalStyles.postTitle}>{title}</Text>
        <Text style={generalStyles.postDescription}>{description}</Text>
        <Text style={generalStyles.postLocation}>
          {location ? location.address : "No location provided"}
        </Text>
        <Text style={generalStyles.postDate}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>

        <View style={generalStyles.statsContainer}>
          {/* Likes Section */}
          <View style={generalStyles.likesContainer}>
            <Pressable onPress={handleLike} style={buttonStyles.likeButton}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={20}
                color={liked ? "#FF6B6B" : "#999"}
              />
            </Pressable>
            <Text style={generalStyles.likesCount}>{currentLikes}</Text>
          </View>

          {/* Comments Count */}
          <Text style={generalStyles.commentsCount}>
            {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
          </Text>
        </View>
      </View>

      {/* Delete Button */}
      {showDeleteButton && (
        <Pressable
          style={({ pressed }) => [
            buttonStyles.postDeleteButton,
            pressed && buttonStyles.postDeleteButtonPressed,
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
      <View style={generalStyles.centered}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={generalStyles.container}>
      {posts.length === 0 ? (
        <View style={generalStyles.centered}>
          <Text style={generalStyles.emptyText}>{emptyMessage}</Text>
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
              location={item.location}
              imageUri={item.imageUri}
              userId={item.userId}
              showDeleteButton={showDeleteButton}
              onPress={onPress}
              likesCount={item.likesCount}
              commentsCount={item.commentsCount}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={generalStyles.listContainer}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default PostList;

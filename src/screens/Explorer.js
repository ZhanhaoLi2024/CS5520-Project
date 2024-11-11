import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Alert, Pressable, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../Firebase/firebaseSetup";
import {
  getAllPostsWithStats,
  getUserPosts,
  deletePost,
  updatePostStatistics,
} from "../Firebase/firebaseHelper";
import PostList from "../components/PostList";
import { AntDesign } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

// Screen to display all posts
const AllPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadPosts();
    }, [])
  );

  const loadPosts = async () => {
    setLoading(true);
    const loadedPosts = await getAllPostsWithStats();
    setPosts(loadedPosts);
    setLoading(false);
  };

  const handlePostPress = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  const handleLike = async (postId, increment) => {
    await updatePostStatistics(postId, "likesCount", increment);
    loadPosts();
  };

  return (
    <PostList
      posts={posts}
      loading={loading}
      onRefresh={loadPosts}
      onPress={handlePostPress}
      onLike={handleLike}
      showDeleteButton={false}
      emptyMessage="No posts available"
    />
  );
};

// Screen to display posts created by the current user
const MyPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadMyPosts();
    }, [])
  );

  const loadMyPosts = async () => {
    setLoading(true);
    const loadedPosts = await getUserPosts(auth.currentUser.uid);
    setPosts(loadedPosts);
    setLoading(false);
  };

  const handleDeletePost = async (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deletePost(postId);
          await loadMyPosts();
        },
        style: "destructive",
      },
    ]);
  };

  const handlePostPress = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  const handleLike = async (postId, increment) => {
    await updatePostStatistics(postId, "likesCount", increment);
    loadMyPosts();
  };

  return (
    <PostList
      posts={posts}
      loading={loading}
      onRefresh={loadMyPosts}
      onDelete={handleDeletePost}
      onPress={handlePostPress}
      onLike={handleLike}
      showDeleteButton={true}
      emptyMessage="No posts created yet"
    />
  );
};

// Main Explorer component with tab navigation and "Add New Post" button
export default function Explorer({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("NewPost")}
          style={{ marginRight: 15 }}
        >
          <AntDesign name="plus" size={24} color="#FF6B6B" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999999",
        tabBarIndicatorStyle: { backgroundColor: "#FF6B6B" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="AllPosts"
        component={AllPostsScreen}
        options={{ tabBarLabel: "All" }}
      />
      <Tab.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={{ tabBarLabel: "My Posts" }}
      />
    </Tab.Navigator>
  );
}

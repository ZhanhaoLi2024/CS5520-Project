import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseSetup";
import {
  getAllPosts,
  getUserPosts,
  deletePost,
} from "../Firebase/firebaseHelper";
import { useFocusEffect } from "@react-navigation/native";
import PostList from "../components/PostList";

const Tab = createMaterialTopTabNavigator();

const PostItem = ({ title, description, createdAt }) => {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription}>{description}</Text>
      <Text style={styles.postDate}>
        {new Date(createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

const AllPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexCreating, setIndexCreating] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadPosts();
    }, [])
  );

  const loadPosts = async () => {
    try {
      setLoading(true);
      setIndexCreating(false);
      const loadedPosts = await getAllPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      if (
        error.message?.includes("index") ||
        error.code === "failed-precondition"
      ) {
        setIndexCreating(true);
        try {
          const simplePosts = await getDocuments("posts");
          const sortedPosts = simplePosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
        } catch (fallbackError) {
          console.error("Fallback query failed:", fallbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostList
      posts={posts}
      loading={loading}
      onRefresh={loadPosts}
      indexCreating={indexCreating}
      emptyMessage="No posts yet"
      showDeleteButton={false}
    />
  );
};

const MyPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexCreating, setIndexCreating] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadMyPosts();
    }, [])
  );

  const loadMyPosts = async () => {
    try {
      setLoading(true);
      setIndexCreating(false);
      const loadedPosts = await getUserPosts(auth.currentUser.uid);
      setPosts(loadedPosts);
    } catch (error) {
      console.error("Error loading my posts:", error);
      if (
        error.message?.includes("index") ||
        error.code === "failed-precondition"
      ) {
        setIndexCreating(true);
        try {
          const simplePosts = await getDocuments("posts", [
            where("userId", "==", auth.currentUser.uid),
          ]);
          const sortedPosts = simplePosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
        } catch (fallbackError) {
          console.error("Fallback query failed:", fallbackError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deletePost(postId);
              // Refresh the posts list after successful deletion
              await loadMyPosts();
            } catch (error) {
              console.error("Error deleting post:", error);
              Alert.alert("Error", "Failed to delete post");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handlePostPress = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  return (
    <PostList
      posts={posts}
      loading={loading}
      onRefresh={loadMyPosts}
      onDelete={handleDeletePost}
      onPress={handlePostPress}
      indexCreating={indexCreating}
      emptyMessage="You haven't created any posts yet"
      showDeleteButton={true}
    />
  );
};

export default function Explorer({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("NewPost")}
          style={({ pressed }) => [
            styles.postButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999999",
        tabBarIndicatorStyle: {
          backgroundColor: "#FF6B6B",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },
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

const styles = StyleSheet.create({
  postButton: {
    marginRight: 15,
  },
  postButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  listContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  retryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
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
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
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
});

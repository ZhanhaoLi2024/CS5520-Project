import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../../Firebase/firebaseSetup";
import {
  getAllPostsWithStats,
  getUserPosts,
  deletePost,
  updatePostStatistics,
} from "../../Firebase/firebaseHelper";
import PostList from "../../components/Post/PostList";
import { AntDesign } from "@expo/vector-icons";

export default function Explorer({ navigation }) {
  const [activeTab, setActiveTab] = useState("all");
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const loadPosts = async () => {
    setLoading(true);
    try {
      const [loadedAllPosts, loadedMyPosts] = await Promise.all([
        getAllPostsWithStats(),
        getUserPosts(auth.currentUser?.uid),
      ]);
      setAllPosts(loadedAllPosts);
      setMyPosts(loadedMyPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      await loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostPress = (post) => {
    navigation.navigate("PostDetail", { post });
  };

  const handleLike = async (postId, increment) => {
    try {
      await updatePostStatistics(postId, "likesCount", increment);
      await loadPosts();
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const TabButton = ({ title, isActive, onPress }) => (
    <Pressable
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabButton
          title="All Posts"
          isActive={activeTab === "all"}
          onPress={() => setActiveTab("all")}
        />
        <TabButton
          title="My Posts"
          isActive={activeTab === "my"}
          onPress={() => setActiveTab("my")}
        />
      </View>

      {activeTab === "all" ? (
        <PostList
          posts={allPosts}
          loading={loading}
          onRefresh={loadPosts}
          onPress={handlePostPress}
          onLike={handleLike}
          showDeleteButton={false}
          emptyMessage="No posts available"
        />
      ) : (
        <PostList
          posts={myPosts}
          loading={loading}
          onRefresh={loadPosts}
          onDelete={handleDeletePost}
          onPress={handlePostPress}
          onLike={handleLike}
          showDeleteButton={true}
          emptyMessage="No posts created yet"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#FF6B6B",
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999999",
  },
  activeTabButtonText: {
    color: "#FF6B6B",
  },
});

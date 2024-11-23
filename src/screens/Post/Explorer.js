import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../Firebase/firebaseSetup";
import {
  getAllPostsWithStats,
  getUserPosts,
  deletePost,
  updatePostStatistics,
} from "../../Firebase/firebaseHelper";
import PostList from "../../components/Post/PostList";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { promptLogin, getLoginPromptMessage } from "../../utils/authUtils";

export default function Explorer({ navigation, auth }) {
  const [activeTab, setActiveTab] = useState("all");
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest"); // Default sort option
  const { setIsGuest } = auth;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleNewPost} style={buttonStyles.headerAddButton}>
          <AntDesign name="plus" size={24} color="#FF6B6B" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleNewPost = () => {
    if (!auth.currentUser) {
      promptLogin(navigation, getLoginPromptMessage("create-plan"), setIsGuest);
      return;
    }
    navigation.navigate("NewPost");
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const [loadedAllPosts, loadedMyPosts] = await Promise.all([
        getAllPostsWithStats(),
        auth.currentUser ? getUserPosts(auth.currentUser.uid) : [],
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
    if (!auth.currentUser) {
      promptLogin(navigation, getLoginPromptMessage("like-post"), setIsGuest);
      return;
    }
    navigation.navigate("PostDetail", { post });
  };

  const handleLike = async (postId, increment) => {
    if (!auth.currentUser) {
      promptLogin(navigation, getLoginPromptMessage("like-post"));
      return;
    }
    try {
      await updatePostStatistics(postId, "likesCount", increment);
      await loadPosts();
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Filter posts based on search query
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort posts based on selected sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by newest
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt); // Sort by oldest
    } else if (sortOption === "likes") {
      return b.likesCount - a.likesCount; // Sort by likes
    }
    return 0;
  });

  const TabButton = ({ title, isActive, onPress }) => (
    <Pressable
      style={[
        generalStyles.explorerTabButton,
        isActive && generalStyles.activeExplorerTabButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          generalStyles.explorerTabButtonText,
          isActive && generalStyles.activeExplorerTabButtonText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={generalStyles.container}>
      {/* Search Bar */}
      <View style={generalStyles.searchContainer}>
        <TextInput
          style={generalStyles.searchInput}
          placeholder="Search posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Sort Buttons */}
      <View style={generalStyles.sortContainer}>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "newest" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("newest")}
        >
          <Text style={buttonStyles.sortButtonText}>Newest</Text>
        </Pressable>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "oldest" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("oldest")}
        >
          <Text style={buttonStyles.sortButtonText}>Oldest</Text>
        </Pressable>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "likes" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("likes")}
        >
          <Text style={buttonStyles.sortButtonText}>Most Liked</Text>
        </Pressable>
      </View>

      {/* Tab Buttons */}
      <View style={generalStyles.explorerTabBar}>
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

      {/* Post List */}
      {activeTab === "all" ? (
        <PostList
          posts={sortedPosts}
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

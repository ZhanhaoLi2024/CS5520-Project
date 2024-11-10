import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseSetup";
import { getAllPosts, getUserPosts } from "../Firebase/firebaseHelper";

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Posts</Text>
    </View>
  );
};

const MyPostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexCreating, setIndexCreating] = useState(false);

  useEffect(() => {
    loadMyPosts();
  }, []);

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
        // Try simple query without sorting
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

  return (
    <View style={styles.container}>
      {indexCreating && (
        <View style={styles.indexingBanner}>
          <Text style={styles.indexingText}>
            Setting up database optimization... Some features may be limited.
          </Text>
        </View>
      )}
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>
              You haven't created any posts yet
            </Text>
          </View>
        }
        refreshing={loading}
        onRefresh={loadMyPosts}
      />
    </View>
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
        options={{ tabBarLabel: "All Posts" }}
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

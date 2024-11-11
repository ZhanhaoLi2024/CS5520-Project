import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebaseSetup";

// Generic CRUD operations
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    throw error;
  }
};

export const getDocuments = async (collectionName, conditions = []) => {
  try {
    let q = collection(db, collectionName);

    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }

    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return documents;
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}: `, error);
    throw error;
  }
};

export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}: `, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}: `, error);
    throw error;
  }
};

// Meal Plans specific operations
export const createMealPlan = async (mealPlanData) => {
  return await createDocument("mealPlans", mealPlanData);
};

export const getUserMealPlans = async (userId) => {
  try {
    const conditions = [where("userId", "==", userId)];
    const documents = await getDocuments("mealPlans", conditions);
    return documents.sort(
      (a, b) => new Date(b.plannedDate) - new Date(a.plannedDate)
    );
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    throw error;
  }
};

export const updateMealPlan = async (mealPlanId, updateData) => {
  return await updateDocument("mealPlans", mealPlanId, updateData);
};

export const deleteMealPlan = async (mealPlanId) => {
  return await deleteDocument("mealPlans", mealPlanId);
};

// User Profiles specific operations
export const updateUserProfile = async (userId, profileData) => {
  return await updateDocument("users", userId, profileData);
};

export const getUserProfile = async (userId) => {
  const documents = await getDocuments("users", [
    where("userId", "==", userId),
  ]);
  return documents[0];
};

const executeQueryWithFallback = async (primaryQuery, fallbackQuery) => {
  try {
    const querySnapshot = await getDocs(primaryQuery);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return documents;
  } catch (error) {
    if (error.code === "failed-precondition") {
      console.log("Using fallback query due to missing index");
      const fallbackSnapshot = await getDocs(fallbackQuery);
      const documents = [];
      fallbackSnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return documents.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const primaryQuery = query(postsRef, orderBy("createdAt", "desc"));
    const fallbackQuery = query(postsRef);

    return await executeQueryWithFallback(primaryQuery, fallbackQuery);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const postsRef = collection(db, "posts");

    // Define the primary and fallback queries
    const primaryQuery = query(
      postsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const fallbackQuery = query(postsRef, where("userId", "==", userId));

    return await executeQueryWithFallback(primaryQuery, fallbackQuery);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};


export const createPost = async (postData) => {
  try {
    if (!postData.userId) {
      throw new Error("userId is required");
    }
    if (!postData.title) {
      throw new Error("title is required");
    }

    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    const docRef = doc(db, "posts", postId);
    const updates = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(docRef, updates);
    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const subscribeToAllPosts = (onPostsUpdate, onError) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    // Return the unsubscribe function
    return onSnapshot(
      q,
      (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        onPostsUpdate(posts);
      },
      (error) => {
        console.error("Error listening to posts:", error);
        onError(error);
      }
    );
  } catch (error) {
    console.error("Error setting up posts listener:", error);
    onError(error);
  }
};

export const subscribeToUserPosts = (userId, onPostsUpdate, onError) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    // Return the unsubscribe function
    return onSnapshot(
      q,
      (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        onPostsUpdate(posts);
      },
      (error) => {
        console.error("Error listening to user posts:", error);
        onError(error);
      }
    );
  } catch (error) {
    console.error("Error setting up user posts listener:", error);
    onError(error);
  }
};

// Create or update post statistics (likes, comments)
export const updatePostStatistics = async (postId, field, increment) => {
  try {
    const docRef = doc(db, "postStatistics", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Update existing document
      const currentValue = docSnap.data()[field] || 0;
      await updateDoc(docRef, {
        [field]: currentValue + increment,
      });
    } else {
      // Create a new document if it doesn't exist
      await setDoc(docRef, { [field]: increment });
    }
  } catch (error) {
    console.error("Error updating post statistics:", error);
    throw error;
  }
};

// Get post statistics by postId
export const getPostStatistics = async (postId) => {
  try {
    const docRef = doc(db, "postStatistics", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return { likesCount: 0, commentsCount: 0 };
  } catch (error) {
    console.error("Error fetching post statistics:", error);
    throw error;
  }
};


// Fetch all posts along with their statistics
export const getAllPostsWithStats = async () => {
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(query(postsRef, orderBy("createdAt", "desc")));

  const posts = await Promise.all(
    postsSnapshot.docs.map(async (postDoc) => {
      const postData = postDoc.data();
      const postId = postDoc.id;
      const stats = await getPostStatistics(postId);
      return { id: postId, ...postData, ...stats };
    })
  );
  return posts;
};

// Function to toggle like for a post
// Toggle like for a post and update both posts and postStatistics collections
export const toggleLikePost = async (postId, userId) => {
  try {
    const postDocRef = doc(db, "posts", postId);
    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
      const postData = postDocSnap.data();
      const alreadyLiked = postData.likedBy?.includes(userId);
      let updatedLikesCount = postData.likesCount || 0;

      if (alreadyLiked) {
        // Unlike the post
        await updateDoc(postDocRef, {
          likedBy: arrayRemove(userId),
          likesCount: updatedLikesCount - 1,
        });
        return { liked: false, likesCount: updatedLikesCount - 1 };
      } else {
        // Like the post
        await updateDoc(postDocRef, {
          likedBy: arrayUnion(userId),
          likesCount: updatedLikesCount + 1,
        });
        return { liked: true, likesCount: updatedLikesCount + 1 };
      }
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Check if a user has already liked a specific post
export const hasUserLikedPost = async (postId, userId) => {
  try {
    const postDocRef = doc(db, "posts", postId);
    const postDocSnap = await getDoc(postDocRef);
    if (postDocSnap.exists()) {
      const likedBy = postDocSnap.data().likedBy || [];
      return likedBy.includes(userId);
    }
    return false;
  } catch (error) {
    console.error("Error checking if user liked the post:", error);
    return false;
  }
};
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
import { storage } from "./firebaseSetup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Generic CRUD Operations
// ----------------------
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

// Query Helper
// -----------
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

// Meal Plan Operations
// ------------------
export const createMealPlan = async (mealPlanData) => {
  return await createDocument("mealPlans", mealPlanData);
};

// export const getUserMealPlans = async (userId) => {
//   try {
//     const conditions = [where("userId", "==", userId)];
//     const documents = await getDocuments("mealPlans", conditions);
//     return documents.sort(
//       (a, b) => new Date(b.plannedDate) - new Date(a.plannedDate)
//     );
//   } catch (error) {
//     console.error("Error fetching meal plans:", error);
//     throw error;
//   }
// };
export const getUserMealPlans = async (userId) => {
  try {
    if (!userId) return []; // Return empty array for guest users
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

// Post Operations
// -------------
export const createPost = async (postData) => {
  try {
    if (!postData.userId) throw new Error("userId is required");
    if (!postData.title) throw new Error("title is required");

    return await createDocument("posts", postData);
  } catch (error) {
    console.error("Error creating post:", error);
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

// export const getUserPosts = async (userId) => {
//   try {
//     const postsRef = collection(db, "posts");
//     console.log("User ID:", userId);
//     console.log("Posts Ref:", postsRef);
//     const primaryQuery = query(
//       postsRef,
//       where("userId", "==", userId),
//       orderBy("createdAt", "desc")
//     );
//     const fallbackQuery = query(postsRef, where("userId", "==", userId));
//     console.log("Primary Query:", primaryQuery);
//     return await executeQueryWithFallback(primaryQuery, fallbackQuery);
//   } catch (error) {
//     console.error("Error fetching user posts:", error);
//     throw error;
//   }
// };
export const getUserPosts = async (userId) => {
  try {
    if (!userId) return [];
    const postsRef = collection(db, "posts");
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

export const updatePost = async (postId, updateData) => {
  return await updateDocument("posts", postId, updateData);
};

export const deletePost = async (postId) => {
  return await deleteDocument("posts", postId);
};

// Post Statistics & Interaction Operations
// ------------------------------------
export const toggleLikePost = async (postId, userId) => {
  try {
    const postDocRef = doc(db, "posts", postId);
    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
      const postData = postDocSnap.data();
      const alreadyLiked = postData.likedBy?.includes(userId);
      let updatedLikesCount = postData.likesCount || 0;

      if (alreadyLiked) {
        await updateDoc(postDocRef, {
          likedBy: arrayRemove(userId),
          likesCount: updatedLikesCount - 1,
        });
        return { liked: false, likesCount: updatedLikesCount - 1 };
      } else {
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

export const getPostStatistics = async (postId) => {
  try {
    const statsRef = doc(db, "postStatistics", postId);
    const statsSnap = await getDoc(statsRef);
    if (statsSnap.exists()) {
      return statsSnap.data();
    }
    return { likesCount: 0, commentsCount: 0 };
  } catch (error) {
    console.error("Error fetching post statistics:", error);
    throw error;
  }
};

export const updatePostStatistics = async (postId, field, increment) => {
  try {
    const statsRef = doc(db, "postStatistics", postId);
    const statsSnap = await getDoc(statsRef);
    if (statsSnap.exists()) {
      const currentValue = statsSnap.data()[field] || 0;
      await updateDoc(statsRef, { [field]: currentValue + increment });
    } else {
      await setDoc(statsRef, { [field]: increment });
    }
  } catch (error) {
    console.error("Error updating post statistics:", error);
    throw error;
  }
};

// Comment Operations
// ---------------
export const addComment = async (postId, userId, text) => {
  try {
    if (!userId) throw new Error("User ID is required to add a comment.");
    if (!postId) throw new Error("Post ID is required to add a comment.");

    // Fetch the user profile to get the username or fallback to userId
    const userProfile = await getUserProfile(userId);
    const authorName = userProfile?.data?.username || `User-${userId.slice(-4)}`;

    const commentData = {
      userId,
      authorName,
      text,
      createdAt: new Date().toISOString(),
    };

    // Add the comment to the Firestore collection
    await addDoc(collection(db, `posts/${postId}/comments`), commentData);

    // Update the post's comments count
    await updatePostStatistics(postId, "commentsCount", 1);
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};


export const getComments = async (postId) => {
  try {
    if (!postId) {
      console.warn("No postId provided to getComments");
      return [];
    }

    // const commentsRef = collection(db, `posts/${postId}/comments`);
    // const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));
    // const querySnapshot = await getDocs(commentsQuery);
    // const comments = [];
    // querySnapshot.forEach((doc) => {
    //   comments.push({ id: doc.id, ...doc.data() });
    // });
    // return comments;
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(commentsQuery);

    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// User Profile Operations
// --------------------
export const createUserInFirestore = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      userId,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Real-time Subscription Operations
// -----------------------------
export const subscribeToAllPosts = (onPostsUpdate, onError) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
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

// export const getAllPostsWithStats = async () => {
//   const postsRef = collection(db, "posts");
//   const postsSnapshot = await getDocs(
//     query(postsRef, orderBy("createdAt", "desc"))
//   );

//   const posts = await Promise.all(
//     postsSnapshot.docs.map(async (postDoc) => {
//       const postData = postDoc.data();
//       const postId = postDoc.id;
//       const stats = await getPostStatistics(postId);
//       return { id: postId, ...postData, ...stats };
//     })
//   );
//   return posts;
// };
export const getAllPostsWithStats = async () => {
  try {
    const postsRef = collection(db, "posts");
    const postsSnapshot = await getDocs(
      query(postsRef, orderBy("createdAt", "desc"))
    );

    const posts = await Promise.all(
      postsSnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();
        const postId = postDoc.id;
        let stats = { likesCount: 0, commentsCount: 0 };

        try {
          const fetchedStats = await getPostStatistics(postId);
          stats = fetchedStats;
        } catch (error) {
          console.warn(`Could not fetch stats for post ${postId}:`, error);
        }

        return { id: postId, ...postData, ...stats };
      })
    );
    return posts;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
};

// Image Upload Operations
export const uploadPostImage = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageName = uri.substring(uri.lastIndexOf("/") + 1);
    const imageRef = ref(storage, `images/${imageName}`);
    const uploadResult = await uploadBytesResumable(imageRef, blob);

    return uploadResult.metadata.fullPath;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

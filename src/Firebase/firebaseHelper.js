// src/Firebase/firebaseHelper.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
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

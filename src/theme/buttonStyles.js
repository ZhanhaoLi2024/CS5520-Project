import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ffeded",
  },
  removeButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderStyle: "dashed",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },

  submitButtonPressed: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  deleteButton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deletePressed: {
    opacity: 0.5,
  },

  addCommentButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  editButtonPressed: {
    opacity: 0.8,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  postDeleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ffeded",
  },
  postDeleteButtonPressed: {
    opacity: 0.5,
  },
  likeButton: {
    marginRight: 6,
  },

  authButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  authButtonDisabled: {
    backgroundColor: "#ffb3b3",
  },

  imageButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
  },
  imageButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerAddButton: {
    marginRight: 15,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  headerAddButtonText: {
    fontSize: 24,
    color: "#FF6B6B",
  },

  profileButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  profileButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ffb3b3",
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.7,
  },

  postCommentButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  postCommentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.7,
  },

  locationButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },

  locationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  skipButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  skipButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  skipButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  skipButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
  },
  authButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  authButtonDisabled: {
    backgroundColor: "#ffb3b3",
  },

  // for the header of Explorer screen
  headerAddButton: {
    marginRight: 15,
  },

  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeSortButton: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },
  sortButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
  useRecipeButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  useRecipeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  selectButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },

  // Button props for weather display
  weatherDeleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#ffeded",
    padding: 8,
    borderRadius: 5,
  },
  weatherDeleteButtonText: {
    fontSize: 16,
    color: "#FF6B6B",
    marginLeft: 5,
  },

  weatherAddButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  weatherAddButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

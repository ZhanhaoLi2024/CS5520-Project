import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom:15
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },

  authInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    color: "#333",
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },

  profileInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },

  postCommentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 5,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },

  prominentCommentInput: {
    borderWidth: 1,
    borderColor: "#333", // Dark border for contrast
    backgroundColor: "#666", // Deeper color for the input background
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#FFF", // Text color for contrast
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },

  // input style prop for weather display
  weatherInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  
});

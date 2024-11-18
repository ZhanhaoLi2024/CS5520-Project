import { StyleSheet } from "react-native";

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  stepContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF6B6B",
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },

  planItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  textContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },

  postSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  postValue: {
    fontSize: 18,
    color: "#333",
    lineHeight: 24,
  },
  commentsSection: {
    flex: 1,
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#FF6B6B",
  },
  loadingText: {
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  commentAuthor: {
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  commentText: {
    color: "#666",
    lineHeight: 20,
  },
  emptyCommentsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  addCommentContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  buttonContainer: {
    paddingTop: 24,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  postItemContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postItemPressed: {
    opacity: 0.7,
  },
  textContainer: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
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
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  likesCount: {
    fontSize: 14,
    color: "#666",
  },
  commentsCount: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },

  authContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1a1a1a",
  },
  linkText: {
    color: "#FF6B6B",
    textAlign: "center",
    fontSize: 14,
  },

  signupContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
    color: "#1a1a1a",
  },
  linkText: {
    color: "#FF6B6B",
    textAlign: "center",
    fontSize: 14,
  },
  passwordRules: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
  },
  passwordTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  passwordHint: {
    fontSize: 12,
    marginBottom: 5,
  },

  newPostContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },

  planContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingVertical: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },

  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 15,
  },
  profileLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  profileText: {
    fontSize: 16,
    color: "#333",
  },

  postDetailContainer: {
    padding: 16,
  },
  postDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  postCommentItem: {
    padding: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  postCommentText: {
    color: "#333",
    fontSize: 16,
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40, // Adjust this value to move the logo closer to the top
    marginBottom: 20,
  },

  loginLinkText: {
    color: "#FF6B6B",
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },

  mapPreviewContainer: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  mapPreview: {
    width: "100%",
    height: "100%",
  },

  mapButtons: {
    padding: 16,
    backgroundColor: "white",
  },

  errorText: {
    color: "#FF6B6B",
    textAlign: "center",
  },

  locationPreview: {
    width: "100%",
    height: "100%",
  },

  addressText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },

  mapButtons: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  imageContainer: {
    alignItems: "center",
    width: "10%",
    height: "10%",
    marginVertical: 10,
  },
  imageUri: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    overflow: "hidden",
  },
});

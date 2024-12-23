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

  imageManagerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  imagePreview: {
    width: '65%',
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
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
  // reusable styles for the map
  mapContainer: {
    flex: 1, // Renamed from "container" to "mapContainer"
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: 200,
    padding: 10, // Renamed from "callout"
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FF6B6B",
  },
  calloutDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  calloutTapMessage: {
    fontSize: 10,
    color: "#999",
    fontStyle: "italic", // Renamed from "calloutTap"
  },
  errorBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 107, 107, 0.9)",
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: "white",
    textAlign: "center",
  },

  // reusable styles for Explorer screen
  explorerTabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff", // Renamed from "tabBar"
  },
  explorerTabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent", // Renamed from "tabButton"
  },
  activeExplorerTabButton: {
    borderBottomColor: "#FF6B6B", // Renamed from "activeTabButton"
  },
  explorerTabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999999", // Renamed from "tabButtonText"
  },
  activeExplorerTabButtonText: {
    color: "#FF6B6B", // Renamed from "activeTabButtonText"
  },

  searchContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  reminderInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
  },

  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  searchLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  recipeItem: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  recipeMissing: {
    fontSize: 14,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.7,
  },
  modalContent: {
    flex: 1,
  },
  resultsList: {
    maxHeight: "80%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    maxHeight: "80%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 15,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: "#444",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },

  // props for Weather display
  weatherContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  weatherSection: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  weatherSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  weatherCity: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    color: "#333",
    textTransform: "capitalize",
  },
  weatherEmptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  weatherLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  weatherErrorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  weatherError: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  weatherErrorHelp: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },


  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  
  
});

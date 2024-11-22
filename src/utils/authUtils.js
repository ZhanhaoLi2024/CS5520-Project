import { Alert } from "react-native";

export const promptLogin = (navigation, message, setIsGuest) => {
  if (!setIsGuest) {
    console.warn("setIsGuest function is not provided to promptLogin");
    return;
  }

  Alert.alert(
    "Login Required",
    message,
    [
      {
        text: "Continue as Guest",
        style: "cancel",
      },
      {
        text: "Sign Up",
        onPress: () => {
          setIsGuest(false);
          setTimeout(() => {
            navigation.replace("Auth", { screen: "SignupScreen" });
          }, 100);
        },
      },
    ],
    { cancelable: true }
  );
};

export const getLoginPromptMessage = (action) => {
  switch (action) {
    case "create-plan":
      return "To create and manage meal plans, you need to login to your account. Would you like to login now?";
    case "like-post":
      return "To like posts, you need to login to your account. Would you like to login now?";
    case "comment-post":
      return "To comment on posts, you need to login to your account. Would you like to login now?";
    case "create-post":
      return "To create new posts, you need to login to your account. Would you like to login now?";
    case "view-my-posts":
      return "To view your posts, you need to login to your account. Would you like to login now?";
    case "view-profile":
      return "To access your profile, you need to login to your account. Would you like to login now?";
    default:
      return "This feature requires login. Would you like to login now?";
  }
};

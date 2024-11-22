const ERROR_MESSAGES = {
  "auth/email-already-in-use": {
    title: "Email Already Registered",
    message:
      "This email is already registered. Please try logging in or use a different email address.",
    actionLabel: "Go to Login",
    action: "navigateToLogin",
  },
  "auth/invalid-email": {
    title: "Invalid Email",
    message: "Please enter a valid email address.",
    actionLabel: "Try Again",
  },
  "auth/operation-not-allowed": {
    title: "Operation Not Allowed",
    message:
      "This authentication method is not enabled. Please contact support.",
    actionLabel: "OK",
  },
  "auth/weak-password": {
    title: "Weak Password",
    message:
      "Password should be at least 6 characters long and include a mix of letters, numbers and symbols.",
    actionLabel: "Try Again",
  },
  "auth/user-disabled": {
    title: "Account Disabled",
    message:
      "This account has been disabled. Please contact support for assistance.",
    actionLabel: "OK",
  },
  "auth/user-not-found": {
    title: "Account Not Found",
    message:
      "No account found with this email address. Would you like to create a new account?",
    actionLabel: "Sign Up",
    action: "navigateToSignup",
  },
  "auth/wrong-password": {
    title: "Incorrect Password",
    message:
      "The password you entered is incorrect. Please try again or reset your password.",
    actionLabel: "Reset Password",
    action: "navigateToReset",
  },
  "auth/too-many-requests": {
    title: "Too Many Attempts",
    message:
      "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.",
    actionLabel: "OK",
  },

  "permission-denied": {
    title: "Permission Denied",
    message:
      "You don't have permission to perform this action. Please log in again.",
    actionLabel: "Login",
    action: "navigateToLogin",
  },
  "not-found": {
    title: "Not Found",
    message: "The requested resource was not found.",
    actionLabel: "Go Back",
  },

  "network-error": {
    title: "Network Error",
    message:
      "Unable to connect to the server. Please check your internet connection and try again.",
    actionLabel: "Retry",
  },

  default: {
    title: "Error",
    message: "An unexpected error occurred. Please try again.",
    actionLabel: "OK",
  },
};

const getErrorCode = (error) => {
  if (error.code) return error.code;
  if (error.message && error.message.includes("network"))
    return "network-error";
  return "default";
};

export const handleError = (error, navigation = null) => {
  const errorCode = getErrorCode(error);
  const errorInfo = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;

  const handleAction = () => {
    if (!navigation) return;

    switch (errorInfo.action) {
      case "navigateToLogin":
        navigation.replace("Login");
        break;
      case "navigateToSignup":
        navigation.replace("Signup");
        break;
      case "navigateToReset":
        break;
      default:
        break;
    }
  };

  return {
    ...errorInfo,
    handleAction,
  };
};

export const USER_GUIDANCE = {
  login: {
    title: "Welcome Back!",
    message: "Enter your credentials to access your account.",
    tips: [
      "Make sure your password is correct",
      "Check if Caps Lock is turned on",
      "Verify your internet connection",
    ],
  },
  signup: {
    title: "Create Your Account",
    message: "Join our community to share and discover delicious recipes.",
    tips: [
      "Use a strong password with mixed characters",
      "Double-check your email address",
      "Remember your login details",
    ],
  },
  posting: {
    title: "Share Your Recipe",
    message: "Help others discover your culinary creations.",
    tips: [
      "Add clear, descriptive titles",
      "Include detailed cooking steps",
      "Add photos to showcase your dish",
      "Share cooking tips and tricks",
    ],
  },
  mealPlanning: {
    title: "Plan Your Meals",
    message: "Organize your weekly menu efficiently.",
    tips: [
      "Plan ahead for the whole week",
      "Consider prep time for each meal",
      "Balance your meal types",
      "Check your ingredient inventory",
    ],
  },
};

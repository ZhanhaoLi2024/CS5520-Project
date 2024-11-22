// User guidance constants for different scenarios
export const USER_GUIDANCE = {
  login: {
    title: "Welcome back!",
    message: "Sign in to continue sharing your culinary journey.",
    tips: [
      "Use your registered email address",
      "Password is case sensitive",
      "Check your email for any verification links",
    ],
  },
  signup: {
    title: "Join iCook Community",
    message: "Create an account to start sharing your recipes.",
    tips: [
      "Use a valid email address you can access",
      "Choose a strong password that's easy to remember",
      "Your username will be visible to other users",
    ],
    passwordRequirements: [
      "At least 6 characters long",
      "Includes uppercase and lowercase letters",
      "Contains at least one number",
      "Contains at least one special character",
    ],
  },
};

// Error codes mapping to user-friendly messages
const ERROR_MESSAGES = {
  "auth/invalid-email": {
    title: "Invalid Email",
    message: "Please enter a valid email address.",
    actionLabel: "Try Again",
  },
  "auth/user-disabled": {
    title: "Account Disabled",
    message: "Your account has been disabled. Please contact support.",
    actionLabel: "Contact Support",
  },
  "auth/user-not-found": {
    title: "Account Not Found",
    message: "No account found with this email. Would you like to create one?",
    actionLabel: "Sign Up",
    navigateTo: "Signup",
  },
  "auth/wrong-password": {
    title: "Incorrect Password",
    message:
      "The password you entered is incorrect. Would you like to reset it?",
    actionLabel: "Reset Password",
    navigateTo: "ResetPassword",
  },
  "auth/email-already-in-use": {
    title: "Email Already Registered",
    message:
      "This email is already registered. Would you like to login instead?",
    actionLabel: "Login",
    navigateTo: "Login",
  },
  "auth/weak-password": {
    title: "Weak Password",
    message: "Please choose a stronger password. See the requirements below.",
    actionLabel: "OK",
  },
  "auth/network-request-failed": {
    title: "Network Error",
    message: "Please check your internet connection and try again.",
    actionLabel: "Retry",
  },
};

/**
 * Handles Firebase authentication errors and returns user-friendly error information
 * @param {Error} error - The error object from Firebase
 * @param {Object} navigation - React Navigation navigation object
 * @returns {Object} Error information including title, message, and action
 */
export const handleError = (error, navigation) => {
  console.error("Auth error:", error.code, error.message);

  const errorInfo = ERROR_MESSAGES[error.code] || {
    title: "Error",
    message: "An unexpected error occurred. Please try again.",
    actionLabel: "OK",
  };

  return {
    ...errorInfo,
    handleAction: () => {
      if (errorInfo.navigateTo) {
        navigation.navigate(errorInfo.navigateTo);
      }
    },
  };
};

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {Object} Validation result with specific criteria met
 */
export const validatePassword = (password) => {
  return {
    length: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
};

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

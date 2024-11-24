# iCook - International Student Cooking Community App

## Project Description

iCook is a mobile application designed to help international students connect through their shared love of cooking. The app enables students to share recipes, find fellow food enthusiasts in their area, and combat feelings of loneliness and cultural isolation through food-based social connections.

## New Features Implemented in Iteration 2

### 1. Authentication System

- Implemented comprehensive Firebase authentication system with email/password
- Features include:
  - User registration with strong password requirements
  - Email/password login
  - Password reset functionality
  - Secure authentication state persistence
  - Guest mode for browsing content
  - Proper error handling and user feedback
  - Security rules implementation in Firestore

### 2. Camera Integration

- Added Image Manager component using expo-image-picker
- Features:
  - Device camera access with proper permission handling
  - Image capture functionality
  - Image preview capability
  - Image upload to Firebase Storage
  - Image display in posts and profile
  - Proper error handling for failed uploads

### 3. Location Services

- Implemented location features using expo-location and react-native-maps
- Features:
  - User location access with permission handling
  - Interactive map with multiple markers showing posts
  - Location picking for new posts
  - Static map preview using Google Maps API
  - Address reverse geocoding
  - Location sharing in posts
  - Map navigation to view all posts with locations

### 4. Security Implementation

Updated Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{post} {
      allow read: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid in resource.data.likedBy;
      allow create: if request.auth != null;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /mealPlans/{mealPlanId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Screenshots

### Authentication Flow

![Login Screen](path/to/login-screenshot.png)

- Email/password login
- Guest mode option
- Password reset link
- Sign up navigation

![Signup Screen](path/to/signup-screenshot.png)

- Email/password registration
- Password strength indicators
- Form validation
- Error feedback

### Location Features

![Map View](path/to/map-screenshot.png)

- Interactive map with post markers
- Current location display
- Cluster view for multiple posts
- Location selection interface

### Camera Integration

![Image Capture](path/to/camera-screenshot.png)

- Camera permission handling
- Image preview
- Retake option
- Upload progress indicator

## Environment Variables

Add the following to your .env file:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Team Member Contributions

### Zihao Li

### Zhanhao Li

#### Authentication Implementation

| Feature             | Status | Description                                                                                                                                                                                                                           |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Firebase Auth Setup | ✅     | - Configured Firebase Authentication service with AsyncStorage persistence<br>- Implemented secure token-based authentication flow<br>- Set up proper error handling and user state management                                        |
| User Registration   | ✅     | - Created comprehensive signup flow with email/password<br>- Implemented strong password validation with multiple criteria<br>- Added real-time password strength indicators<br>- Integrated with Firestore for user profile creation |
| Login System        | ✅     | - Developed secure login flow with proper error handling<br>- Implemented guest mode functionality<br>- Added password reset capability<br>- Created professional login UI with proper validation                                     |
| Authentication Flow | ✅     | - Implemented conditional navigation based on auth state<br>- Created separate stacks for authenticated and non-authenticated users<br>- Added proper auth state persistence<br>- Implemented proper logout functionality             |

#### Location Services

| Feature          | Status | Description                                                                                                                                                                                                       |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location Setup   | ✅     | - Integrated expo-location package<br>- Implemented proper location permission handling<br>- Added current location detection                                                                                     |
| Map Integration  | ✅     | - Implemented interactive map using react-native-maps<br>- Added multiple markers for post locations<br>- Created location picking interface for new posts<br>- Implemented reverse geocoding for address display |
| Location Preview | ✅     | - Added static map preview using Google Maps API<br>- Implemented location display in posts<br>- Created location picker component for post creation                                                              |

#### Camera Integration

| Feature          | Status | Description                                                                                                                                                       |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camera Setup     | ✅     | - Integrated expo-image-picker package<br>- Implemented camera permission handling<br>- Added image capture functionality                                         |
| Image Management | ✅     | - Created image preview functionality<br>- Implemented image upload to Firebase Storage<br>- Added image display in posts<br>- Integrated with post creation flow |

#### Security Implementation

| Feature         | Status | Description                                                                                                                                              |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Firestore Rules | ✅     | - Implemented secure rules for post collection<br>- Added user-specific data access controls<br>- Set up proper authentication checks for all operations |
| Data Protection | ✅     | - Implemented proper data validation<br>- Added user ownership verification<br>- Set up secure data access patterns                                      |

#### Code Quality & Architecture

| Feature           | Status | Description                                                                                                                                            |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Error Handling    | ✅     | - Implemented comprehensive error handling for auth operations<br>- Added user-friendly error messages<br>- Created proper error recovery flows        |
| Code Organization | ✅     | - Structured authentication flow components<br>- Created reusable components for location and camera features<br>- Implemented proper state management |
| Performance       | ✅     | - Optimized image loading and caching<br>- Implemented efficient location updates<br>- Added proper loading states                                     |

## Technical Updates

### New Dependencies

```json
{
  "expo-image-picker": "~14.3.2",
  "expo-location": "~16.1.0",
  "react-native-maps": "1.7.1",
  "@react-native-async-storage/async-storage": "1.18.2"
}
```

### Key Classes/Components Added

1. Authentication Components:

   - `Login.js`: Handles user login
   - `Signup.js`: Manages user registration
   - `ResetPassword.js`: Password reset functionality

2. Image Management:

   - `ImageManager.js`: Handles camera and image picking
   - `ImageUpload.js`: Manages image upload to Firebase

3. Location Services:
   - `LocationMap.js`: Interactive map component
   - `LocationPicker.js`: Location selection interface
   - `MapView.js`: Posts map view

## Setup Instructions

1. Install new dependencies:

```bash
npx expo install expo-image-picker expo-location react-native-maps @react-native-async-storage/async-storage
```

2. Configure environment variables in .env file

3. Update Android and iOS permissions in app.json:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "cameraPermission": "Allow iCook to access your camera."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow iCook to use your location."
        }
      ]
    ]
  }
}
```

## Testing Instructions

1. Authentication:

   - Test user registration with various password combinations
   - Verify login with correct and incorrect credentials
   - Test password reset flow
   - Verify guest mode functionality

2. Camera:

   - Test camera permissions
   - Verify image capture and preview
   - Test image upload to Firebase Storage

3. Location:
   - Test location permissions
   - Verify map marker placement
   - Test location picking functionality
   - Verify address display

## Known Issues and Future Improvements

1. Performance optimization needed for image loading
2. Map clustering for large numbers of markers
3. Offline support for image upload
4. Enhanced error handling for network issues

## API Keys and Security Notes

- Google Maps API key required for map functionality
- Firebase configuration keys needed in .env file
- See environment variables section for required keys

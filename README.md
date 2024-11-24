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


### 5. Search and Sort Functionality

- Added advanced search and sort features for meal plans
  - **Search Functionality**: Users can dynamically filter meal plans by dish name in real-time.
  - **Sort Functionality**: Included sorting options like newest, oldest, and alphabetical.
  - Integrated user-friendly toggle buttons for sorting options.
- Improved user experience:
  - Smooth UI integration for responsive layouts.
  - Intuitive feedback for search and sort actions.

### 6. Notification System

- Developed a flexible reminder system allowing users to schedule notifications for meal plans.
- Features include:
  - **Push Notification Integration**: Configured Expo Notifications for both local and remote notifications.
  - **Interactive Notifications**: Added actionable options—**Confirm** and **Ignore**—to interact with reminders.
    - **Confirm**: Navigates the user to the corresponding meal plan detail page.
    - **Ignore**: Dismisses the notification without further action.
  - Customizable reminder messages tied to meal plans.
  - UI/UX enhancements:
    - **Set Reminder** button styled consistently with other buttons for a cohesive design.
    - Seamless integration with the Plan Detail screen.
- Error handling:
  - Validations for future time selection in reminders.
  - Comprehensive fallback mechanisms for notification-related errors.

## Screenshots

### Authentication Flow

![Login Screen](assets/README/Login.png)

- Email/password login
- Guest mode option
- Password reset link
- Sign up navigation

![Signup Screen](assets/README/Signup.png)

- Email/password registration
- Password strength indicators
- Form validation
- Error feedback

### Location Features

![Map View](assets/README/map-screenshot.png)

- Interactive map with post markers
- Current location display
- Cluster view for multiple posts
- Location selection interface

### Camera Integration

![Image Capture](assets/README/camera-screenshot.png)

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

#### Search and Sort Functionality

| Feature          | Status | Description                                                                                                                                         |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search Function  | ✅     | - Implemented a dynamic search bar for meal plans<br>- Allows users to filter meal plans by dish name in real-time<br>- Integrated with Plan screen |
| Sort Function    | ✅     | - Added sorting options (e.g., newest, oldest, alphabetical)<br>- Implemented user-friendly buttons to toggle sorting<br>- Integrated seamlessly with search functionality |
| User Experience  | ✅     | - Ensured smooth UI/UX integration<br>- Improved accessibility with responsive layouts<br>- Provided intuitive feedback for search and sort actions |

#### Notification System

| Feature                    | Status | Description                                                                                                                                                                  |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push Notification Setup    | ✅     | - Integrated Expo Notifications API<br>- Configured both local and remote notifications<br>- Enabled interactive notifications with options for **Confirm** and **Ignore** |
| Interactive Notifications  | ✅     | - Created custom actions:<br> 1. **Confirm**: Opens the corresponding meal plan detail page<br> 2. **Ignore**: Dismisses the notification                                 |
| Reminder Scheduling        | ✅     | - Developed a flexible reminder system allowing users to set future notifications<br>- Included custom reminder messages tied to meal plans                                |
| UI/UX Integration          | ✅     | - Added **Set Reminder** button with a design consistent with the **Edit Plan** button<br>- Provided seamless interaction across Plan Detail and Plan screens              |
| Error Handling             | ✅     | - Implemented comprehensive error handling for scheduling and interacting with notifications<br>- Ensured proper fallback for missing or invalid notification data         |

#### Code Quality & Architecture

| Feature                | Status | Description                                                                                                                                            |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Notification Manager   | ✅     | - Centralized notification logic in a reusable `NotificationManager` module<br>- Encapsulated Expo Notifications setup and scheduling functionality    |
| Response Listener      | ✅     | - Added a global notification response listener<br>- Ensured navigation integration to Plan Detail screen with proper error handling                  |
| Scalability            | ✅     | - Designed notification and search modules for easy extension<br>- Followed modular and reusable coding practices for future development              |


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
  "@react-native-async-storage/async-storage": "1.18.2",
  "@react-native-community/datetimepicker": "8.2.0",
  "expo-notifications": "~0.29.8",
  "expo-constants": "~17.0.3"
}
```

### Key Components Added

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

4. Search and Sort:

   - **Search and Sort Integration**:
     - Integrated directly into the meal plan screen.
     - Enhanced user experience with real-time feedback.
   - **Components**:
     - Search bar for dynamic filtering.
     - Sort buttons for toggling between newest, oldest, and alphabetical options.

5. Notification System:

   - `NotificationManager.js`: Manages scheduling, sending, and handling push notifications.
   - **Features**:
     - Configures notification categories with interactive options like **Confirm** and **Ignore**.
     - Registers listeners to handle notification actions dynamically.
   - **Enhanced Plan Detail Integration**:
     - Added **Set Reminder** functionality with dynamic messaging tied to meal plans.

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
  
4. Search and Sort:

   - Test search bar functionality with different meal plan names
   - Verify sorting buttons for newest, oldest, and alphabetical order
   - Check combined search and sort results for accuracy

5. Notification System:

   - Test notification scheduling with future and invalid dates
   - Verify push notifications display correct title, message, and actions
   - Test **Confirm** action to navigate to the appropriate meal plan detail in a real phone/physical device!
   - Test **Ignore** action to ensure the notification is dismissed in a real phone/physical device!
   - Verify reminder customization options in the **Plan Detail** screen

## Known Issues and Future Improvements

1. Performance optimization needed for image loading
2. Map clustering for large numbers of markers
3. Offline support for image upload
4. Enhanced error handling for network issues

## API Keys and Security Notes

- Google Maps API key required for map functionality
- Firebase configuration keys needed in .env file
- See environment variables section for required keys

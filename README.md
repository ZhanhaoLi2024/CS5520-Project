# iCook - International Student Cooking Community App

## Project Description

iCook is a mobile application designed to help international students connect through their shared love of cooking. The app enables students to share recipes, find fellow food enthusiasts in their area, and combat feelings of loneliness and cultural isolation through food-based social connections.

## New Features Implemented in Iteration 2 and 3

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

#### Firebase Data Rule

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    match /goals/{goal} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;

      allow create: if request.auth != null;
    }

    match /posts/{post} {
      allow read: if true;

      allow create: if request.auth != null &&
                    request.resource.data.userId == request.auth.uid &&
                    (!request.resource.data.location ||
                     (request.resource.data.location.coords.latitude is number &&
                      request.resource.data.location.coords.longitude is number));

      allow update: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     request.resource.data.diff(resource.data).affectedKeys()
                     .hasOnly(['likesCount', 'likedBy', 'commentsCount']));
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    match /postStatistics/{postId} {
      allow read: if true;

      allow update: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/posts/$(postId)).data.userId;

      allow create: if request.auth != null;
    }
  }
}
```

#### Storage Rule

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /post-images/{imageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }

    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 18);
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

### 7. Weather Display Screen

#### Features:

The Weather Display Screen provides real-time weather updates for both the user's current location and user-specified cities. Leveraging OpenWeather API and Expo Location, this feature is designed to enhance the user's experience by connecting food activities to weather conditions.

- **Current Location Weather**:

  - Automatically fetches and displays the weather for the user's current location using GPS.
  - Provides a detailed weather overview, including:
    - Temperature
    - Weather description (e.g., cloudy, sunny, rainy)
    - Real-time weather icons based on the current condition

- **City Weather Search**:

  - Users can manually search for cities and retrieve weather details.
  - Adds searched cities to a list for easy reference.

- **Saved Cities List**:

  - Displays a scrollable list of cities with their current weather data.
  - Includes options to delete cities from the saved list.

- **Interactive Design**:
  - Custom weather icons to visually represent conditions.
  - User-friendly search input with validation for city names.

## Screenshots

### Authentication Flow

### Login Screen

<img src="assets/README/Login.png" alt="Login Screen Screenshot" width="500">

- Email/password login
- Guest mode option
- Password reset link

<img src="assets/README/RestePassword.PNG" alt="Login Screen Screenshot" width="500">

- Sign-up navigation

---

### Signup Screen

<img src="assets/README/Signup.png" alt="Signup Screen Screenshot" width="500">

- Email/password registration
- Password strength indicators
- Form validation

<img src="assets/README/CreateAccount.PNG" alt="Signup Screen Screenshot" width="500">

- Error feedback

---

### Location Features

<img src="assets/README/uploadPicLocation.PNG" alt="Map View Screenshot" width="500">

- Interactive map with post markers

<img src="assets/README/select-location.png" alt="Map View Screenshot" width="500">
- Current location display
- Select a location on the map

<img src="assets/README/MapScreen.PNG" alt="Map View Screenshot" width="500">

- Location selection interface

### Camera Integration

- Camera permission handling

<img src="assets/README/pic_preview.jpeg" alt="Map View Screenshot" width="500">

- Image preview

<img src="assets/README/camera_use.jpeg" alt="Map View Screenshot" width="500">

- Retake option
- Upload progress indicator

### Reminder Setup

<img src="assets/README/SloganSetup.png" alt="Reminder Setup Screenshot" width="500">
<img src="assets/README/Timepicker.png" alt="Time Picker Screenshot" width="500">

- Users can set a reminder time and input the alert text they want.

---

### Reminder Confirmation

<img src="assets/README/ReminderConfirm.png" alt="Reminder Confirmation Screenshot" width="500">

- Users will receive an alert confirming that the reminder was created successfully.

---

### Notification

<img src="assets/README/Notification1.png" alt="Notification Example 1" width="500">
<img src="assets/README/Notification2.jpg" alt="Notification Example 2" width="500">
<img src="assets/README/Notification3.png" alt="Notification Example 3" width="500">

- Users will receive a notification from the server containing the alert message they created earlier. The notification will include two interactive options available on their physical device.

---

### Sort and Search

<img src="assets/README/NewestSort.png" alt="Sort by Newest Screenshot" width="500">
- Users can sort the posts and plans from newest to oldest.

<img src="assets/README/OldestSort.png" alt="Sort by Oldest Screenshot" width="500">
- Users can sort the posts and plans from oldest to newest.

<img src="assets/README/MostLikedSort.png" alt="Sort by Most Liked Screenshot" width="500">
- Users can sort the posts from most liked to least liked.

<img src="assets/README/DishNameSort.png" alt="Sort by Dish Name Screenshot" width="500">
- Users can sort plans alphabetically from A to Z.

<img src="assets/README/Search.png" alt="Search Functionality Screenshot" width="500">
- Users can search posts and plans using a search bar and type their input.

### Weather:

- Integrated OpenWeather API for weather data retrieval.
- Utilized Expo Location for fetching the user's GPS-based location.
- Ensured smooth UI integration with real-time updates and intuitive interaction.

#### Screenshots:

- **Current Weather Screen**:

  <img src="assets/README/Weather1.png" alt="Current Weather Screenshot" width="500">

- **City Weather Search**:

  <img src="assets/README/Weather2.png" alt="City Weather Search Screenshot" width="500">

- **Saved Cities List**:

  <img src="assets/README/Weather3.png" alt="Saved Cities List Screenshot" width="500">

## Environment Variables

Add the following to your .env file:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyC0fbHyiiDlsyqEJBN_n3Ku6JXxZ_lXZYQ"
EXPO_PUBLIC_SPOONACULAR_API_KEY=206822fb9fbf4076ad58b76305c9b527
```

## Team Member Contributions

### Zihao Li

#### Search and Sort Functionality

| Feature         | Status | Description                                                                                                                                                                |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search Function | ✅     | - Implemented a dynamic search bar for meal plans<br>- Allows users to filter meal plans by dish name in real-time<br>- Integrated with Plan screen                        |
| Sort Function   | ✅     | - Added sorting options (e.g., newest, oldest, alphabetical)<br>- Implemented user-friendly buttons to toggle sorting<br>- Integrated seamlessly with search functionality |
| User Experience | ✅     | - Ensured smooth UI/UX integration<br>- Improved accessibility with responsive layouts<br>- Provided intuitive feedback for search and sort actions                        |

#### Notification System

| Feature                   | Status | Description                                                                                                                                                                |
| ------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Push Notification Setup   | ✅     | - Integrated Expo Notifications API<br>- Configured both local and remote notifications<br>- Enabled interactive notifications with options for **Confirm** and **Ignore** |
| Interactive Notifications | ✅     | - Created custom actions:<br> 1. **Confirm**: Opens the corresponding meal plan detail page<br> 2. **Ignore**: Dismisses the notification                                  |
| Reminder Scheduling       | ✅     | - Developed a flexible reminder system allowing users to set future notifications<br>- Included custom reminder messages tied to meal plans                                |
| UI/UX Integration         | ✅     | - Added **Set Reminder** button with a design consistent with the **Edit Plan** button<br>- Provided seamless interaction across Plan Detail and Plan screens              |
| Error Handling            | ✅     | - Implemented comprehensive error handling for scheduling and interacting with notifications<br>- Ensured proper fallback for missing or invalid notification data         |

#### Code Quality & Architecture

| Feature              | Status | Description                                                                                                                                         |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Notification Manager | ✅     | - Centralized notification logic in a reusable `NotificationManager` module<br>- Encapsulated Expo Notifications setup and scheduling functionality |
| Response Listener    | ✅     | - Added a global notification response listener<br>- Ensured navigation integration to Plan Detail screen with proper error handling                |
| Scalability          | ✅     | - Designed notification and search modules for easy extension<br>- Followed modular and reusable coding practices for future development            |

### Weather Display Screen

| Feature                     | Status | Description                                                                                                                                                          |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Current Location Weather    | ✅     | - Integrated GPS-based weather updates using OpenWeather API and Expo Location<br>- Displays current temperature, conditions, and dynamic weather icons              |
| City Weather Search         | ✅     | - Added manual search functionality for cities<br>- Allows users to retrieve and save weather details for specific cities                                            |
| Saved Cities List           | ✅     | - Implemented a scrollable list displaying saved cities with their current weather data<br>- Integrated delete functionality for removing cities from the saved list |
| UI/UX Enhancements          | ✅     | - Custom icons for real-time weather visualization<br>- User-friendly weather search input with validation                                                           |
| Error Handling & Validation | ✅     | - Comprehensive validation for city names<br>- Proper error feedback for failed API calls                                                                            |

#### Code Quality & Architecture

| Feature        | Status | Description                                                                                                                                                |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Weather Module | ✅     | - Encapsulated weather API calls and GPS-based updates in a reusable module<br>- Ensured proper separation of concerns for data retrieval and UI rendering |
| Scalability    | ✅     | - Designed the weather functionality to support additional cities and forecast features<br>- Followed modular and reusable coding practices                |
| Error Handling | ✅     | - Added comprehensive error handling for invalid inputs, API failures, and location permission issues                                                      |

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

#### Ingredient Search and Recipe Integration

| Feature                       | Status | Description                                                                                                                                                                                                                      |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recipe Search API Integration | ✅     | - Integrated Spoonacular API for recipe search<br>- Implemented ingredient-based recipe search<br>- Created efficient API response handling<br>- Added proper error handling for API limits and failures                         |
| Recipe Display Interface      | ✅     | - Developed modal-based recipe display system<br>- Created detailed recipe view with ingredients and steps<br>- Implemented smooth transitions between search results and details<br>- Added proper loading states for API calls |
| Search Results Management     | ✅     | - Created paginated results display<br>- Implemented efficient result filtering<br>- Added result sorting by relevance<br>- Created user-friendly result cards with key information                                              |
| User Experience Enhancements  | ✅     | - Added ingredient suggestions during search<br>- Implemented real-time search feedback<br>- Created intuitive error messages for failed searches<br>- Added placeholder content during loading states                           |

#### Technical Implementations

| Feature                   | Status | Description                                                                                                                                                                           |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Integration           | ✅     | - Implemented proper API key management<br>- Created efficient caching system for API responses<br>- Added rate limiting handling<br>- Developed fallback mechanisms for API failures |
| Performance Optimizations | ✅     | - Implemented lazy loading for recipe images<br>- Optimized network requests                                                                                                          |
| Error Management          | ✅     | - Developed comprehensive error handling system<br>- Added user-friendly error messages<br>- Implemented proper error logging<br>- Created recovery mechanisms for common failures    |

#### Code Quality & Architecture

| Feature           | Status | Description                                                                                                                                                                |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error Handling    | ✅     | - Implemented comprehensive error handling for auth operations<br>- Added user-friendly error messages<br>- Created proper error recovery flows                            |
| Code Organization | ✅     | - Structured authentication flow components<br>- Created reusable components for location and camera features<br>- Implemented proper state management                     |
| Performance       | ✅     | - Optimized image loading and caching<br>- Implemented efficient location updates<br>- Added proper loading states                                                         |
| Documentation     | ✅     | - Added comprehensive API documentation<br>- Created detailed component documentation<br>- Implemented proper code comments<br>- Added usage examples for complex features |
| Testing           | ✅     | - Implemented unit tests for API integration<br>- Added integration tests for recipe import<br>- Created user flow testing<br>- Developed error case testing               |

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
npx expo install expo-image-picker expo-location react-native-maps @react-native-async-storage/async-storage @react-native-community/datetimepicker expo-notifications expo-constants
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

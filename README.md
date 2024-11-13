# iCook - International Student Cooking Community App

## Project Description

iCook is a mobile application designed to help international students connect through their shared love of cooking. The app enables students to share recipes, find fellow food enthusiasts in their area, and combat feelings of loneliness and cultural isolation through food-based social connections.

## Project Progress (Iteration 1)

### Features Implemented

#### Navigation

- Stack Navigator for authentication and detail screens
- Bottom Tab Navigator for main app sections (Plan, Explorer, Map, Profile)
- Proper navigation flow between screens

#### Authentication

- Complete signup flow with password validation
- Login functionality with error handling
- Profile management system
- Secure logout mechanism

#### Database Integration

Implemented three main collections in Firestore:

1. **users Collection**

   ```javascript
   {
     userId: string,
     displayName: string,
     email: string,
     updatedAt: timestamp
   }
   ```

2. **mealPlans Collection**

   ```javascript
   {
     userId: string,
     dishName: string,
     plannedDate: timestamp,
     steps: array,
     createdAt: timestamp
   }
   ```

3. **posts Collection**
   ```javascript
   {
     userId: string,
     title: string,
     description: string,
     createdAt: timestamp
   }
   ```

#### CRUD Operations

- Create: Users can create new meal plans and posts
- Read: Users can view meal plans and posts
- Update: Users can edit meal plans and profile information
- Delete: Users can delete meal plans and posts

### Pending Features for Next Iterations

1. Camera Integration

   - Taking photos of dishes
   - Image upload functionality

2. Location Services

   - Map integration
   - User location sharing
   - Nearby users discovery

3. Local Notifications
   - Meal plan reminders
   - Cooking time notifications

### Screenshots

[Add your screenshots here]

## Team Members and Contributions

### [Team Member 1 Name]

- Implemented authentication system
- Created profile management
- Set up Firebase configuration

### Zhanhao Li

#### Navigation Structure

- Set up Stack Navigator for authentication and detail screens
- Implemented Bottom Tab Navigator for main app sections
- Created navigation flow between all screens (Plan, Explorer, Map, Profile)
- Added proper navigation headers and transitions

#### Database Integration

- Configured Firebase/Firestore setup with proper security rules
- Designed and implemented three main collections:
  - users: For user profile data
  - mealPlans: For storing meal planning information
  - posts: For user posts and interactions

#### Core Features

- Developed complete meal planning system with CRUD operations
- Created post management system for social interactions
- Implemented real-time data updates using Firestore listeners
- Added comprehensive error handling throughout the app

#### Setup & Configuration

- Set up project structure and dependencies
- Configured environment variables for secure Firebase integration
- Implemented proper data validation and security measures

#### Documentation

- Created comprehensive README documentation
- Added inline code comments for maintainability
- Documented data models and component structures

#### Authentication & User Management (Iteration2)

- Implemented complete authentication flow using Firebase Authentication
- Created Login and Signup screens with robust validation
- Developed Profile management system with user data updates
- Implemented secure password reset functionality

## Technical Architecture

- React Native for cross-platform mobile development
- Firebase Authentication for user management
- Cloud Firestore for database
- Expo for development and building

## Setup Instructions

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Environment Variables Setup:

- Create a .env file with the following Firebase configuration:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- Modify Firebase Database Rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Allow access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Secure the "goals" collection
    match /goals/{goal} {
      // Allow read, update, and delete only if the authenticated user is the owner
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;

      // Allow authenticated users to create new documents
      allow create: if request.auth != null;
    }

    // Secure the "posts" collection
    match /posts/{post} {
      allow read: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid in resource.data.likedBy;
      allow create: if request.auth != null;
    }


    // Secure the "postStatistics" collection
    match /postStatistics/{postId} {
      // Allow read access to all authenticated users
      allow read: if request.auth != null;

      // Allow updates only if the user is the owner of the original post
      allow update: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/posts/$(postId)).data.userId;

      // Allow create access to authenticated users
      allow create: if request.auth != null;
    }
  }
}
```

3. Run the project:

```bash
npx expo start
```

## Project Structure

```
CS5520-PROJECT/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── MealPlan/        # Meal plan related components
│   │   │   ├── MealPlanForm.js  # Form for creating/editing meal plans
│   │   │   └── PlanItem.js      # Individual meal plan list item
│   │   └── Post/            # Post related components
│   │       └── PostList.js      # List view for posts
│   │
│   ├── Firebase/            # Firebase configuration and helpers
│   │   ├── firebaseHelper.js    # Firebase CRUD operations
│   │   └── firebaseSetup.js     # Firebase initialization
│   │
│   ├── screens/             # Application screens
│   │   ├── Auth/           # Authentication screens
│   │   │   ├── Login.js        # User login screen
│   │   │   └── Signup.js       # User registration screen
│   │   ├── MealPlan/       # Meal plan screens
│   │   │   ├── MealPlanner.js  # Create meal plan screen
│   │   │   ├── Plan.js         # Meal plans list screen
│   │   │   ├── PlanDetail.js   # Meal plan details screen
│   │   │   └── PlanEdit.js     # Edit meal plan screen
│   │   ├── Post/           # Post related screens
│   │   │   ├── EditPost.js     # Edit post screen
│   │   │   ├── Explorer.js     # Main posts feed screen
│   │   │   ├── NewPost.js      # Create new post screen
│   │   │   ├── PostDetail.js   # Post details screen
│   │   │   └── PostDetailScreen.js  # Detailed post view screen
│   │   ├── Map.js          # Map feature screen (placeholder)
│   │   └── Profile.js      # User profile screen
│   │
│   └── theme/              # Styling and theming
│       ├── buttonStyles.js    # Button style constants
│       ├── colors.js          # Color palette definitions
│       ├── fontSize.js        # Typography scale
│       ├── generalStyles.js   # Common style patterns
│       ├── inputStyles.js     # Input field styles
│       └── styles.js          # Global styles
│
├── .env                    # Environment variables
├── .gitignore             # Git ignore configuration
├── App.js                 # Application root component
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── package-lock.json      # Dependency lock file
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

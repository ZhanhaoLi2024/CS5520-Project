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

1. Users Collection (Iteration)

```typescript
users: {
  userId: string,            // Auth UID as document ID
  username: string,       // User's name
  email: string,            // User's email address
  updatedAt: timestamp,     // Last profile update timestamp
}

CREATE:
- Automatically created when user signs up
- Implementation: Profile.js handles user document creation

READ:
- Fetch user profile data
- Implementation: Profile.js getUserProfile()

UPDATE:
- Update display name and profile information
- Implementation: Profile.js handleUpdateProfile()

DELETE:
- Not implemented in iteration 1
```

2. Meal Plans Collection

```typescript
mealPlans: {
  id: string,               // Auto-generated document ID
  userId: string,           // Reference to user who created the plan
  dishName: string,         // Name of the dish
  plannedDate: timestamp,   // When the meal is planned for
  steps: string[],          // Array of cooking steps
  createdAt: timestamp,     // Creation timestamp
  updatedAt: timestamp,     // Last update timestamp
}

CREATE:
- Create new meal plan
- Implementation: MealPlanner.js -> createMealPlan()
- Function: createDocument() in firebaseHelper.js

READ:
- Fetch user's meal plans
- Implementation: Plan.js -> getUserMealPlans()
- Function: getDocuments() with userId condition

UPDATE:
- Edit existing meal plan
- Implementation: PlanEdit.js -> updateMealPlan()
- Function: updateDocument() in firebaseHelper.js

DELETE:
- Delete meal plan
- Implementation: Plan.js -> handleDeletePlan()
- Function: deleteDocument() in firebaseHelper.js
```

3. Posts Collection

```typescript
posts: {
  id: string,               // Auto-generated document ID
  userId: string,           // Reference to user who created the post
  title: string,            // Post title
  description: string,      // Post content
  createdAt: timestamp,     // Creation timestamp
  updatedAt: timestamp,     // Last update timestamp
  likeCount: string         // Other user like
  comments: {               // Subcollection
    userId: string,         // Reference to comment author
    text: string,           // Comment content
    createdAt: timestamp,   // Comment creation time
}
CREATE:
- Create new post
- Implementation: NewPost.js -> handleSubmit()
- Function: createPost() in firebaseHelper.js
- Add a comment to a specific post
- Give a like to a specific post

READ:
- Fetch all posts (Explorer tab)
- Fetch user's posts (My Posts tab)
- Implementation: Explorer.js -> getAllPosts(), getUserPosts()
- Functions: getDocuments() with various conditions

UPDATE:
- Update user's posts
- Implementation: EditPost.js -> handleSubmit()
- Functions: updatePost() in firebaseHelper.js

DELETE:
- Delete user's posts
- Implementation: Explorer.js -> handleDeletePost()
- Function: deletePost() in firebaseHelper.js
- Delete like
```

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

#### Plan

- Plan Main Screen(User-owned plans and delete button)

   <img src="assets/README/Plan%20Main%20Screen.png" style="zoom:15%;">

- Plan Detail

   <img src="assets/README/Plan Detail.png" style="zoom:15%;">

- Create Plan Screen

  <img src="assets/README/Create Plan Screen.png" style="zoom:15%;">

- Edit Plan Screen

  <img src="assets/README/Edit Plan Screen.png" style="zoom:15%;">

#### Post

- Post Main Screen

  - All Posts

    <img src="assets/README/All Posts.png" style="zoom:15%;">

  - My Posts

    <img src="assets/README/My Posts.png" style="zoom:15%;">

- New Post

  <img src="assets/README/New Post.png" style="zoom:15%;">

- Edit Post

  <img src="assets/README/Edit Post.png" style="zoom:15%;">

#### Profile

- Profile Screen

<img src="assets/README/Profile Screen.png" style="zoom:15%;">

#### Auth(Iteration2)

- Login

<img src="assets/README/Login.png" style="zoom:15%;">

- Signup

<img src="assets/README/Signup.png" style="zoom:15%;">

## Team Members and Contributions

### Zihao Li

| Category               | Feature                | Status | Description                                                                 |
| ---------------------- | ---------------------- | ------ | --------------------------------------------------------------------------- |
| **Authentication**     |                        |        |                                                                             |
|                        | Authentication System  | ✅     | - Setting up authentication on firebase<br>- Email/password login & sign-up |
| **Database**           |                        |        |                                                                             |
|                        | Firebase Configuration | ✅     | - Set up postStatistics collection<br>- Configuration for secure access     |
| **Posts**              |                        |        |                                                                             |
|                        | Comments System        | ✅     | - Added comments to posts<br>- Real-time updates with Firestore             |
|                        | Likes System           | ✅     | - Implemented like/unlike functionality<br>- Updated post statistics        |
|                        | All Post System        | ✅     | - Implemented like/unlike and comments functionality in all post system     |
|                        | My Post System         | ✅     | - Implemented like/unlike and comments functionality in my post system      |
| **Plan**               |                        |        |                                                                             |
|                        | Plan Detail UI         | ✅     | - Enhance the display UI of the interface                                   |
|                        | Plan Item Component UI | ✅     | - Enhance the display UI of the interface                                   |
| **UI/UX Enhancements** |                        |        |                                                                             |
|                        | Global Styling         | ✅     | - Created reusable stylesheets<br>- Implemented theme for colors & fonts    |
|                        | Form Validation        | ✅     | - Enhanced form validation for inputs<br>- User feedback with alerts        |
|                        | Icon                   | ✅     | - Add icon and theme to app                                                 |
|                        | Logo                   | ✅     | - Create the theme logo of our app                                          |

### Zhanhao Li

#### Completed Features in Iteration 1

| Category                            | Feature              | Status | Description                                                                 |
| ----------------------------------- | -------------------- | ------ | --------------------------------------------------------------------------- |
| **Navigation**                      |                      |        |                                                                             |
|                                     | Stack Navigator      | ✅     | - Authentication flow<br>- Screen transitions<br>- Header configuration     |
|                                     | Bottom Tab Navigator | ✅     | - Main app navigation<br>- Tab bar customization                            |
| **Database**                        |                      |        |                                                                             |
|                                     | Firestore Setup      | ✅     | - Firebase configuration<br>- Security rules implementation                 |
|                                     | CRUD Operations      | ✅     | - Users collection<br>- Meal plans collection<br>- Posts collection         |
| **Plan**                            |                      |        |                                                                             |
|                                     | Meal Plan Creation   | ✅     | - Form implementation<br>- Date selection<br>- Steps management             |
|                                     | Meal Plan List       | ✅     | - Display all plans<br>- Delete functionality<br>- Navigation to details    |
|                                     | Meal Plan Details    | ✅     | - View plan details<br>- Edit functionality                                 |
| **Post**                            |                      |        |                                                                             |
|                                     | Post Creation        | ✅     | - Create new posts<br>- Input validation                                    |
|                                     | Post List            | ✅     | - Display all posts<br>- User's posts view                                  |
|                                     | Post Management      | ✅     | - Delete posts<br>- View post details                                       |
| **UI/UX**                           |                      |        |                                                                             |
|                                     | Theme System         | ✅     | - Color schemes<br>- Typography<br>- Consistent styling                     |
|                                     | Error Handling       | ✅     | - User feedback<br>- Loading states<br>- Form validation                    |
| **Authentication**<br> (Iteration2) |                      |        |                                                                             |
|                                     | User Registration    | ✅     | - Email/password sign up<br>- Input validation<br>- Error handling          |
|                                     | User Login           | ✅     | - Email/password authentication<br>- Session management<br>- Error handling |
|                                     | User Profile         | ✅     | - Profile information display<br>- Profile editing<br>- Password updating   |

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
│   ├── components/                  # Reusable UI components
│   │   ├── MealPlan/                # Meal plan related components
│   │   │   ├── MealPlanForm.js      # Form for creating/editing meal plans
│   │   │   └── PlanItem.js          # Individual meal plan list item
│   │   └── Post/                    # Post related components
│   │       └── PostList.js          # List view for posts
│   │
│   ├── Firebase/                    # Firebase configuration and helpers
│   │   ├── firebaseHelper.js        # Firebase CRUD operations
│   │   └── firebaseSetup.js         # Firebase initialization
│   │
│   ├── screens/                     # Application screens
│   │   ├── Auth/                    # Authentication screens
│   │   │   ├── Login.js             # User login screen
│   │   │   └── Signup.js            # User registration screen
│   │   │
│   │   ├── MealPlan/                # Meal plan screens
│   │   │   ├── MealPlanner.js       # Create meal plan screen
│   │   │   ├── Plan.js              # Meal plans list screen
│   │   │   ├── PlanDetail.js        # Meal plan details screen
│   │   │   └── PlanEdit.js          # Edit meal plan screen
│   │   │
│   │   ├── Post/                    # Post related screens
│   │   │   ├── EditPost.js          # Edit post screen
│   │   │   ├── Explorer.js          # Main posts feed screen
│   │   │   ├── NewPost.js           # Create new post screen
│   │   │   ├── PostDetail.js        # Post details screen
│   │   │   └── PostDetailScreen.js  # Detailed post view screen
│   │   │
│   │   ├── Map.js                   # Map feature screen (placeholder)
│   │   └── Profile.js               # User profile screen
│   │
│   └── theme/                       # Styling and theming
│       ├── buttonStyles.js          # Button style constants
│       ├── colors.js                # Color palette definitions
│       ├── fontSize.js              # Typography scale
│       ├── generalStyles.js         # Common style patterns
│       ├── inputStyles.js           # Input field styles
│       └── styles.js                # Global styles
│
├── .gitignore                       # Git ignore configuration
├── App.js                           # Application root component
├── app.json                         # Expo configuration
├── babel.config.js                  # Babel configuration
├── package-lock.json                # Dependency lock file
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

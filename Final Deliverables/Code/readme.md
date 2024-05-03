# Ujret Mobile Application - Sprint 4

- Build APK of Sprint 4 can be accessed from here [Sprint4_apk](https://drive.google.com/file/d/1jpODb8AjX9qQ3Z7fdhiJEAYfMXDjw966/view?usp=sharing) 
- Demo video of sprint-4 can be accessed from here [Sprint4_Demo-video]()

Please Note that the backend will not restart until a call is manually made on this endpoint [https://ujret-backend-node.onrender.com/api/v1](https://ujret-backend-node.onrender.com/api/v1); that's because the backend is deployed on Render free service, which requires a call to start it. Else backend takes 40-50 seconds to start on free service of render.

## Welcome to the repository for the Ujret Mobile Application. This document provides an overview of the project progress, setup instructions, and additional information.

### Team - Group-P05
Abdullah Ehsan 24100144@lums.edu.pk
Abdul Moez 24100244@lums.edu.pk
Talha Husnain 24100245@lums.edu.pk
Muhammad Jahanzaib Khursheed 24100257@lums.edu.pk
Malik Muhammad Moaz 24100163@lums.edu.pk

---

## Project Details

### Project Completed in Sprint4

1. **List of Requirements Completed**

   - **Service Seeker side**
     - Viewing Task History
     - Interact With Tasks to continue Getting Bids
   - **Service Provider side**
     - Viewing Task History

2. **List of Use Cases Completed**

   1. Task History and Interactions

### Project Completed So Far

1. **List of Requirements**

   - **Auth and Onboarding System**
     - Login
     - SignUp
     - Onboarding screens
   - **Profile Management**
     - Update Profile
     - Adding MoreInfo (cnic, etc)
     - Change Password
     - Delete Account
     - Log-out functionality
   - **Service Seeker Side (Client Side)**
     - Bids Offer List View
     - Handyman Info View (including Review and Rating)
     - Accepting Bid
     - Mark Task Completion
     - Add Review For Handyman
     - Task History and Interaction
   - **Task**
     - Create Task With all the Details
     - Create Task with selection of subcategory (Task category) of the service
     - Task Flow from creation to completion
   - **Service Provider Side (Worker/Handyman)**
     - Service Provider Registration
     - Selecting your service categories from all Handyman categories
     - Service Provider Professional info addition
     - Service Provider Work status (Mark them online to accept the tasks)
     - List View of Posted Tasks
     - Task Bidding (offering Price)
     - Tracking Task Status
     - Task Completion
     - Task History and Interaction

2. **List of Use Cases, Including Those in the Previous Sprints**

   1. Auth System and Onboarding
   2. Profile Management (user/worker - service provider and service seeker)
   3. Posting a task with all the details
   4. Service provider Registration with all the details
   5. Service provider Work Status update (online/offline)
   7. Task Flow
   8. Task Flow/Tracking from Service Seeker/Client side
   9. Task Flow/Tracking from Service Provider/Tasker side
   10. Task History and Interaction

3. **Design UI Prototype on Figma**

   - **Prototype Can be accessed here**
     - [Figma Prototype](https://www.figma.com/proto/AveFswFASVByStuKrw1SX2/Ujret-Draft-To-Share?type=design&node-id=1-2634&t=QL6TFcsitksdl5Ir-0&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A2634)

### Project Backlog

1. **List of UseCases**

   - **Renting Module**
     - Post A tool
     - Update tool info
     - Delete Tool
     - View Tools List
     - View Tool Details
     - Update Availablity 

---

## How to Access the System

### A) Install APK File

- You can get the APK file here [Sprint4_apk]() 
- Node Backend is Deployed on Render deployed server link [https://ujret-backend-node.onrender.com/api/v1](https://ujret-backend-node.onrender.com/api/v1) 
Note that the backend may take 45-50s to start on the first call after being inactive for a day. That's Because Backend is currently deployed on free version of Render ![image](https://github.com/talha-husnain/P05-Ujret_Mobile_App/assets/88245647/5e4b9434-af73-4956-b266-b8c8bab9e4be)
- Flask Backend is also Accessible here [https://ujret-python-api.onrender.com/api/v1](https://ujret-python-api.onrender.com/api/v1).
 

### B) Run Code Locally

You can directly run the code (Frontend on android emulator) and (backend on powershell). Details are given below

#### How To Access the System Locally

1. **Run Frontend Locally**
2. **Run Node Backend Locally**
3. **Run Flask Backend Locally**

### (1) Run Frontend Locally

#### Getting Started

Note: Make sure you have completed the React Native - Environment Setup instructions till "[Creating a new application](https://reactnative.dev/docs/environment-setup)" step, before proceeding.

###### Go to the Frontend directory

```bash
  cd Ujret-Frontend-ReactNative
```

##### Step 1: Start the Metro Server

First, you will need to start Metro, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

###### using npm

```bash
  npm start
```

###### OR using Yarn

```bash
  yarn start
```

##### Step 2: Start your Application

Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

##### For Android

###### using npm

```bash
  npm run android
```

###### OR using Yarn

```bash
  yarn android
```

##### For iOS

###### using npm

```bash
  npm run ios
```

###### OR using Yarn

```bash
  yarn ios
```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### (2) Run Node Backend Locally
First, Copy env from [here](https://drive.google.com/file/d/1ItTW_Pw-x1zbPix6rG_ntZJ0IJ--SqWk/view?usp=sharing), and paste it in Sprint 3/Ujret-Backend-Node folder and then follow the steps below.

###### Run these commands one by one in the Node backend main Directory

```bash
  npm i
```
```bash
  node index.js
```

### (3) Run Flask Backend Locally

#### Getting Started

Note: Make sure you have completed the Environment Setup, before proceeding.

- Environment Setup
  Install Postgres Sql Locally, setup its database
  Install Datagrip to access databases because its accessible, create a project on datagrip using postgres sql as database.
  Go to the backend/db/migrations/0-1.sql, copy the sql and paste it on new create project's console on datagrip
  Run the Sql on console and the setup is done

- To run backend follow the following steps.

- Go to the backend directory

```bash
  cd Ujret-Backend-Flask
```

#### Database Setup

- Add environment variables (get credentials from datagrip, rename file to .env)

```bash
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
DB_CONNECT_TIMEOUT=
```

- Run SQL in DataGrip console (copy, paste and run)

```text
0-1.sql
```

#### Running Flask Server

- Set up and activate virtual environment (optional)

```bash
  python3 -m venv venv
  source venv/bin/activate
```

- Install dependencies

```bash
  cd backend
  pip install -r requirements.txt
```

- Start the server

```bash
  // from backend directory
  flask --app core.api.api  --debug run
```
# 📌 React Native To-Do App (Tech Exam)

A feature-rich to-do application built with **React Native** and **Expo CLI**, leveraging modern state management, data fetching, form handling, and task persistence. 

It features a **clean, neat, and simple UI** using **Expo CLI** and **expo-router**.  
This app is optimized to **build and run smoothly on both iOS and Android devices**.  

## 🚀 Features  
- ✅ Add a new task  
- ✅ Delete a single task  
- ✅ Delete multiple tasks at once  
- ✅ Mark a task as completed  
- ✅ Persist tasks using AsyncStorage  
- ✅ Search functionality to quickly find tasks  
- ✅ View recent tasks (5 tasks at a time)  
- ✅ Separate tab for completed tasks  
- ✅ Categorized tasks (General, Projects, Study, etc.) for better organization  
- ✅ Fetch and generate 3 to-do tasks from an API request  

## 🛠️ Tech Stack  
This project is built using:  

- **Framework:** React Native (via Expo CLI)  
- **Navigation:** expo-router  
- **State Management:** Zustand  
- **Data Fetching & Caching:** TanStack Query  
- **Form Handling:** React Hook Form  
- **HTTP Client:** Axios  
- **Storage:** AsyncStorage for persisting tasks  

## 🔗 API  
This app fetches and manages data using **JSONPlaceholder**:  
[https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos)  

It retrieves **3 to-do tasks** dynamically from the API to prepopulate the task list.  

## 📂 Installation & Setup  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

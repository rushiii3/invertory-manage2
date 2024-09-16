import { create } from "zustand";
import { userStorage } from "./store";
import { User, UserHistory, UserStore } from "@/types";

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  currentUser: null,
  userHistory: [],

  initializeHistory: async () => {
    const data = await userStorage.getItem("usersHistory");
    if (data) {
      const userHistory: UserHistory[] = JSON.parse(data);
      const currentUser = get().currentUser;
      if (currentUser) {
        const userHistoryFilter = userHistory.filter(
          (history) => history.email === currentUser.email
        );
        console.log(userHistoryFilter);
        
        console.log("initalingggg");
        
        if (userHistoryFilter.length > 0) {
          set({ userHistory: userHistoryFilter });
        }else{
          set({ userHistory: [] });
        }
      }
    }
  },

  initializeUsers: async () => {
    const data = await userStorage.getItem("users");
    if (data) {
      const users: User[] = JSON.parse(data);
      if (users) {
        set({ users });
      }
    }
  },

  addUser: async (data) => {
    try {
      const newUser: User = {
        ...data,
        date: new Date(),
      };
      const updatedUsers = [newUser, ...get().users];

      await userStorage.setItem("users", JSON.stringify(updatedUsers));
      set({ users: updatedUsers });
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  },

  loginUser: async (data) => {
    try {
      const { email, password } = data;
      const initializeHistory = get().initializeHistory;
      const userData = await userStorage.getItem("users");
      if (userData) {
        const users: User[] = JSON.parse(userData) || [];
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          set({ currentUser: user });
          await userStorage.setItem("currentUser", JSON.stringify(user));
          initializeHistory();
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      return false;
    }
  },

  logoutUser: async () => {
    try {
      set({ currentUser: null });
      await userStorage.removeItem("currentUser");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await userStorage.getItem("currentUser");
      if (user) {
        set({ currentUser: JSON.parse(user) });
      }
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  },

  addHistory: async (email, status, type, title, method) => {
    const message = status
      ? `${method} ${type} ${title} successfully`
      : `${method} to add ${type} ${title}`;
    const history: UserHistory = {
      email,
      status,
      message,
      date: new Date(),
    };
    const updatedHistory = [history, ...get().userHistory];
    await userStorage.setItem("usersHistory", JSON.stringify(updatedHistory));
    set({ userHistory: updatedHistory });
  },
}));

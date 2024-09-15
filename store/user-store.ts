import { create } from "zustand";
import { userStorage } from "./store";

export const useUserStore = create((set, get) => ({
  users: [],
  currentUser: null,
  userHistory: [],
  initalizeHistory: async () => {
    const Data = await userStorage.getItem("usersHistory");
    const userHistory = JSON.parse(Data);
    const userHistoryFilter = userHistory.filter(
      (history) => history.email === get().currentUser.email
    );
    if (userHistoryFilter) {
      set({ userHistory: userHistoryFilter });
    }
  },
  initalizeUsers : async() => {
    const Data = await userStorage.getItem("users");
    const user = JSON.parse(Data);
    if (user) {
      set({ users: user });
    }
  },
  addUser: async (data) => {
    try {
      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
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
      const userData = await userStorage.getItem("users");
      const users = JSON.parse(userData) || [];
      const user = users.find((user) => {
        return user.email === data.email && user.password === data.password;
      });

      if (user) {
        set({ currentUser: user });
        if (userStorage?.setItem) {
          await userStorage.setItem("currentUser", JSON.stringify(user));
        }
        return true;
      } else {
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
      console.log("logginggg");
      
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  },
  getCurrentUser: async () => {
    set({ loading: true });
    if (userStorage?.getItem) {
      const user = await userStorage.getItem("currentUser");
      set({ currentUser: JSON.parse(user) });
      set({ loading: false });
    }
  },
  addHistory: async (email, status, type, title, method) => {
    const message = status
      ? `${method} ${type} ${title} successfully`
      : `${method} to add ${type} ${title}`;
    const history = {
      email: email,
      status: status,
      message: message,
      date: new Date(),
    };
    const addUserHistory = [history, ...get().userHistory];
    console.log(addUserHistory);
    await userStorage.setItem("usersHistory", JSON.stringify(addUserHistory));
    set({ userHistory: addUserHistory });
  },
}));

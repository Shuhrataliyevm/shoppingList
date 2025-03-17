import { create } from "zustand";

const getFromLocalStorage = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

export const useStore = create((set) => ({
  user: getFromLocalStorage("user", null),
  setUser: (user) =>
    set(() => {
      saveToLocalStorage("user", user);
      return { user };
    }),

    groups: JSON.parse(localStorage.getItem("groups")) || [],
  
    addGroup: (newGroup) =>
      set((state) => {
        const updatedGroups = [...state.groups, newGroup];
        localStorage.setItem("groups", JSON.stringify(updatedGroups));
        return { groups: updatedGroups };
      }),

  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null };
    }),
}));

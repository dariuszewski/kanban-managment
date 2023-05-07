import { defineStore } from "pinia";
import usersMock from "@/usersMock.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  getters: {
    isLoggedIn: (state) => {
      return state.user !== null;
    },
  },

  actions: {
    async fetchUser() {
      // Simulate fetching the user from the server
      // In a real implementation, you would fetch the user from an API endpoint
      const user = usersMock.find((u) => u.id === 1);
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    },

    async signUp(firstName, lastName, email, password) {
      // Simulate registering a user on the server
      // In a real implementation, you would send the registration data to an API endpoint
      const newUser = {
        id: usersMock.length + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      usersMock.push(newUser);
      localStorage.setItem('user', JSON.stringify(newUser))
      this.user = newUser;
    },

    async signIn(email, password) {
      // Simulate signing in a user on the server
      // In a real implementation, you would send the login data to an API endpoint
      const user = usersMock.find((u) => u.email === email && u.password === password);
      console.log('user:', user)
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    },
  },
});
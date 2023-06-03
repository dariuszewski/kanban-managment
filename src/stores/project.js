import { defineStore } from "pinia";
import projectsMock from "@/projectsMock.js";


export const useProjectStore = defineStore("project", {
  state: () => ({
    project: null,
  }),

  getters: {
    isProjectSelected: (state) => {
      return state.project !== null;
    },
    currentProject: (state) => {
      return state.project;
    },
  },

  actions: {
    async fetchProject(projectId) {
      this.project = projectsMock.find((p) => p.id === Number(projectId));
    },
    selectProject(project) {
      this.project = project;
    },
    clearProject() {
      this.project = null;
    },
  },
});


// export const useProjectStore = defineStore("project", {
//   state: () => ({
//     project: JSON.parse(localStorage.getItem('project')) || null
//   }),

//   getters: {
//     isProjectSelected: (state) => {
//       return state.project !== null;
//     },
//     currentProject: (state)  => {
//         return state.project
//     }
//   },

//   actions: {
//     async fetchProject(projectId) {
//       // Simulate fetching the project from the server
//       // In a real implementation, you would fetch the project from an API endpoint
//       const project = projectsMock.find((p) => p.id === projectId);
//       localStorage.setItem('project', JSON.stringify(project));
//       this.project = project;
//     },
//   },
// });
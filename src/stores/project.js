import { defineStore } from "pinia";
import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js"


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
    getProjectParticipantsArray: (state) => {
      return usersMock.filter((user) => state.project.participants.includes(user.id));
    },
    projectTasks: (state) =>  {
      return state.project.tasks;
    }
  },

  actions: {
    async fetchProject(projectId) {
      const selectedProject = projectsMock.find((p) => p.id === Number(projectId));
      this.project = selectedProject;
      this.tasks = selectedProject.tasks;
    },
    selectProject(project) {
      this.project = project;
    },
    clearProject() {
      this.project = null; 
    },
    async deleteTask(taskId) {
      this.project.tasks = this.project.tasks.filter(task => task.id !== taskId)
    },
    async updateTask(taskId, data) {
      this.project.tasks = this.project.tasks.filter(task => task.id !== taskId)
      this.project.tasks.push(data) 
    },
    async insertTask(data) {
      this.project.tasks.push(data) 
    },
    async removeParticipant(userId) {
      this.project.participants = this.project.participants.filter(id => id !== userId);
    },
    async addParticipant(userId) {
      this.project.participants.push(userId);
    }
  }, 
});


import { defineStore } from "pinia";
import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js"
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, query, where, FieldPath } from 'firebase/firestore'
import { db } from '@/components/firebase/config.js'


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
      return state.project.participants;
    },
    projectTasks: (state) =>  {
      return state.project.tasks;
    }
  },

  actions: {
    async fetchProject(projectId) {
      const projectRef = doc(db, "projects", projectId);
      const projectSnap = await getDoc(projectRef);
    
      if (projectSnap.exists()) {
        console.log("Document data:", projectSnap.data());
        const projectData = projectSnap.data()
        this.project = {
          id: projectSnap.id,
          owner: projectData.owner,
          name: projectData.name,
          tasks: projectData.tasks,
          // participants are queried by separate request below
        }
        // query by document id
        const usersQuery = query(collection(db, 'users'), where('__name__', "in", projectData.participants))
        const usersRef = await getDocs(usersQuery)
        const participants = usersRef.docs.map(ref => {
          const userData = ref.data()
          return {
            id: ref.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            color: userData.color,
          }
        })
        this.project.participants = participants
      } else {
        // docSnap.data() will be undefined in this case
        // project does not exist
        console.log("No such project, redirecting");
        router.push({name: 'notFound'})
      }
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
      const projectRef = doc(db, "projects", this.project.id);

      await updateDoc(projectRef, {
        tasks: this.project.tasks
      });
    },
    async removeParticipant(userId) {
      this.project.participants = this.project.participants.filter(id => id !== userId);
    },
    async addParticipant(userId) {
      this.project.participants.push(userId);
    }
  }, 
});


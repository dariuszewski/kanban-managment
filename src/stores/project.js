import { defineStore } from "pinia";
import { collection, getDocs, updateDoc, doc, getDoc, query, where } from 'firebase/firestore'
import { db } from '@/components/firebase/config.js'
import { useAuthStore } from '@/stores/useAuthStore.js'
import router from '../router'

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
          lastTaskId: projectData.lastTaskId,
          participantsIds: projectData.participants,
          // participants are queried by separate request below
        }
        // query by document id
        const usersQuery = query(collection(db, 'users'), where('__name__', "in", this.project.participantsIds))
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
        }) //pufUYH2PAKU5etxzU2x9
        this.project.participants = participants
        const userStore = useAuthStore()
        const userId = userStore.currentUser.uid
        const userIsParticipant = participants.find(user => user.id === userId)
        if (!userIsParticipant) {
          router.push({name: 'forbidden'})
        }
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
      const projectRef = doc(db, "projects", this.project.id);
      await updateDoc(projectRef, {
        tasks: this.project.tasks
      });
    },
    async updateTask(taskId, data) {
      console.log('updating', taskId, 'with', data)
      this.project.tasks = this.project.tasks.filter(task => task.id !== taskId)
      this.project.tasks.push(data)

      const projectRef = doc(db, "projects", this.project.id);
      await updateDoc(projectRef, {
        tasks: this.project.tasks
      });
    },
    async insertTask(data) {
      const taskId = parseInt(this.project.lastTaskId) + 1
      data.id = taskId
      this.project.tasks.push(data)
      this.project.lastTaskId = taskId

      const projectRef = doc(db, "projects", this.project.id);
      await updateDoc(projectRef, {
        tasks: this.project.tasks,
        lastTaskId: taskId,
      });
    },
    async removeParticipant(user) {
      this.project.participants = this.project.participants.filter(p => p.id !== user.id);
      this.project.participantsIds = this.project.participantsIds.filter(pid => pid !== user.id);

      const projectRef = doc(db, "projects", this.project.id);
      await updateDoc(projectRef, {
        participants: this.project.participantsIds
      });
    },
    async addParticipant(user) {
      this.project.participants.push(user);
      this.project.participantsIds.push(user.id);

      const projectRef = doc(db, "projects", this.project.id);
      await updateDoc(projectRef, {
        participants: this.project.participantsIds
      });
    }
  }, 
});


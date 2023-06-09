<script setup>
import { ref, onBeforeMount } from 'vue'
import ProjectCard from "@/components/ProjectCard.vue"
import AddProjectCard from '../components/AddProjectCard.vue'
import { collection, getDocs, getDoc, doc, query, or, where } from 'firebase/firestore'
import { db } from '@/components/firebase/config.js'
import { useAuthStore } from '../stores/useAuthStore'


const authStore = useAuthStore()

const userFirstName = ref('') 
const projects = ref([])

onBeforeMount(async () => {
  const resp = await getDoc(doc(db, "users", authStore.currentUser.uid))
  const user = resp.data()
  userFirstName.value = user.firstName
  const projectsRef = collection(db, 'projects')
  const projectsQuery = query(projectsRef,  
    or(where('participants', 'array-contains', authStore.currentUser.uid),
      where('owner', '==', authStore.currentUser.uid)
    ))
  const response = await getDocs(projectsQuery)
  projects.value = response.docs.map(ref => {
    const data = ref.data()
    return {
      id: ref.id,
      name: data.name,
      owner: data.owner,
      participants: data.participants,
      tasks: data.tasks,
    }
  })
})

function projectCreatedHandler(data) {
  console.log('project created handler', data)
}

</script>

<template>
  <div class="main-wrapper">
    <!-- <v-container> -->
    <!-- header -->
    <v-row 
      class="mt-5" 
      no-gutters
    >
      <h1 id="title">
        Hello, {{ userFirstName }}
      </h1>
    </v-row>
    <v-row 
      class="mt-12 mb-12" 
      no-gutters
    >
      <h2 id="subtitle">
        Select a project...
      </h2>
    </v-row>
    <!-- end of header -->
    <!-- projects section -->
    <v-row>
      <template
        v-for="project in projects"
        :key="project.name"
      >
        <v-col
          xs="12"
          sm="4"
          md="3"
          class="mb-2"
        >
          <project-card
            :project="project"
          />
        </v-col>
      </template>
      <v-col
        xs="12"
        sm="4"
        md="3"
      >
        <AddProjectCard @project-created="projectCreatedHandler" />
      </v-col>
    </v-row>
    <!-- end of projects section -->
  <!-- </v-container> -->
  </div>
</template>


<style scoped>

  #title {
    color: var(--color-font-grey)
  }

  #subtitle {
    font-style: italic;
    font-weight: 100;
    color: var(--color-font-grey);
  }

  .add-project:hover {
    cursor: pointer;
    background-color: rgb(227, 227, 227)
  }

</style>
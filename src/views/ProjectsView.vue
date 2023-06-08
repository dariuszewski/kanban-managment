<script setup>
import { ref, reactive, computed, defineProps } from 'vue'

import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"
import ProjectCard from "@/components/ProjectCard.vue"
import projectsMock from "@/projectsMock.js"

import AddProjectCard from '../components/AddProjectCard.vue'

const pinia = createPinia() 
const userStore = useUserStore(pinia) // currently its used only to show user, but will be needed to load projects (probably)

const user = computed(() => userStore.user)
const projects = reactive(getAvailableProjects())

function getAvailableProjects() {
  const availableProjects = projectsMock.filter(p => p.participants.includes(user.value.id))
  return availableProjects
}

</script>

<template>
  <div class="main-wrapper">
    <!-- <v-container> -->
    <!-- header -->
    <v-row class="mt-5" no-gutters>
      <h1 id="title">Hello, {{ user.firstName }}</h1>
    </v-row>
    <v-row class="mt-12 mb-12" no-gutters>
      <h2 id="subtitle">Select a project...</h2>
    </v-row>
    <!-- end of header -->
    <!-- projects section -->
    <v-row>
      <template
        v-for="project in projects"
        :key="project.id"
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
        <AddProjectCard></AddProjectCard>
      </v-col>
    </v-row>
    <!-- end of projects section -->
  <!-- </v-container> -->
  </div>
</template>


<style scoped>

  #title {
    /* color: grey; */
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
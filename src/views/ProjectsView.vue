<script setup>
import { ref, reactive, computed, defineProps } from 'vue'

import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"
import ProjectCard from "@/components/ProjectCard.vue"
import projectsMock from "@/projectsMock.js"

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
    <v-row class="mt-5">
      <h1>Hello, {{ user.firstName }}</h1>
    </v-row>
    <v-row class="mt-12 mb-12">
      <h3><i>Select a project...</i></h3>
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
        <v-card
          class="d-flex align-center justify-center add-project"
          height="200"
          width="200"
        >
          <div class="text-center">
            <v-icon
              icon="mdi-folder-plus"
              size="x-large"
            />
            <v-card-text class="project-name">
              Create New Project
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- end of projects section -->
  <!-- </v-container> -->
  </div>
</template>


<style scoped>

  h3 {
    color:rgb(219, 219, 219)
  }

  .add-project:hover {
    cursor: pointer;
    background-color: rgb(227, 227, 227)
  }

</style>
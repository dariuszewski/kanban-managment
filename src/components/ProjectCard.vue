<script setup>
import { ref, reactive, computed, defineProps } from "vue";
import router from '../router'

import projectsMock from "@/projectsMock.js";

const props = defineProps({
  // id: Number,
  // name: String,
  // progress: Number,
  // participantsCount: Number
  project: Object
});

function computeProjectCompleteness() {
  const project = props.project
  const allTasks = project.tasks.length;
  if (allTasks > 0) {
    const doneTasks = project.tasks.filter(task => task.status === 'Done').length;
    return (doneTasks/allTasks) * 100
  }
  else {
    return 0
  }
}

function computeParticipantsCount() {
  return props.project.participants.length
}

function computeTasksCount() {
  return props.project.tasks.length
}

</script>

<template>
  <v-card
    class="align-center"
    height="200"
    width="200"
  >
    <v-toolbar class="card-top">
      <v-spacer />
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            icon="mdi-dots-vertical"
            v-bind="props"
            flat
          />
        </template>
        <v-list>
          <router-link :to="{ name: 'project', params: { id: props.project.id } }">
            <v-list-item
              class="menu-item"
              clickable
            >
              <v-list-item-title>Open</v-list-item-title>
            </v-list-item>
          </router-link>

          <v-list-item
            class="menu-item"
            clickable
          >
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <div class="text-center">
      <v-card-text class="project-name">
        {{ props.project.name }}
      </v-card-text>
      <div class="progress-wrapper">
        <small>Users: {{ computeParticipantsCount() }}</small>
        <small>Tasks: {{ computeTasksCount() }}</small>
        <div class="progress-bar">
          <v-progress-linear
            :model-value="computeProjectCompleteness()"
            class="mb-2"
            bg-color="success"
            color="success"
            height="8"
            rounded
            dense
          />
          {{ computeProjectCompleteness() }}%
        </div>
      </div>
    </div>
  </v-card>
</template>


<style scoped>

h3 {
  color: rgb(219, 219, 219);
}

.menu-item:hover {
  cursor: pointer;
  background-color: rgb(227, 227, 227)
}

.project-name {
  font-size: 20px;
}

.progress-wrapper {
  width: 80%;
  margin: auto;
}

a {
  color: black;
  text-decoration: none;
}

</style>
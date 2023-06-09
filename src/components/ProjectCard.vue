<script setup>
import { defineProps } from "vue";
import router from '../router'


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
    return Math.round((doneTasks/allTasks) * 100)
  }
  return 0
}

function computeParticipantsCount() {
  return props.project.participants.length
}

function computeTasksCount() {
  return props.project.tasks.length
}

</script>

<template>
  <v-btn 
    id="card" 
    class="d-flex align-center justify-center flex-column" 
    stacked 
    @click.stop="router.push({ name: 'project', params: { id: props.project.id } })"
  >
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          id="more"
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
    <div
      id="title"
      class="d-flex align-center"
    >
      {{ props.project.name }}
    </div>
    <div id="stats">
      <div id="subtitle">
        {{ computeParticipantsCount() }} users
      </div>
      <div
        id="progress"
        class="d-flex align-center justify-space-between"
      >
        <div id="progress-bar">
          <v-progress-linear 
            color="success" 
            :model-value="computeProjectCompleteness()" 
            height="5"
            bg-color="darkgrey"
          />
        </div>
        <div id="progress-value">
          {{ computeProjectCompleteness() }}%
        </div>
      </div>
    </div>
  </v-btn>
</template>


<style scoped>

#card {
    width: 22em;
    height: 22em;
    background-color: white;
    color: var(--color-font-grey);
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.15);
    margin: 30px;
}

#card:hover {
    color: black;
}

#more {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
}

#title {
    font-size: 2.8em;
    font-weight: bold;
    /* margin: 10px; */
    height: 80%;
}

#subtitle {
    font-size: 1em;
}

#stats {
  width: 100%;
  height: 20%;

}

#progress {
    width: 80%;
    margin: 10px auto 0 auto;
}

#progress-bar{
    width: 80%;
}

.v-btn {
    text-transform: none;
    letter-spacing: 0;
}

::v-deep(.v-btn__content) {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-evenly;
}

a {
  color: black;
  text-decoration: none;
} 

</style>
<template>
  <v-btn 
    id="card" 
    class="d-flex align-center justify-center flex-column" 
    stacked
    @click="toggleNewProjectForm"
  >
    <v-icon id="icon">
      mdi-plus
    </v-icon>
    <div id="title">
      Add new
    </div>
    <div id="subtitle">
      Create new project
    </div>
  </v-btn>
  <NewProjectForm 
    :is-open="showNewProjectForm"
    @close-form="toggleNewProjectForm"
    @project-created="projectCreatedHandler"
  />
</template>

<script setup>
import { ref } from 'vue'
import NewProjectForm from '../forms/NewProjectForm.vue'

const emit = defineEmits(["projectCreated"]);

const showNewProjectForm= ref(false);
function toggleNewProjectForm() {
    showNewProjectForm.value = !showNewProjectForm.value;
}

function projectCreatedHandler(data) {
    console.log('proj created', data);
    emit("projectCreated", data)
}
</script>

<style scoped>
#card{
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

#icon {
    font-size: 5em;
    margin: 10px;
}

#title {
    font-size: 2.8em;
    font-weight: bold;
}

#subtitle {
    font-size: 1em;
}

.v-btn {
    text-transform: none;
    letter-spacing: 0;
}
</style>

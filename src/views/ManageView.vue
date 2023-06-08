<script setup>
import { ref, computed, reactive, onMounted, watch, toRaw } from "vue";

import { useProjectStore } from "@/stores/project";
import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js";


const props = defineProps({
  id: String,
});

// global project instances and possible taskStatuses
const projectStore = useProjectStore();
let project = ref({})
let projectOwner = reactive({})
let projectParticipants = ref([]) 
let nonParticipatingUsers = ref([]) 

const searchQuery = ref('')

function getProjectOwner() {
    const ownerId = project.owner;
    const ownerData = usersMock.find((user) => user.id === ownerId);
    return ownerData
}

function removeParticipant(participant) {
  nonParticipatingUsers.value.push(participant)
  projectParticipants.value = projectParticipants.value.filter(p => p !== participant)
}

function addParticipant(participant) {
  projectParticipants.value.push(participant)
  nonParticipatingUsers.value = nonParticipatingUsers.value.filter(p => p !== participant)
}


function filterNonParticipating(users) {
  return users.filter((user) => {
    const isMatchingSearch =
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase());

    return isMatchingSearch;
  });
}

// Computed property to store the filtered results
const filteredNonParticipatingUsers = computed(() => {
  return filterNonParticipating(nonParticipatingUsers.value);
});

watch(searchQuery, (newValue) => {
  // Update the filtered results when the search query changes
});

// FETCH THE DATA AND MOUNT HERE ////////////////////////////////////////////////
const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  // GET request here
  // The plan is to GET a project, assign it to Pinia store so it is accessible across =
  // all components which would need it and also create a separate instance for filtartion.
  setTimeout(() => {
    // add ref loaded flag as false at the begenning and true at the end to wait for a data
    projectStore.fetchProject(props.id)
    
    project = projectStore.currentProject

    projectOwner = usersMock.find((user) => user.id === project.owner);
    projectParticipants.value = projectStore.getProjectParticipantsArray.filter((user) => user.id !== projectOwner.id)
    nonParticipatingUsers.value = usersMock.filter((user) => !projectStore.getProjectParticipantsArray.includes(user))
    // console.log(projectParticipants)
    // // project.participants = projectStore.getProjectParticipantsArray.filter((user) => user.id !== p.owner)
  }, 500);
};

onMounted(() => {
  fetchProject();
});
</script>


<template>
  
    <div class="main" v-if="projectStore.isProjectSelected">
      <v-row no-gutters>
        <v-col cols="12" xs="12">
          <v-sheet class="pa-2 title">
            {{ project.name }} Project Settings >>>
          </v-sheet>
        </v-col>
      </v-row>
    <v-row>
        <v-col cols="12" sm="6" xs="12">
            <v-card class="single-card" v-if="project">
                <v-card-title class="small-title">
                    Participants
                </v-card-title>

                <div class="list-row" v-if="projectParticipants">
                    <span class="form-title">
                        {{ getProjectOwner().fullName }}
                    </span>
                    <v-btn
                        variant="plain"
                        icon="mdi-close"
                        class="close-button"
                        color="primary"
                        >
                    OWNER
                    </v-btn>
                </div>
                <div class="list-row" v-for="participant in projectParticipants" :key="participant.id">
                    <span class="form-title">
                        {{ participant.fullName }}
                    </span>
                    <v-btn
                        variant="plain"
                        icon="mdi-close"
                        class="close-button"
                        color="warning"
                        @click="() => removeParticipant(participant)"
                    >
                    Remove
                    </v-btn>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" xs="12">
            <v-card class="single-card" v-if="project">
    <v-card-title class="small-title">
      Other Employees
    </v-card-title>
    <v-text-field v-model="searchQuery" label="Filter Employees" prepend-inner-icon="mdi-magnify"></v-text-field>
    <div class="list-row" v-for="participant in filteredNonParticipatingUsers" :key="participant.id">
      <span class="form-title">
        {{ participant.fullName }}
      </span>
      <v-btn
        variant="plain"
        icon="mdi-close"
        class="close-button"
        color="success"
        @click="() => addParticipant(participant)"
      >
        ADD
      </v-btn>
    </div>
  </v-card>
        </v-col>
    </v-row>
    </div>
</template>

<style scoped>

.single-card {
    padding-bottom: 30px;
}

.title {
  margin-top: 10px;
  color: #5f6e72;
  font-weight: 600;
  font-size: 22px;
}

.small-title {
  margin-top: 10px;
  color: #5f6e72;
  font-weight: 600;
  font-size: 18px;
}

.list-row {
  display: flex;
  align-items: center;
  margin: 0 14px 0 14px;
  border-bottom: solid 1px black;
}

.close-button {
  margin-left: auto;
  margin-right: 10px;
  color: black;
}

.participant {
  font-weight: 400;
  font-size: 16px;
}

</style> 

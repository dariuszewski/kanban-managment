<script setup>
import { ref, computed, reactive, onMounted, watch, onBeforeMount } from "vue";

import { useProjectStore } from "@/stores/project";
import { useAuthStore } from '../stores/useAuthStore'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/components/firebase/config.js'



const props = defineProps({
  id: String,
});

const authStore = useAuthStore()
const projectStore = useProjectStore();  // global project instances and possible taskStatuses
const project = ref({})
const projectOwner = ref({})
const projectParticipants = ref([])
const nonParticipatingUsers = ref([])

onBeforeMount(async () => {
  await projectStore.fetchProject(props.id)
  project.value = projectStore.project
  projectOwner.value = projectStore.project.owner;

  const response = await getDocs(collection(db, 'users'))
  const allUsers = response.docs.map(ref => {
    const data = ref.data()
    return {
      id: ref.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      color: data.color,
    }
  })

  const projectParticipantsIds = projectStore.project.participants.map(p => p.id)

  projectParticipants.value = allUsers.filter(el => projectParticipantsIds.includes(el.id))
  nonParticipatingUsers.value = allUsers.filter(el => !projectParticipantsIds.includes(el.id))
  projectOwner.value = allUsers.find(el => projectStore.project.owner == el.id)
})
const searchQuery = ref('')

function removeParticipant(participant) {
  nonParticipatingUsers.value.push(participant)
  projectParticipants.value = projectParticipants.value.filter(p => p.id !== participant.id)
  projectStore.removeParticipant(participant)
}

function addParticipant(participant) {
  projectParticipants.value.push(participant)
  nonParticipatingUsers.value = nonParticipatingUsers.value.filter(p => p.id !== participant.id)
  projectStore.addParticipant(participant)
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

</script>


<template>
  <div
    v-if="projectStore.isProjectSelected"
    class="main"
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        xs="12"
      >
        <v-sheet class="pa-2 title">
          {{ project.name }} Project Settings >>>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        xs="12"
      >
        <v-card
          v-if="project"
          class="single-card"
        >
          <v-card-title class="small-title">
            Participants
          </v-card-title>

          <div
            v-if="projectParticipants"
            class="list-row"
          >
            <span class="form-title">
              {{ projectOwner.fullName }}
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
          <div
            v-for="participant in projectParticipants"
            :key="participant.id"
            class="list-row"
          >
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
      <v-col
        cols="12"
        sm="6"
        xs="12"
      >
        <v-card
          v-if="project"
          class="single-card"
        >
          <v-card-title class="small-title">
            Other Employees
          </v-card-title>
          <v-text-field
            v-model="searchQuery"
            label="Filter Employees"
            prepend-inner-icon="mdi-magnify"
          />
          <div
            v-for="participant in filteredNonParticipatingUsers"
            :key="participant.id"
            class="list-row"
          >
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
  background: var(--color-background);
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

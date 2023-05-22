<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue';
import projectsMock from '@/projectsMock.js';

const props = defineProps({
  id: String
});

const project = reactive({});

// Filters
const startDate = ref(null);
const endDate = ref(null);
const selectedUsers = reactive([]);
const usernames = ['marco', 'polo'];
// End of filters

const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  setTimeout(() => {
    const p = projectsMock.find((p) => p.id === Number(props.id));
    project.id = p.id;
    project.name = p.name;
    // Update other project properties accordingly
  }, 500);
};

onMounted(() => fetchProject());
</script>

<template>
  <div class="main-wrapper">
    <v-row> 
      <v-col cols="12" md="3" xs="12">
        <v-container class="column-container">
          <span class="toolbar-title">{{ project.name }}</span>
        </v-container>
      </v-col>
    
      <v-divider class="divider" vertical :thickness="2" color="black"></v-divider>

      <v-col cols="12" md="2" sm="5" xs="4">
        <v-container class="column-container">
        <v-text-field
          class="filter-input"
          label="Start Date"
          type="date"
          v-model="startDate"
        ></v-text-field>
        </v-container>
      </v-col>

      <v-col cols="12" md="2" sm="5" xs="4">
        <v-container class="column-container">
          <v-text-field
            class="filter-input"
            label="End Date"
            type="date"
            v-model="endDate"
          ></v-text-field>
        </v-container>
      </v-col>

      <v-col cols="12" md="2" sm="5" xs="4">
        <v-container class="column-container">
          <v-select
            class="filter-input"
            v-model="selectedUsers"
            :items="usernames"
            label="Participants"
            prepend-inner-icon="mdi-account-search"
            multiple
            chips
          ></v-select>
        </v-container>
      </v-col>

      <v-col cols="12" md="2" sm="4" xs="4">
        <v-container class="column-container">
          <v-text-field
            class="filter-input"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            type="text"
            v-model="endDate"
          ></v-text-field>
        </v-container>
      </v-col>
    </v-row>

    <div class="container-wrapper">
      <div class="main-wrapper">
      <v-row>
        <v-col cols="12" md="3" sm="12">
          <v-card>
            <v-card-title>Todo</v-card-title>
            <v-sheet>
              more cards here
            </v-sheet>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <v-card>
            <v-card-title>In progress</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <v-card>
            <v-card-title>Blocked</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <v-card>
            <v-card-title>Done</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-wrapper {
  margin-top: 30px;
  padding: 20px;
  align-content: center;
}

.toolbar-title {
  color: #5F6E72;
  font-size: 26px;
  font-weight: 600;
}

.divider {
  margin: 0 10px;
}

.column-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Fill the entire width */
  height: 100%; /* Fill the entire height */
}

.filter-input {
  min-width: 160px;
  text-align: center;
}
</style>

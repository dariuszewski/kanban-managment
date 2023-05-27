<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import projectsMock from '@/projectsMock.js';

const props = defineProps({
  id: String
});

const project = reactive({});
const tasks = {
  
}

// Filters
const startDate = ref(null);
const endDate = ref(null);
const allParticipants = reactive(['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'])
const selectedParticipants = reactive(['buzz', 'fizzbuzz', 'foobar'])
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

const date = ref();

onMounted(() => {
  fetchProject()
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

</script>


<template>
  <div class="main-wrapper">
    <!-- Header -->
    <div class="header">
      <v-row no-gutters>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-sheet class="pa-2 title">
            {{ project.name }}
          </v-sheet>
        </v-col>
        
        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
              <VueDatePicker 
                v-model="date" 
                :enable-time-picker="false" 
                label="date range"
                input-class-name="dp-custom-input"
                range
              />
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
            <div class="custom-select">
            <v-select
              v-model="selectedParticipants"
              :items="allParticipants"
              class="custom-select"
              label="Participants"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              multiple
              chips
              hide-details
            >
            </v-select>
            </div>
            
          </v-sheet>
        </v-col>

        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
            <v-text-field
              class="filter-input"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="underlined"
              v-model="endDate"
              hide-details
            ></v-text-field>
          </v-sheet>

        </v-col>
      </v-row>
    </div>
    <!-- End Of Header -->
    <v-divider :thickness="2"></v-divider>
    <div class="columns">
      <v-row no-gutters>

        <!-- SINGLE COLUMN -->
        <v-col cols="12" sm="3" xs="12">
          <v-sheet class="pa-2">
            <v-card>
              <v-card-title class="title">
                To do <span class="tasks-count">3</span>
              </v-card-title>
              <v-divider :thickness="2"></v-divider>
              <div class="center-container">
                <v-btn 
                  variant="outlined" 
                  prepend-icon="mdi-plus-circle"
                  density="compact"
                  class="add-task-btn"
                >
                  ADD ITEM
                </v-btn>
              </div>
              <div class="tasks-wrapper">
                <div class="task">
                  <v-card class="task-card">
                    <div class="task-name">Talk to Jenny <span class="task-due-date">24-01-2023</span></div>
                    <div class="task-summary">
                      This is some example task description that should be more descriptive than title and
                    </div>
                      <div class="task-footer">
                        <span class="task-id task-summary">#48</span>
                        <div class="task-owner">
                          <span class="task-owner-name">Jim Helpert</span>
                          <span class="task-owner-initials">JH</span>
                        </div>
                      </div>
                  </v-card>
                </div>
                <div class="task">
                </div>
              </div>
            </v-card>
          </v-sheet>
        </v-col>
        <!-- END OF SINGLE COLUMN -->


        <!-- SINGLE COLUMN -->
        <v-col cols="12" sm="3" xs="12">
          <v-sheet class="pa-2">
            <v-card>
              <v-card-title class="title">
                To do <span class="tasks-count">3</span>
              </v-card-title>
              <v-divider :thickness="2"></v-divider>
              <div class="center-container">
                <v-btn 
                  variant="outlined" 
                  prepend-icon="mdi-plus-circle"
                  density="compact"
                  class="add-task-btn"
                >
                  ADD ITEM
                </v-btn>
              </div>
              <div class="tasks-wrapper">
                <div class="task">
                  <v-card class="task-card">
                    <div class="task-name">Talk to Jenny <span class="task-due-date">24-01-2023</span></div>
                    <div class="task-summary">
                      This is some example task description that should be more descriptive than title and
                    </div>
                      <div class="task-footer">
                        <span class="task-id task-summary">#48</span>
                        <div class="task-owner">
                          <span class="task-owner-name">Jim Helpert</span>
                          <span class="task-owner-initials">JH</span>
                        </div>
                      </div>
                  </v-card>
                </div>
                <div class="task">
                </div>
              </div>
            </v-card>
          </v-sheet>
        </v-col>
        <!-- END OF SINGLE COLUMN -->
        


      </v-row>
    </div>
  </div>
</template>

<style scoped>

  .header {
    margin-top: 10px;
    align-items: center;
    text-align: center;
  }

  .title {
    margin-top: 10px;
    color: #5F6E72;
    font-weight: 600;
    font-size: 22px;
  }

  .columns {
    margin-top: 20px;
  }

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tasks-wrapper {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
  }

  .task {
    margin-bottom: 20px;
    height: 50px;
    width: 80%;
  }

  .task-card {
    background-color: #ECECEC;
    min-height: 100px;
    padding: 10px;
  }

  .task-name {
    font-size: 16px;
    font-weight: bold;
    top: 0;
    left: 0;
  }

  .tasks-count {
    color: #8ba5ac;
    float: right;
    font-size: 26px;
  }

  .task-due-date {
    position: absolute;
    top: 0;
    right: 0;
    margin: 14px;
    font-size: 12px;
    font-weight: 100;
  }

  .task-summary {
    font-size: 10px;
    color: #5F6E72;
    line-height: 1.25;
    font-weight: 100;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; 
  }

  .task-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  .task-id {
    font-size: 10px;
    font-weight: bold;
  }

  .task-owner {
    display: flex;
    align-items: center;
  }

  .task-owner-name {
    margin-right: 8px;
    font-size: 14px;
  }

  .task-owner-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px; /* Double the radius for the width */
    height: 24px; /* Double the radius for the height */
    border-radius: 50%;
    background-color: blue;
    color: white;
    font-weight: bold;
    font-size: 12px;
  }

  .add-task-btn {
    margin: 20px 0 0 0;
    width: 80%;
    border: 1px dashed #5F6E72;
    color: #5F6E72;
    background-color: transparent;
  }

  ::v-deep(.dp-custom-input) {
    height: 48px;
    border: 1px solid white;
    border-bottom: 1px solid #a8a8a8;
    padding-left: 20%;
    font-size: 12px;
  }

  ::v-deep(.dp-custom-input:focus) {
    border-bottom: 2px solid black;
  }

  ::v-deep(.dp-custom-input:hover) {
    border-bottom: 1px solid black;
  }

</style>

<script setup>
import { ref, computed, reactive, onMounted, watch, toRaw } from 'vue'
import BoardPageHeader from "@/components/BoardPageHeader.vue"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import projectsMock from '@/projectsMock.js';
import usersMock from '@/usersMock.js';

const props = defineProps({
  id: String
});

const project = reactive({});

let selectedParticipants = ref([]);
let dateRange = ref();
let searchQuery = ref('');

function filterTasks(status=false) {
  return project.tasks.filter(task => {
    const isWithinDateRange = (!dateRange.value || (Date(task.dueDate) >= Date(dateRange.value[0]) && Date(task.dueDate) <= Date(dateRange.value[1])));
    const isParticipantSelected = selectedParticipants.value.length === 0 || selectedParticipants.value.some(participant => participant.id === task.owner);
    const isMatchingSearch = task.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    if (status) {
      return isWithinDateRange && isParticipantSelected && isMatchingSearch && task.status === status;
    } else {
      return isWithinDateRange && isParticipantSelected && isMatchingSearch;
    }
  });
}

const filteredTodoTasks = computed(() => {
  return filterTasks('todo')
})

function _getTaskOwner(taskOwnerId) {
  return usersMock.filter(user => user.id === taskOwnerId).pop();
}

function getNameAndLastName(taskOwnerId) {
  const owner = _getTaskOwner(taskOwnerId);
  return owner.firstName + ' ' + owner.lastName
}

function getInitials(taskOwnerId) {
  const owner = _getTaskOwner(taskOwnerId);
  return owner.firstName[0] + owner.lastName[0]
}



const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  setTimeout(() => {
    const p = projectsMock.find((p) => p.id === Number(props.id));
    project.id = p.id;
    project.name = p.name;
    project.tasks = p.tasks;
    project.participants = usersMock.filter(user => p.participants.includes(user.id));
  }, 500);
};


onMounted(() => {
  fetchProject()
})

</script>


<template>
  <div class="main-wrapper">

    <BoardPageHeader
      :project="project"
      @update:selectedParticipants="selectedParticipants = $event"
      @update:dateRange="dateRange = $event"
      @update:searchQuery="searchQuery = $event"
    />

    <v-divider :thickness="2"></v-divider>

    <div class="columns">
      <v-row no-gutters>

        <!-- SINGLE COLUMN -->
        <v-col cols="12" sm="3" xs="12">
          <v-sheet class="pa-2">
            <v-card>
              <v-card-title class="title">
                To do <span v-if="project.tasks" class="tasks-count">{{ filteredTodoTasks.length }}</span>
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
              <div v-if="project.tasks" class="tasks-wrapper">
                <div v-for="task in filteredTodoTasks" :key="task.id" class="task">
                  <v-card class="task-card">
                    <div class="task-header">
                      <span class="task-title">{{ task.title }}</span>
                      <span class="task-due-date">{{ task.dueDate }}</span>
                    </div>
                    <div class="task-summary">
                      {{ task.summary }}
                    </div>
                      <div class="task-footer">
                        <span class="task-id task-summary">#{{ task.id }}</span>
                        <div class="task-owner">                          
                          <span class="task-owner-name">{{ getNameAndLastName(task.owner) }}</span>
                          <span class="task-owner-initials">{{ getInitials(task.owner) }}</span>
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
                    <div class="task-header">
                      <span class="task-title">Talk to Jenny</span>
                      <span class="task-due-date">24-01-2023</span>
                    </div>
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

  .task-header {
    display: flex;
  }

  .task-title {
    font-size: 13px;
    font-weight: bold;
    top: 0;
    left: 0;
    flex-basis: 60%;
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
    font-size: 10px;
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
    font-size: 13px;
  }

  .task-owner-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px; /* Double the radius for the width */
    height: 22px; /* Double the radius for the height */
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


</style>

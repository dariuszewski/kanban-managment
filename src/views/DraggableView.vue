<script setup>
import { ref, reactive, onMounted, onBeforeMount, computed, watch, nextTick } from "vue";
import Draggable from "vue3-draggable";


import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js";

const props = defineProps({
  id: String,
});


const project = reactive({});
const tasksStatuses = reactive(["To Do", "In Progress", "Review", "Done"]);

let toDoTasks = ref([]);
let inProgressTasks = ref([]);

function _getTaskOwner(taskOwnerId) {
  return usersMock.filter((user) => user.id === taskOwnerId).pop();
}

function getNameAndLastName(taskOwnerId) {
  const owner = _getTaskOwner(taskOwnerId);
  return owner.firstName + " " + owner.lastName;
}

function getInitials(taskOwnerId) {
  const owner = _getTaskOwner(taskOwnerId);
  return owner.firstName[0] + owner.lastName[0];
}

watch(toDoTasks, () => {
  const columnStatus = 'To Do';
  let newTask = toDoTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });


watch(inProgressTasks, () => {
  const columnStatus = 'In Progress';
  let newTask = inProgressTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });

  // newTasks = newTasks.map((task) => {
  //   task.status = 'In Progress';
  // });

  // if (inProgressTasks.value != newTasks) {
  //   console.log(inProgressTasks.value)
  //   console.log(newTasks)
  //   // inProgressTasks.value = updatedTasks;
  // }

  // // console.log(project.tasks);
  // console.log("Send post request here"); 

const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  setTimeout(() => {
    const p = projectsMock.find((p) => p.id === Number(props.id));
    project.id = p.id;
    project.name = p.name;
    project.tasks = p.tasks;
    project.participants = usersMock.filter((user) =>
      p.participants.includes(user.id)
    );
    toDoTasks.value = project.tasks.filter(task => task.status === 'To Do');
    inProgressTasks.value = project.tasks.filter(task => task.status === 'In Progress');

    console.log('toDoTasks:', toDoTasks.value); // Check the value of toDoTasks
    console.log('inProgressTasks:', inProgressTasks.value); // Check the value of inPr
  }, 500);
};

onMounted(() => {
  fetchProject(); 
});

</script>

<template>
  <div class="main-wrapper">


    <v-col cols="12" sm="3" xs="12" v-if="toDoTasks">
      <v-sheet class="pa-2">
        <v-card class="single-column" v-if="toDoTasks && toDoTasks.length > 0">
          <v-card-title class="title">
            {{ tasksStatuses[0] }}
            <span class="tasks-count">{{ toDoTasks.length }}</span>
          </v-card-title>
          <v-divider :thickness="2"></v-divider>
          <div class="center-container">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-plus-circle"
              density="compact"
              class="add-task-btn"
              text="ADD ITEM"
            >
            </v-btn>
          </div>
            <!-- Tasks go here -->
          <div class="tasks-wrapper">
            <draggable 
              v-model="toDoTasks"
            >
              <template #item="{ item }">
                <div class="task">
                  <v-card class="task-card">
                    <div class="task-header">
                      <span class="task-title">{{ item.title }}</span>
                      <span class="task-due-date">{{ item.dueDate }}</span>
                    </div>
                    <div class="task-summary">
                      {{ item.summary }}
                    </div>
                    <div class="task-footer">
                      <span class="task-id task-summary">#{{ item.id }}</span>
                      <div class="task-owner">
                        <span class="task-owner-name">{{
                          getNameAndLastName(item.owner)
                        }}</span>
                        <span class="task-owner-initials">{{ getInitials(item.owner) }}</span>
                      </div>
                    </div>
                  </v-card>
                </div>
              </template>
            </draggable>
          </div>
        </v-card>
      </v-sheet>
    </v-col>   






    <v-col cols="12" sm="3" xs="12" v-if="inProgressTasks">
      <v-sheet class="pa-2">
        <v-card class="single-column" v-if="inProgressTasks && inProgressTasks.length > 0">
          <v-card-title class="title">
            {{ tasksStatuses[1] }}
            <span class="tasks-count">{{ inProgressTasks.length }}</span>
          </v-card-title>
          <v-divider :thickness="2"></v-divider>
          <div class="center-container">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-plus-circle"
              density="compact"
              class="add-task-btn"
              text="ADD ITEM"
            >
            </v-btn>
          </div>
            <!-- Tasks go here -->
          <div class="tasks-wrapper">
            <draggable 
              v-model="inProgressTasks"
            >
              <template #item="{ item }">
                <div class="task">
                  <v-card class="task-card">
                    <div class="task-header">
                      <span class="task-title">{{ item.title }}</span>
                      <span class="task-due-date">{{ item.dueDate }}</span>
                    </div>
                    <div class="task-summary">
                      {{ item.summary }}
                    </div>
                    <div class="task-footer">
                      <span class="task-id task-summary">#{{ item.id }}</span>
                      <div class="task-owner">
                        <span class="task-owner-name">{{
                          getNameAndLastName(item.owner)
                        }}</span>
                        <span class="task-owner-initials">{{ getInitials(item.owner) }}</span>
                      </div>
                    </div>
                  </v-card>
                </div>
              </template>
            </draggable>
          </div>
        </v-card>
      </v-sheet>
    </v-col>   

  </div>
</template>



<style scoped>

.columns {
  margin-top: 20px;
}

.single-column {
  min-height: 200px;
}

.title {
  margin-top: 10px;
  color: #5f6e72;
  font-weight: 600;
  font-size: 22px;
}

.tasks-count {
  color: #8ba5ac;
  float: right;
  font-size: 26px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-task-btn {
  margin: 20px 0 0 0;
  width: 80%;
  border: 1px dashed #5f6e72;
  color: #5f6e72;
  background-color: transparent;
}

.tasks-wrapper {
  margin: 20px 0 20px 0;
  padding: 0 10% 0 10%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.task {
  margin-bottom: 20px;
}

.task:hover {
  cursor: pointer;
}

.task-card {
  background-color: #ececec;
  min-height: 100px;
  padding: 10px;
}

.task-header {
  display: flex;
}

.task-title {
  font-size: 14px;
  font-weight: bold;
  top: 0;
  left: 0;
  flex-basis: 60%;
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
  color: #5f6e72;
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

.teams {
  display: flex;
  justify-content: center;
  align-items: center;
  widows: 100%;
}

.team {
  border: solid 1px black;
  align-items: center;
}

</style>


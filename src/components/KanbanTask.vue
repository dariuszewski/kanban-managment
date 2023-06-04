<script setup>
import { ref } from 'vue';
import TaskEditForm from '../forms/TaskEditForm.vue'

import usersMock from "@/usersMock.js";


const props = defineProps({
  task: Object,
});

const emit = defineEmits(["taskEdited"])

const showTaskEditForm = ref(false);

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

function handleTaskEdited() {
  emit('taskEdited')
}

const toggleTaskEditForm = () => {
  showTaskEditForm.value = !showTaskEditForm.value;
};

</script>

<template>
  <div class="task">
    <v-card class="task-card">
      <div class="task-header">
        <span class="task-title" @click="toggleTaskEditForm">{{ task.title }}</span>
          <TaskEditForm 
            :task="task"
            :isOpen="showTaskEditForm" 
            @closeForm="toggleTaskEditForm"
            @taskEdited="handleTaskEdited"
          />
        <span class="task-due-date">{{ task.dueDate }}</span>
      </div>
      <div class="task-summary">
        {{ task.summary }}
      </div>
      <div class="task-footer">
        <span class="task-id task-summary">#{{ task.id }}</span>
        <div class="task-owner">
          <span class="task-owner-name">{{
            getNameAndLastName(task.owner)
          }}</span>
          <span class="task-owner-initials">{{ getInitials(task.owner) }}</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.task {
  margin-bottom: 20px;
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

.task-title:hover {
  cursor: pointer;
  text-decoration: underline;
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
</style>

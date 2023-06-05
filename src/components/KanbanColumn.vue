<script setup>
import { ref } from 'vue'
import TaskEditForm from '../forms/TaskEditForm.vue'

const props = defineProps({
  status: String,
  tasksCount: Number,
});

const showTaskEditForm= ref(false);
const emit = defineEmits(["taskEdited"])

function toggleTaskEditForm() {
  showTaskEditForm.value = !showTaskEditForm.value;
  console.log('hello world - ', showTaskEditForm.value)
}

function handleTaskEdited() {
  emit('taskEdited')
}

</script>

<template>
  <v-col cols="12" sm="3" xs="12">
    <v-sheet class="pa-2">
      <v-card class="single-column">
        <v-card-title class="title">
          {{ props.status }}
          <span class="tasks-count">{{ props.tasksCount }}</span>
        </v-card-title>
        <v-divider :thickness="2"></v-divider>
        <div class="center-container">
          <v-btn
            variant="outlined"
            prepend-icon="mdi-plus-circle"
            density="compact"
            class="add-task-btn"
            text="ADD ITEM"
            @click="toggleTaskEditForm"
          >
          </v-btn>
          <TaskEditForm 
            :isOpen="showTaskEditForm" 
            :formType="'Create'"
            :defaultStatus="props.status"
            @closeForm="toggleTaskEditForm"
            @taskEdited="handleTaskEdited"
          />
        </div>
        <div class="tasks-wrapper">
          <!-- Tasks go here -->
          <slot></slot>
        </div>
      </v-card>
    </v-sheet>
  </v-col>
</template>

<style scoped>
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
</style>
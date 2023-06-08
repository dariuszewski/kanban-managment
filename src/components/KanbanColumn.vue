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
    <v-sheet class="pa-3">
      <v-card class="single-column elevation-7 rounded-lg">
        <v-card-title class="title">
          {{ props.status }}
          <span class="tasks-count">{{ props.tasksCount }}</span>
        </v-card-title>
        <v-divider :thickness="1"></v-divider>
        <div class="center-container">
          <v-btn
            variant="outlined"
            prepend-icon="mdi-plus-circle"
            density="compact"
            class="add-task-btn rounded-lg"
            text="ADD ITEM"
            @click="toggleTaskEditForm"
          />
          <TaskEditForm 
            :is-open="showTaskEditForm" 
            :form-type="'Create'"
            :default-status="props.status"
            @closeForm="toggleTaskEditForm"
            @taskEdited="handleTaskEdited"
          />
        </div>
        <div class="tasks-wrapper">
          <!-- Tasks go here -->
          <slot />
        </div>
      </v-card>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.single-column {
  /* min-height: 200px; */
  background: white;
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
  margin: 20px 0 10px 0;
  width: calc(100% - 15px - 15px);
  border: 1px dashed #5f6e72;
  color: #5f6e72;
  background-color: transparent;
  font-weight: bold;
  letter-spacing: 0px;
}

.tasks-wrapper {
  margin: 10px 0;
  padding: 0 15px 0 15px;
  /* min-height: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.v-sheet {
  background: var(--color-background);
}
</style>
<script setup>
import { defineProps, defineEmits, ref, watch, computed, nextTick } from "vue";
import { useProjectStore } from "@/stores/project";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  task: Object,
  isOpen: Boolean,
});

const projectStore = useProjectStore();

function getTaskOwnerById() {
  return projectStore.getProjectParticipantsArray.find(
    (participant) => participant.id === props.task.owner
  );
}

const isOpen = ref(props.isOpen); // is v-dialog opened
let date = ref(new Date(props.task.dueDate)); // selected date
let currentOwner = ref(getTaskOwnerById()); // selected task assignee
let description = ref(props.task.summary); // task details
let selectedStatus = ref(props.task.status); // task status
const statusValues = ["To Do", "In Progress", "Review", "Done"]; // possible values from status change
let menuOpen = ref(true); // state of the status selection dropdown
let confirmDialog = ref(false)

const emit = defineEmits(["closeForm", "taskEdited"]);

function closeForm() {
  emit("closeForm");
  isOpen.value = false;
}

function confirmDelete() {
  confirmDialog.value = true
}

function cancelDelete() {
  confirmDialog.value = false
}
const key = ref(0);
function deleteItem() {
  // send DELETE request here
  projectStore.deleteTask(props.task.id)
  confirmDialog.value = false
  isOpen.value = false
}

async function saveChanges() {
  const year = date.value.getFullYear(); // Get the full year (e.g., 2023)
  const month = String(date.value.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad it with a leading zero if needed
  const day = String(date.value.getDate()).padStart(2, '0'); // Get the day of the month (1-31) and pad it with a leading zero if needed
  const dateString = `${year}-${month}-${day}`; // Combine the year, month, and day into the desired string format

  const updatedTask = {
    id: props.task.id,
    owner: currentOwner.value.id,
    title: props.task.title, 
    summary: description.value,
    dueDate: dateString,
    createdDate: props.task.createdDate,
    status: selectedStatus.value 
  }

  // UPDATE request here
  projectStore.updateTask(props.task.id, updatedTask)
  emit('taskEdited')
  confirmDialog.value = false
  isOpen.value = false
}

watch(
  () => props.isOpen,
  (newValue) => {
    isOpen.value = newValue;
  }
);
</script>

<template>
  <v-dialog
    v-model="isOpen"
    @click:outside="closeForm"
    max-width="728"
    scrollable
  >
    <v-card>
      <div class="form-header">
        <span class="form-title">{{ task.title }}</span>
        <v-btn
          variant="plain"
          icon="mdi-close"
          class="close-button"
          @click="closeForm"
        >
        </v-btn>
      </div>
      <v-card-subtitle class="subtitle-line">
        <span class="task-id">#{{ task.id }}</span>
        <span class="created-date">Created: {{ task.createdDate }}</span>
      </v-card-subtitle>

      <v-form class="taskEditForm">
        <v-row>
          <v-col xs="12">
            <div class="subtitle-line">
              <span class="datepicker-title">Due Date</span>
              <VueDatePicker
                v-model="date"
                :enable-time-picker="false"
                input-class-name="dp-custom-input"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-select
              :items="projectStore.getProjectParticipantsArray"
              item-title="fullName"
              item-value="id"
              v-model="currentOwner"
              label="Assignee"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              density="compact"
              return-object
              chips
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-textarea
              label="Description"
              variant="underlined"
              prepend-icon="mdi-pencil"
              v-model="description"
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="buttons">
          <v-row>
            <v-col cols="12" md="4" xs="12">
              <v-btn
                class="custom-button delete-btn"
                prepend-icon="mdi-delete"
                text
                @click="confirmDelete"
              >
                Delete
              </v-btn>
                <v-dialog v-model="confirmDialog" max-width="300">
                  <v-card>
                    <v-card-title class="headline">Confirm Deletion</v-card-title>
                    <v-card-text>
                      Are you sure you want to delete this item?
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text @click="cancelDelete">Cancel</v-btn>
                      <v-btn color="red" text @click="deleteItem">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-col>

            <v-col cols="12" md="4" xs="12">
              <div class="text-center">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      class="custom-button"
                      prepend-icon="mdi-chevron-down"
                      v-bind="props"
                    >
                      {{ selectedStatus }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in statusValues"
                      :key="index"
                    >
                      <v-list-item-title
                        @click="selectedStatus = item"
                        class="custom-list-item"
                        >{{ item }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <v-btn
                class="custom-button"
                prepend-icon="mdi-floppy"
                @click="saveChanges"  
              >
                <span>SAVE</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  margin: 0 14px 0 14px;
}

.form-title {
  margin-top: 10px;
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  flex-grow: 1;
}

.close-button {
  margin-left: auto;
  color: black;
}

.subtitle-line {
  display: flex;
  flex-direction: column;
}

.task-id,
.created-date {
  line-height: 15px;
  font-weight: 600;
}

.taskEditForm {
  margin: 28px 14px 10px 14px;
}

.datepicker-title {
  font-size: 11px;
  font-weight: 500;
  color: #646464;
}

::v-deep(.dp-custom-input) {
  height: 26px;
  border: 1px solid white;
  border-bottom: 1px solid #a8a8a8;
  font-size: 16px;
}

::v-deep(.dp-custom-input:focus) {
  border-bottom: 2px solid black;
}

::v-deep(.dp-custom-input:hover) {
  border-bottom: 1px solid black;
}

.custom-button {
  width: 100%;
}

.delete-btn {
  color: red;
}

.custom-list-item:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

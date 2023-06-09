<script setup>
import { reactive, ref, watch } from "vue";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/useAuthStore";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  defaultStatus: {
    type: String,
    default: null
  },
  isOpen: Boolean,
  formType: String,
});


const projectStore = useProjectStore();
const userStore = useAuthStore();

function getTaskOwnerById() {
  return projectStore.getProjectParticipantsArray.find(
    (participant) => participant.id === props.task.owner
  );
}

// required data
const isOpen = ref(props.isOpen); // is v-dialog opened
const formType = ref(props.formType)
const statusValues = ["To Do", "In Progress", "Review", "Done"]; // possible values from status change
let menuOpen = ref(true); // state of the status selection dropdown
let confirmDialog = ref(false)

//optional data
let taskTitle = ref(props.task ? props.task.title : null) // task title
let date = ref(props.task ? new Date(props.task.dueDate) : null); // selected date
let currentOwner = ref(props.task ? getTaskOwnerById() : null); // selected task assignee
let description = ref(props.task ? props.task.summary : null); // task details
let selectedStatus = ref(props.task ? props.task.status : props.defaultStatus); // task status

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
async function deleteItem() {
  // send DELETE request here
  projectStore.deleteTask(props.task.id)
  emit('taskEdited')
  confirmDialog.value = false
  isOpen.value = false
}

async function saveChanges() {

  const year = date.value.getFullYear(); // Get the full year (e.g., 2023)
  const month = String(date.value.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad it with a leading zero if needed
  const day = String(date.value.getDate()).padStart(2, '0'); // Get the day of the month (1-31) and pad it with a leading zero if needed
  const dateString = `${year}-${month}-${day}`; // Combine the year, month, and day into the desired string format


  const updatedTask = {
    id: props.task ? props.task.id : 123,
    owner: currentOwner.value.id,
    title: taskTitle, 
    summary: description.value,
    dueDate: dateString,
    timestamp: date.value,
    status: selectedStatus.value,
  }

  console.log('saving task', updatedTask)
 
  if (props.formType === 'Edit') {
      // PUT REQUEST HERE
      projectStore.updateTask(props.task.id, updatedTask)
      emit('taskEdited')
  }
  else {
      // POST REQUEST HERE
      projectStore.insertTask(updatedTask)
      console.log(projectStore.currentProject)
      emit('taskEdited')
  }
  confirmDialog.value = false
  isOpen.value = false
  emit("closeForm");
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
    max-width="728"
    scrollable
    @click:outside="closeForm"
  >
    <v-card>
      <div class="form-header">
        <span class="form-title">
          {{ formType }} Task
        </span>
        <v-btn
          variant="plain"
          icon="mdi-close"
          class="close-button"
          @click="closeForm"
        />
      </div>

      <v-form 
        class="taskEditForm" 
        lazy-validation
      >
        <v-row>
          <v-col sm="12">
            <v-text-field 
              v-model="taskTitle" 
              label="Task Title"
              variant="underlined"
              density="compact"
              prepend-inner-icon="mdi-pencil"
              hide-details
            />
            <small class="alert-msg" v-if="!taskTitle">Task title is required.</small>
            <small v-else><br/></small>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <div class="subtitle-line">
              <span class="datepicker-title">Due Date</span>
              <VueDatePicker
                v-model="date"
                :enable-time-picker="false"
                input-class-name="dp-custom-input"
                required 
              />
            <small class="alert-msg" v-if="!date">Task due date is required.</small>
            <small v-else><br/></small>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-select
              v-model="currentOwner"
              :items="projectStore.getProjectParticipantsArray"
              item-title="fullName"
              item-value="id"
              label="Assignee"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              density="compact"
              return-object
              chips
              hide-details
            />
            <small class="alert-msg" v-if="!currentOwner">Task due date is required.</small>
            <small v-else><br/></small>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-textarea
              v-model="description"
              label="Description"
              variant="underlined"
              prepend-inner-icon="mdi-pencil"
              hide-details=""
            />
            <small class="alert-msg" v-if="!description">Task due date is required.</small>
            <small v-else><br/></small>
          </v-col>
        </v-row>
        <div class="buttons">
          <v-row>
            <v-col
              cols="12"
              md="4"
              xs="12"
            >
              <v-btn
                v-if="formType === 'Edit'"
                class="custom-button delete-btn"
                prepend-icon="mdi-delete"
                text
                @click="confirmDelete"
              >
                Delete
              </v-btn>
              <v-btn
                v-else
                class="custom-button"
                text
                @click="closeForm"
              >
                Cancel
              </v-btn>
              <v-dialog
                v-model="confirmDialog"
                max-width="300"
              >
                <v-card>
                  <v-card-title class="headline">
                    Confirm Deletion
                  </v-card-title>
                  <v-card-text>
                    Are you sure you want to delete this item?
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      @click="cancelDelete"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="red"
                      text
                      @click="deleteItem"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <v-col
              cols="12"
              md="4"
              xs="12"
            >
              <div class="text-center">
                <v-menu>
                  <template #activator="{ props }">
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
                        class="custom-list-item"
                        @click="selectedStatus = item"
                      >
                        {{ item }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="4"
              xs="12"
            >
              <v-btn
                class="custom-button"
                prepend-icon="mdi-floppy"
                @click="saveChanges"
                :disabled="!date || !taskTitle || !currentOwner || !description"
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
  flex-grow: 0.1;
}

.close-button {
  margin-left: auto;
  color: black;
}

.static-data {
  display: flex;
  flex-direction: column;
  color: #868686;
  font-size: 12px;
  font-weight: 500;
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

.alert-msg {
  color: red;
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

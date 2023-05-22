<template>
  <router-link
    :to="path"
    style="text-decoration: none;"
  >
    <v-list-item
      :title="title"
      style="color:#FFF"
    >
      <template #prepend>
        <v-icon
          :icon="icon"
          :class="activityClass" 
        />
      </template>
    </v-list-item>
  </router-link>
</template>

<script setup>
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

  const props = defineProps({
    path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  })

  const activityClass = ref('inactive') 

  const route = useRoute()
  watchEffect(()=> {
    route.path.includes(props.path) ?
      activityClass.value = 'active':
      activityClass.value = 'inactive'
  })
</script>

<style scoped>
  .active {
    color: #4EDAF9;
  }
  .inactive {
    color: #FFF;
  }
</style>
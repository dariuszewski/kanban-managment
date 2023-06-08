<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-avatar
    :size="props.size"
    :style="{ backgroundColor: componentData.color }"
  >
    <span
      class="headline"
      style="font-size: 15px; color: rgb(255, 255, 255);"
    > {{ componentData.initials }}</span>
  </v-avatar>
</template>

<script setup>
  import { onMounted, defineProps, reactive} from 'vue';
  import { db } from '../components/firebase/config'
  import { useAuthStore } from '../stores/useAuthStore';
  import {getDoc, doc} from 'firebase/firestore'
  const props = defineProps({
    size: {
      type: String,
      required: true,
    },
  })
  const componentData = reactive({
    color: '',
    initials: '',
  })
  onMounted(async ()=>{
    const authStore = useAuthStore()
    const resp = await getDoc(doc(db, "users", authStore.currentUser.uid))
    const data = resp.data()
    componentData.initials = data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase()
    componentData.color = data.color
  })

</script>
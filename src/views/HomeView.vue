<script setup lang="ts">
import LoginForm from '@/components/login-form.vue'
import ChatCore from '@/components/chats/chat-core.vue'
import MobileAlert from '@/components/mobile-alert.vue'

const isMobile = ref(false)

const userStore = useUserStore()
const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

onBeforeMount(() => {
  if (breakpoints.isSmaller('tablet')) {
    isMobile.value = true
  }
})
</script>

<template>
  <MobileAlert v-if="isMobile" />
  <template v-else>
    <ChatCore v-if="userStore.currentUser?.id" />
    <LoginForm v-else />
  </template>
</template>

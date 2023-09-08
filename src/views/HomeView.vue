<script setup lang="ts">
const MobileAlert = defineAsyncComponent(() => {
  return import('@/components/mobile-alert.vue')
})

const ChatCore = defineAsyncComponent(() => {
  return import('@/components/chats/chat-core.vue')
})

const LoginForm = defineAsyncComponent(() => {
  return import('@/components/login-form.vue')
})

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
    <Suspense v-if="userStore.currentUser?.id">
      <ChatCore />
    </Suspense>
    <LoginForm v-else />
  </template>
</template>

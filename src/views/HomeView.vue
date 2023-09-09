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
    <div class="bg-white" v-else>
      <LoginForm />
      <div class="w-full flex font-mono pb2">
        <a
          href="https://github.com/kalwabed/ykka-chat"
          class="text-center outline-none c-blue mx-auto inline-flex items-center gap1 focus:(ring-2 ring-blue) bg-white px4 backdrop-blur-8 backdrop-filter bg-opacity-50"
          title="Github repository"
          rel="noopener noreferrer"
          target="_blank"
          ><i class="i-ph:github-logo w4 h4"></i> Github</a
        >
      </div>
    </div>
  </template>
</template>

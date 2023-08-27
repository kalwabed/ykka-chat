<script setup lang="ts">
const { login, createUserSocket } = useUserStore()

const username = ref('')

const submit = async () => {
  const status = await login(username.value)
  await createUserSocket(!status.isAlreadyExist)
  username.value = ''
}
</script>

<template>
  <div class="max-w-64 my8 mx-auto">
    <h1 class="text-3xl leading-loose font-bold">Login to proceed</h1>
    <form data-test="form" @submit.prevent="submit" class="flex flex-col gap2">
      <input
        data-test="username"
        class="b focus:ring p2 rd"
        placeholder="Username"
        type="text"
        v-model="username"
      />
      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
</template>

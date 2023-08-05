<script setup lang="ts">
const { $patch } = useUserStore()
const username = ref('')

const submit = () => {
  console.log(username.value)
  $patch({ username: username.value, id: 'crypto.randomUUID()' })
}
</script>

<template>
  <form data-test="form" @submit.prevent="submit">
    <input data-test="username" type="text" v-model="username" />
    <button class="btn" type="submit">Submit</button>
  </form>
</template>

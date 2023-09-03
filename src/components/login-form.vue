<script setup lang="ts">
const { login, createUserSocket } = useUserStore()

const username = ref('')
const errorMsg = ref('')

const onLogin = async () => {
  const _username = username.value.trim()
  const isValidUsername = new RegExp('^[a-zA-Z0-9]{1,8}$').test(_username)

  if (_username.length === 0) {
    errorMsg.value = 'Usernamenya diisi dulu ya... 😈'
    return
  }

  if (isValidUsername) {
    const status = await login(_username)
    await createUserSocket(!status.isAlreadyExist)
    username.value = ''
    errorMsg.value = ''
  } else {
    errorMsg.value = 'Username nggak boleh aneh-aneh. Simple aja ya. Maksimal 8 karakter'
  }
}
</script>

<template>
  <div class="mx-auto h-full mt64">
    <h1 class="text-4xl leading-relaxed font-bold">Login</h1>
    <p class="c-gray5">Using your favorite username.</p>
    <form data-test="form" @submit.prevent="onLogin" class="flex flex-col gap4 mt4">
      <div role="group" class="flex flex-col w-sm">
        <input
          data-test="username"
          class="b focus:ring-2 transition outline-none p2 rd"
          type="text"
          v-model="username"
        />
        <small class="c-red">{{ errorMsg }}</small>
      </div>
      <button class="btn font-medium transition" type="submit">Let that sink in</button>
    </form>
  </div>
</template>

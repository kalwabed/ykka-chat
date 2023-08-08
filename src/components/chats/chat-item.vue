<script setup lang="ts">
defineProps<{ user: { name: string; username: string; company: { catchPhrase: string } } }>()
</script>

<template>
  <div class="p-4 h-full w-full b-b hover:bg-gray1 transition">
    <div class="flex gap2 justify-between items-center w-full h-12">
      <div class="w-15%">
        <img
          :src="`https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${user.username}`"
          alt="User picture"
          class="rd-full bg-white"
          width="50"
          height="50"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="w-68% flex flex-col">
        <b>{{ user.name }}</b>
        <p class="truncate c-gray5">
          {{ user.company.catchPhrase }}
        </p>
      </div>
      <div class="flex items-end flex-col w-17%">
        <small class="c-gray">2m ago</small>
        <span class="i-ph:checks w6 h6 rd-full c-green"></span>
      </div>
    </div>
  </div>
</template>

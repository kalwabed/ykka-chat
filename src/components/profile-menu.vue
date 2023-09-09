<script setup lang="ts">
import { db } from '@/utils/firebase'
import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '@ark-ui/vue'
import { goOffline } from 'firebase/database'

const userStore = useUserStore()
const chatStore = useChatStore()

const logout = async () => {
  await userStore.clearUserSocket()
  // @ts-ignore
  userStore.currentUser = {}
  chatStore.$reset()
  goOffline(db)
}
</script>

<template>
  <Menu>
    <MenuTrigger>
      <button class="outline-none rd-full focus:ring-2 transition">
        <slot />
      </button>
    </MenuTrigger>
    <Teleport to="body">
      <MenuPositioner class="z20">
        <MenuContent class="bg-red1 outline-none focus:ring-2 rd">
          <MenuItem id="logout">
            <button
              @click="logout"
              class="px4 py1.5 hover:bg-red2 text-sm transition font-semibold flex items-center gap2 text-red9 rd outline-none"
            >
              Logout<i class="i-ph:sign-out"></i>
            </button>
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Teleport>
  </Menu>
</template>

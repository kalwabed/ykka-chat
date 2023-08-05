import { createPinia, setActivePinia } from 'pinia'
import { it, describe, expect, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import ChatInput from '@/components/chat-input.vue'
import ChatList from '../chat-list.vue'

describe('Input chat', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should to be defined', () => {
    expect(ChatInput).toBeDefined()
  })

  it('should render the component', () => {
    const wrapper = mount(ChatInput)
    const input = wrapper.find('[data-test="chat-input"]')
    expect(input).toBeDefined()
  })

  it('should add new message', async () => {
    const wrapper = mount(ChatList)
    const { sendChat } = useChat()

    await sendChat('Test')
    await nextTick()
    await flushPromises()

    expect(wrapper.findAll('[data-test="chat-msg"]')).not.toHaveLength(0)
  })
})

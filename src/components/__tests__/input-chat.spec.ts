import { createPinia, setActivePinia } from 'pinia'
import { it, describe, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

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

  it('add new message with enter', async () => {
    const wrapper = mount(ChatList)
    const input = mount(ChatInput)
    expect(wrapper.findAll('[data-test="chat-msg"]')).toHaveLength(1)

    input.get('[data-test="chat-input"]').setValue('Halo')
    input.get('[data-test="chat-input"]').trigger('keyup.enter')

    await nextTick()
    expect(wrapper.findAll('[data-test="chat-msg"]')).toHaveLength(2)
  })

  it('add new message with submit button', async () => {
    const wrapper = mount(ChatList)
    const input = mount(ChatInput)
    expect(wrapper.findAll('[data-test="chat-msg"]')).toHaveLength(1)

    input.get('[data-test="chat-input"]').setValue('Halo dia')
    input.get('[data-test="submit"]').trigger('click')

    await nextTick()
    expect(wrapper.findAll('[data-test="chat-msg"]')).toHaveLength(2)
  })
})

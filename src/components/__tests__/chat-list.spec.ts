import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import ChatList from '../chat-list.vue'

describe('Chat list', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should to be defined', () => {
    expect(ChatList).toBeDefined()
  })

  it('should render the component', () => {
    const wrapper = mount(ChatList)
    expect(wrapper.text()).toContain('Calon: Albed. Kabar bagaimana?')
  })
})

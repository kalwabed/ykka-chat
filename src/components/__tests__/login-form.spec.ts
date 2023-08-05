import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import LoginForm from '../login-form.vue'

describe('Login form', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should to be defined', () => {
    expect(LoginForm).toBeDefined()
  })

  it('should render the component', () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.find('[data-test="username"]')).toBeDefined()
  })

  it('should store username', async () => {
    const wrapper = mount(LoginForm)
    const input = wrapper.find('[data-test="username"]')
    const form = wrapper.find('[data-test="form"]')
    const { $state } = useUserStore()

    await input.setValue('admin')
    await form.trigger('submit')

    expect($state.username).toEqual('admin')
  })
})

import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import MainPageTest from "@/components/MainPage.vue";

describe('MainPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MainPageTest, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})


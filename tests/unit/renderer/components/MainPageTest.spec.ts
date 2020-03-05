import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import MainPageTest from "@/components/imageUploder/index.vue";

describe('MainPage.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message'
    // const wrapper = shallowMount(MainPageTest, {
    //   propsData: { msg }
    // })
    // expect(wrapper.text()).to.include(msg)
    const wrapper = shallowMount(MainPageTest)

    console.log(wrapper.html())
  })
})




import ScrollNum from './scroll-num-vue/scroll-num-vue.vue';
const ScrollNumVue = {
  install: (Vue, options) => {
    Vue.component(ScrollNum.name, ScrollNum)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.ScrollNum = ScrollNum
  Vue.use(ScrollNum)
}
export default ScrollNumVue;
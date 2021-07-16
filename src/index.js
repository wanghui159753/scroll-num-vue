
import ScrollNum from './scroll-num-vue/scroll-num-vue';
const ScrollNum2 = {
  install: (Vue, options) => {
    Vue.component(ScrollNum.name, ScrollNum)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.ScrollNum = ScrollNum
  Vue.use(ScrollNum)
}
export default ScrollNum2;
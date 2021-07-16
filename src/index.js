
import ScrollNum from './scroll-num/scroll-num';
const ScrollNum = {
  install: (Vue, options) => {
    Vue.component(ScrollNum.name, ScrollNum)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.ScrollNum = ScrollNum
  Vue.use(ScrollNum)
}
export default ScrollNum;
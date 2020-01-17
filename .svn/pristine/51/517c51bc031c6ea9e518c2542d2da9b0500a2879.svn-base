import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// import PerfectScrollbar from 'vue2-perfect-scrollbar'
// import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// Vue.use(PerfectScrollbar)
const el_scrollBar = el => {
  // 在元素上加点私货，名字随便取，确保不会和已有属性重复即可
  if (el.__ps__ instanceof PerfectScrollbar) el.__ps__.update()
  // el上挂一份属性
  else el.__ps__ = new PerfectScrollbar(el, {})
}

Vue.directive('scrollbar', {
  inserted(el, binding) {
    const { arg } = binding
    if (arg === 'table') {
      el = el.querySelector('.el-table__body-wrapper')
      if (!el)
        return console.warn('未发现className为el-table__body-wrapper的dom')
    }
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      const text = 'perfect-scrollbar所在的容器的position属性必须是以下之一：'
      console.error(text + rules.join('、'))
    }
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode) {
    const { arg } = binding
    if (arg === 'table') {
      el = el.querySelector('.el-table__body-wrapper')
      if (!el)
        return console.warn('未发现className为el-table__body-wrapper的dom')
    }
    vnode.context.$nextTick(() => {
      try {
        el_scrollBar(el)
      } catch (error) {
        console.error(error)
      }
    })
  }
})

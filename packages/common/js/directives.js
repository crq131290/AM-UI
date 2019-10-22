export const clickOutside = {
  bind(el, binding) {
    const documentHandler = (e) => {
      if(el.contains(e.target)) return
      if(binding.value.middleware(e,el)){
        binding.value.handler(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    binding.value.events.forEach(event=>{
      document.addEventListener(event, documentHandler)
    })
  },
  update() {},
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

export const getTabWidth = {
  inserted(el,bingding){
    let len = Math.floor((el.offsetWidth-100)/150)
    bingding.value.handler(len)
  }
}

function validate(binding) {
  if (typeof binding.value.handler !== 'function') {
    // eslint-disable-next-line
    console.warn('[Vue-load-more:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}
function throttle (func, wait) {
  let lastTime = null
  let timeout
  return function () {
    let context = this
    let now = new Date()
    // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
    if (now - lastTime - wait > 0) {
      // 如果之前有了定时任务则清除
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(context, arguments)
      lastTime = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        // 改变执行上下文环境
        func.apply(context, arguments)
      }, wait)
    }
  }
}

function debounce (func, wait) {
  let lastTime = null
  let timeout
  return function () {
    let context = this
    let now = new Date()
    // 判定不是一次抖动
    if (now - lastTime - wait > 0) {
      setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    }
    // 注意这里lastTime是上次的触发时间
    lastTime = now
  }
}

export const loadMore = {
  bind(el,binding,vNode){
    if(!validate(binding)) return

    let executor = throttle(binding.value.handler,binding.value.delay)
    function handler(params) {
      let dom = document.querySelector(binding.value.el)
      if(dom.scrollTop + dom.offsetHeight >= dom.scrollHeight-1){
        executor.apply(this,arguments)
      }
    }

    el.__vueLoadMore__ = {
      handler:handler,
      callback:binding.value.handler
    }
    setTimeout(() => {
      let dom = document.querySelector(binding.value.el)
      if(dom){
        dom.onscroll = handler
      }
    }, 1000);
  },
  update: function (el, binding) {
    if (validate(binding)) el.__vueLoadMore__.callback = binding.value.handler
  },
  unbind: function (el, binding, vNode) {
    // Remove Event Listeners
    document.removeEventListener(binding.value.event, el.__vueLoadMore__.handler)
    delete el.__vueLoadMore__
  }
}
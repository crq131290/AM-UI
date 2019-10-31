function validate(binding){
  if(typeof binding.value !== 'function') {
    console.warn(`v-clickOutSide:${binding.expression} is not a function`);
    return false
  }
  return true
}

/**
 * 
 * @param {Dom} vNode virtual node
 * is it on the server 
 */
function isServer(vNode){
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer
}

/**
 * 
 * @param {Dom} el
 * collect all parent Node 
 */
function composedPath (el) {
  var path = []
  while (el) {
    path.push(el)
    if (el.tagName === 'HTML') {
      path.push(document)
      path.push(window)
      return path
    }
    el = el.parentNode
  }
  return path
}

function isPopup(popupItem,elements){
  if(!popupItem || !elements) return false

  try {
    for(var i=0;i<elements.length;i++){
      if(popupItem.contains(elements[i])) return true
      if(elements[i].contains(popupItem)) return false
    }
  } catch (error) {
    return false
  }

  return false
}

function getClickHandle(){
  return 'ontouchstart' in document.documentElement ? 'touchstart' : 'click'
}

module.exports = {
  bind(el,binding,vNode,oldvNode){
    if(!validate(binding)) return

    function handler(e){
      var elements = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target)
      elements && elements.length>0 && elements.unshift(e.target)
      if(el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return
      el.__clickOutside__.cb(e)
    }

    el.__clickOutside__ = {
      handler,
      cb:binding.value
    }
    
    const clickHandler = getClickHandle()
    !isServer(vNode) && document.addEventListener(clickHandler, handler)
  },

  updated(el,binding) {
    el.__clickOutside__.cb = binding.value
  },

  unbind(el,binding,vNode){
    const clickHandler = getClickHandle()
    !isServer(vNode) && document.removeEventListener(clickHandler,el.__clickOutside__.handler)
    delete el.__vueClickOutside__
  }

}
/**
 * @param {string} tag
 * @return {HTMLElement}
 * */
function querySelector(tag) {
  return document.querySelector(tag) || null
}

/**
 * @param {Document | HTMLElement | Window} target
 * @param {keyof HTMLElementEventMap} type
 * @param {Function} handler
 * @return {Function}
 * */
function bindHandler(target, type, handler) {
  target.addEventListener(type, handler)
  return () => target.removeEventListener(type, handler)
}

function debounce(fn, wait = 300) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      clearTimeout(timer)
      timer = null
    }, wait)
  }
}

function throttle(fn, wait = 300) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

function pickFromObj (obj, keyList) {
  let res = {}
  keyList.forEach(k => {
    res[k] = obj[k]
  })
  return res
}

function mousewheel(callback) {
  /**
   * @param {WheelEvent} e
   * */
  function mousewheelHandler(e) {
    callback(e.wheelDelta > 0)
  }

  document.addEventListener('mousewheel', mousewheelHandler)
  return () => {
    document.removeEventListener('mousewheel', mousewheelHandler)
  }
}

function createPagination(total, current, paginationSelector) {
  paginationSelector = typeof paginationSelector === 'string' ? querySelector(paginationSelector) : paginationSelector
  if (!paginationSelector) return
  const fragment = document.createDocumentFragment()
  const ul = document.createElement('ul')
  ul.classList.add('pagination-wrapper')
  fragment.appendChild(ul)
  for (let i = 0; i < total; i++) {
    const li = document.createElement('li')
    li.classList.add('pagination-item')
    ul.appendChild(li)
  }
  paginationSelector.appendChild(fragment)
}

/**
 * @param {number} start
 * @param {number} target
 * @param {number} duration
 * */
function scrollToPos(start, target, duration = 800) {
  if (start === target) return;
  if (start < target) {
    if (target - start < 0.4 || duration === 0) {
      const {
        transitionEnd
      } = this.on || {}

      if (transitionEnd && typeof transitionEnd === "function") {
        transitionEnd(pickFromObj(this.options, ['el', 'children', 'count', 'scrollTop']) || {})
      }
      window.scrollTo(0, target)
      return
    }
    start += (target - start) / (duration / 100)
  }
  if (start > target) {
    if (start - target < 0.4 || duration === 0) {
      window.scrollTo(0, target)
      return;
    }
    start -= (start - target) / (duration / 100)
  }
  window.requestAnimationFrame(() => scrollToPos.call(this, start, target, duration))
  window.scrollTo(0, start)
}

/**
 * @param {HTMLElement | HTMLElement[] | Element | Element[] | any} el
 * @param {string} styleSheet
 * */
function setStyle(el, styleSheet) {
  if (Array.isArray(el)) {
    el.forEach(e => {
      e.style.cssText = styleSheet
    })
  } else {
    el.style.cssText = styleSheet
  }
}

/**
 *  @desc
 *  第一次采用 translate3d 实现，mac chrome 下有闪烁的问题，未解决
 *  第二版用 window.scrollTo 实现，也存在问题，首页的动画有的很耗费性能，消耗峰值时候，滚动也会收到影响
 * */
function createSwiper() {
  setTimeout(() => {
    window.scrollTo(0, 0)
  })

  const resizeHandler = throttle((e) => {
    const options = createSwiper.options
    options.height = window.innerHeight
    setStyle(options.children, css('', {
      height: `${options.height}px`
    }).renderStyle())


    let oldScrollTop = options.scrollTop || 0

    scrollToPos.call(options, oldScrollTop, options.height * options.count, 0)

    options.scrollTop = options.height * (options.count)

  })

  bindHandler(window, 'resize', resizeHandler)

  /**
   * @param {{el: string | HTMLElement, duration: number, pagination: string | HTMLElement, on: {
   *   transitionStart: Function,
   *   transitionEnd: Function,
   *  }}} options
   * */
  function swiper(options) {
    options.el = querySelector(options.el)
    if (!options.el) return
    createSwiper.options = options
    const {
      duration = 800
    } = options

    const {
      transitionStart,
    } = options.on ? options.on : {}

    const wrapper = options.el.children[0]
    const swiperSliderList = wrapper.children
    options.children = Array.from(swiperSliderList)
    options.height = swiperSliderList[0].offsetHeight

    function initialSwiperSlideHeight() {
      for (let item of swiperSliderList) {
        item.style.cssText = `height: ${options.height}px`
      }
    }

    initialSwiperSlideHeight()

    let count = 0
    let scrollTop = 0

    const callback = debounce(function (up) {
      if (count >= swiperSliderList.length - 1 && !up) return
      if (count === 0 && up) return
      scrollTop = options.scrollTop || scrollTop
      if (!up) {
        count++
        scrollTop += options.height
      } else {
        count--
        scrollTop -= options.height
      }

      options.count = count
      options.scrollTop = scrollTop

      if (transitionStart && typeof transitionStart === 'function') {
        transitionStart(pickFromObj(options, ['el', 'children', 'count', 'scrollTop']))
      }

      scrollToPos.call(options, window.scrollY, scrollTop, duration)
    })

    mousewheel(callback)

  }


  return {
    swiper
  }


  // createPagination(swiperSliderList.length, count, options.pagination)


  // function transitionEndHandler(e) {
  //   if (e.target !== wrapper) return
  //   if (transitionEnd && typeof transitionEnd === 'function') {
  //     transitionEnd(count, e)
  //   }
  //   wrapper.style.cssText = `transform: translate3d(0, ${scrollTop}px, 0); transition-duration: 0ms;`
  // }

  // bindHandler(wrapper, 'transitionend', transitionEndHandler)
}

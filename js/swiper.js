/**
 * @param {string} tag
 * @return {HTMLElement}
 * */
function querySelector(tag) {
  return document.querySelector(tag) || null
}

// 向上滚动 true；向下滚动，false
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

/**
 * @param {HTMLElement | Window} target
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
 * @param {{el: string, duration: number, pagination: string | HTMLElement, on: {
 *   transitionStart: Function,
 *   transitionEnd: Function,
 *  }}} options
 * */
function createSwiper(options) {
  const el = querySelector(options.el)
  if (!el) return
  // 自动滚动到顶部
  setTimeout(() => {
    window.scrollTo(0, 0)
  })
  const {
    duration = 800
  } = options

  const {
    transitionStart,
    transitionEnd
  } = options.on ? options.on : {}

  const wrapper = el.children[0]
  const swiperSliderList = wrapper.children
  let height = swiperSliderList[0].offsetHeight

  function initialSwiperSlideHeight() {
    for (let item of swiperSliderList) {
      item.style.cssText = `height: ${height}px`
    }
  }

  initialSwiperSlideHeight()

  wrapper.style.cssText = `transform: translate3d(0, 0, 0)`

  let count = 0
  let resultHeight = 0
  const callback = debounce(function (up) {
    if (count >= swiperSliderList.length - 1 && !up) return
    if (count === 0 && up) return
    if (!up) {
      count++
      resultHeight -= height
    } else {
      count--
      resultHeight += height
    }
    if (transitionStart && typeof transitionStart === 'function') {
      transitionStart(count)
    }
    wrapper.style.cssText = `transform: translate3d(0, ${resultHeight}px, 0); transition-duration: ${duration}ms;`
  })
  mousewheel(callback)
  createPagination(swiperSliderList.length, count, options.pagination)


  const resizeHandler = throttle((e) => {
    height = window.innerHeight
    initialSwiperSlideHeight()
  })

  bindHandler(window, 'resize', resizeHandler)

  function transitionEndHandler(e) {
    if (e.target !== wrapper) return
    if (transitionEnd && typeof transitionEnd === 'function') {
      transitionEnd(count, e)
    }
    wrapper.style.cssText = `transform: translate3d(0, ${resultHeight}px, 0); transition-duration: 0ms;`
  }

  bindHandler(wrapper, 'transitionend', transitionEndHandler)
}

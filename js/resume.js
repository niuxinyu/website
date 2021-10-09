function isPC() {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc
  };
}

//环境判断中如果加入ipad会导致判断为手机环境而出现问题,为了能够在iPad Pro下显示并且正常滑动，可以在换进判断中
//讲iPad 和 iPad Pro 排除
function isIE() {
  return !!(window.ActiveXObject || "ActiveXObject" in window)
}

function initStyle() {
  const {css} = createCssRender()
  css('*', {
    margin: 0,
    padding: 0
  }).mountStyle()
  css('button', {
    backgroundColor: 'transparent',
    outline: 'none'
  }).mountStyle()
  css('.top_bar', {
    height: '100px'
  }).mountStyle()
}

function initWelcome() {
  let changedPos = {
      X: 0,
      Y: 0,
      CX: 0,
      CY: 0
    },
    a = {
      X: changedPos.X,
      Y: changedPos.Y,
      CX: changedPos.CX,
      CY: changedPos.CY
    },
    timer,
    isLeave = false,
    animationId

  const welcome = $(".js-tilt-container")

  // polyfill https://github.com/darius/requestAnimationFrame
  // todo
  function setImgShadowStyle() {
    a.CY += ((changedPos.Y - a.CY) / 12) | 0
    a.CX += ((changedPos.X - a.CX) / 12) | 0
    imgShadow.css({
      transform: "scale(1.03) translate(" + .05 * a.CX + "px, " + .05 * a.CY + "px) rotateX(" + .05 * a.CY + "deg) rotateY(" + .05 * a.CX + "deg)"
    })
    if (animationId) cancelAnimationFrame(animationId)
    animationId = requestAnimationFrame(startAnimation)
  }


  function startAnimation() {
    animationId = requestAnimationFrame(() => {
      setImgShadowStyle()
    })
  }

  welcome.on('mouseenter', () => {
    startAnimation()
  })

  welcome.on("mousemove", function (e) {
    changedPos.X = (e.pageX - $(this).offset().left - welcome.width() / 2) | 0
    changedPos.Y = (e.pageY - $(this).offset().top - welcome.height() / 2) | 0
  })
  welcome.on("mouseleave", function (i) {
    changedPos.X = changedPos.CX
    changedPos.Y = changedPos.CY
  })

  const mask = $(".mask")
  const imgShadow = $(".image-shadow")
  mask.on("mouseenter", function () {
    imgShadow.css({
      boxShadow: "0 0 30px 5px #000"
    })
    imgShadow.addClass("in")
  })
  mask.on("mouseleave", function () {
    $(".image-shadow").css({
      boxShadow: "0 0 0 0 "
    })
  })
}

function init() {
  $('body').addClass('loaded')
  // $('#loader-wrapper .load_title').remove()
  initWelcome()
}

function initSwiper() {
  const {
    swiper
  } = createSwiper()
  swiper({
    el: '#pc',
    // pagination: '.swiper-pagination'
    on: {
      transitionStart (o) {
        console.log(o);
      }
    }
  })


  // new Swiper('#pc', {
  //   direction: "vertical",
  //   preventLinksPropagation: true,
  //   slidesPerView: 1,
  //   mousewheel: !0,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: !0
  //   },
  //   speed: 800,
  //   simulateTouch: !1,
  //   on: {
  //
  //   }
  // })

  // circleChart.js https://github.com/TheBolliwood/circleChart
  $(".circleChart#0").circleChart({
    size: 300,
    value: 80,
    text: 0,
    startAngle: -20,
    color: "#4285F4",
    onDraw: function (i, s) {
      s.text(Math.round(s.value) + "%")
    }
  })
  $(".circleChart#1").circleChart({
    size: 300,
    value: 75,
    text: 0,
    color: "#EA4335",
    startAngle: -20,
    onDraw: function (i, s) {
      s.text(Math.round(s.value) + "%")
    }
  })
  $(".circleChart#2").circleChart({
    size: 300,
    value: 60,
    text: 0,
    color: "#FBBC05",
    startAngle: -20,
    onDraw: function (i, s) {
      s.text(Math.round(s.value) + "%")
    }
  })
  $(".circleChart#3").circleChart({
    size: 300,
    value: 70,
    text: 0,
    color: "#34A853",
    startAngle: -20,
    onDraw: function (i, s) {
      s.text(Math.round(s.value) + "%")
    }
  })
}

window.onload = function () {
  init()
  initSwiper()
}



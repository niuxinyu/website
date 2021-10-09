const {
  css
} = createCssRender()
const h = document.documentElement

const rootStyleVariable = `
--first-z: 100;
--second-z: 1000;
--biggest-z: 1002;
`
h.style.cssText = rootStyleVariable

// reset style
css('html,body', {
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  },
  [
    css('button', {
      backgroundColor: 'transparent'
    }),
    css('ul', {
      listStyle: 'none'
    }),
    css('a', {
      textDecoration: 'none',
      listStyle: 'none'
    })
  ]).mountStyle('reset-style')

// font-family
css('@font-face', {
  fontFamily: 'SketchFineSerif',
  src: 'url(../font/SketchFineSerif.otf)'
}).mountStyle('font-family')

// animation
css('@-webkit-keyframes spin', {
  '0%': {
    transform: 'rotate(0)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
}).mountStyle('animation')

// loading style
css('#loading', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 'var(--biggest-z)'
}, [
  css('#loading-progress', {
    position: 'absolute',
    left: '50%',
    top: '50%',
    display: 'block',
    width: '150px',
    height: '150px',
    margin: '-75px 0 0 -75px',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    animation: 'spin 2s linear infinite',
  }),
  css('#loading-progress::before', {
    content: "",
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '5px',
    bottom: '5px',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    animation: 'spin 3s linear infinite'
  }),
  css('#loading-progress::after', {
    content: "",
    position: 'absolute',
    top: '15px',
    left: '15px',
    right: '15px',
    bottom: '15px',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    animation: 'spin 1.5s linear infinite'
  }),
  css('.loading-title', {
    fontFamily: 'Open Sans',
    color: '#fff',
    fontSize: '19px',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: '66%',
    opacity: 1,
    lineHeight: '30px'
  }),
  css('.loading-section', {
    position: 'absolute',
    top: 0,
    width: '51%',
    height: '100%',
    background: '#a5bdbd',
    transform: 'translateX(0)'
  }),
  css('.loading-section.section-left', {
    left: 0
  }),
  css('.loading-section.section-right', {
    right: 0
  })
]).mountStyle()
css('.loaded', {}, [
  css('#loading', {
    visibility: 'hidden',
    transform: 'translateY(-100%)',
    transition: 'all .3s 1s ease-out'
  }, [
    css('#loading', {
      transition: 'all .3s ease-out'
    }),
    // css('#loading-progress', {
    //   animation: 'none'
    // }),
    // css('#loading-progress::before', {
    //   animation: 'none'
    // }),
    // css('#loading-progress::after', {
    //   animation: 'none'
    // }),
    css('.section-left', {
      transition: 'all .7s .3s cubic-bezier(.645, .045, .355, 1)'
    }),
    css('section-right', {
      transition: 'all .7s .3s cubic-bezier(.645, .045, .355, 1)'
    })
  ])
]).mountStyle()

// top bar
css('.top_bar', {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '26px',
    zIndex: 'var(--first-z)'
  },
  [
    css('.head_pic', {
      display: 'flex',
      width: '230px',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ddd',
      backgroundColor: 'rgba(255,255,255,.4)',
      borderRadius: '5px',
      marginLeft: '20px'
    }, [
      css('.head_info', {
        fontSize: '20px',
        color: '#fff',
        fontWeight: 700,
      }, [
        css('span', {
          padding: '5px 15px',
          color: '#000',
          fontSize: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px'
        }),
        css('i', {
          fontWeight: 400,
          fontStyle: 'normal'
        })
      ]),
      css('img', {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        marginRight: '8px',
        border: '1px solid #666'
      })
    ]),
    css('.music_player', {
      marginRight: '3%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    }, [
      css('.music_pic', {
          position: 'relative',
          width: '50px',
          height: '50px',
          backgroundImage: 'url(../images/music_bg.png)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
          borderRadius: '50%',
          boxShadow: '0 0 20px #fff'
        }, [
          css('.music_control', {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
            width: '50%',
            height: '25px',
            background: `url(../images/播放.png) left top no-repeat`,
            backgroundSize: '100% 100%',
            transition: 'opacity .5s ease'
          }),
          css('.music_control:hover', {
            opacity: 1
          })
        ],
      )
    ])
  ]
).mountStyle()

css('.mask', {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(218,218,218,.35)',
  zIndex: 'var(--second-z)'
}).mountStyle()

// swiper
const swiperBgc = [
  ['.show2', 'url(../images/bg/bg-2.jpg)'],
  ['.show3', 'url(../images/bg/bg-3.jpg)'],
  ['.show4', 'url(../images/bg/bg-4.jpg)'],
  ['.show5', 'url(../images/bg/bg-5.jpg)']
]
/**@type CSSStyleDeclaration*/
const swiperMaskCommonStyle = {
  // position: 'absolute',
  // left: 0,
  // top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(86,83,100,.7)'
}
css('#pc', {}, [
    css('.bg', {}),
    css('.box', {
      width: '100%',
      height: '100%',
      padding: '50px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, [
      css('.image-shadow', {
        width: '700px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        textAlign: 'center'
      }, [
        css('.wel_info', {
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          color: '#000',
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundPosition: 'center'
        }, [
          css('.welcome', {
            fontSize: '80px',
            fontFamily: 'SketchFineSerif'
          }),
          css('span', {
            fontSize: '20px',
            letterSpacing: '2px',
            marginTop: '10px'
          })
        ])
      ])
    ]),
    css('.qq_mail a', {
      color: '#a93a3a',
      listStyle: 'none',
      outline: 0
    }),
    css('.js-tilt-container', {
      transition: 'box-shadow .1s ease',
      transform: 'rotateX(0) rotateY(0)',
      transformStyle: 'preserve-3d'
    }),
    ...swiperBgc.map(i => css(i[0], {
      backgroundImage: i[1]
    }, [
      css(i[0] + '_mask', swiperMaskCommonStyle)
    ])),
    css('.main_con', {
      width: '900px',
      height: '400px',
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-450px',
      marginTop: '-200px'
    }),
    css('.left_img', {
      width: '200px',
      height: '200px',
      position: 'relative',
      top: '-50px',
      // opacity: 0,
      opacity: 1,
      transition: 'all ease .5s',
      margin: '0 auto',
      overflow: 'hidden'
    }),
    css('.left_img img', {
      width: '200px',
      height: '200px',
      borderRadius: '50%'
    }),
    css('.right_info', {
      margin: '50px auto 0',
      width: '100%',
      height: '150px',
      fontFamily: 'Microsoft Yahei',
      fontSize: '20px',
      lineHeight: '50px',
      color: '#fff',
      fontWeight: 'lighter',
      position: 'relative',
      top: '-50px',
      transition: 'all ease 1s',
      textAlign: 'center'
    }),
    // page3
    css('#skill_content', {
      position: 'absolute',
      color: '#fff',
      margin: '0 150px'
    }),
    css('.skill_title', {
      textAlign: 'center',
      marginTop: '50px',
      width: '100%',
      height: '60px'
    }),
    css('#skill_info', {
      margin: '25px auto',
      width: '100%',
      lineHeight: '30px'
    }, [
      css('p', {
        textAlign: 'center'
      })
    ]),
    css('#skill_list', {
      width: '100%',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center'
    }, [
      css('ul', {
        listStyle: 'disc',
        listStylePosition: 'inside'
      })
    ]),
    css('.skill_html, .skill_css, .skill_js, .skill_jq', {
      margin: '10px 25px 0',
      width: '200px'
    }),
    css('.circleChart_canvas', {
      width: '200px',
      height: '200px'
    }),
    css('.circleChart_text', {
      lineHeight: '200px !important',
      fontSize: '20px !important'
    }),
    css('.ie_skill_list', {
      display: 'none'
    }),
    // page4
    css('.demo', {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%, -50%, 0)'
    }),
    css('.demo p', {
      margin: '0 auto 5%',
      borderTop: '4px solid #337ab7',
      // opacity: 0
    }),
    css('.demo_head_p p', {
      width: '80px',
      opacity: 1,
      borderTop: '4px solid #337ab7'
    }),
    css('.slide_con', {
      position: 'relative',
      width: '800px',
      height: '400px',
      margin: '0 auto'
    }),
    css('.slide_list', {
      position: 'relative',
      height: '450px',
      borderBottom: '1px solid #f5f5f5',
      overflow: 'hidden'
    }),
    css('.slide_wrapper', {
      width: '5000px',
      height: '450px',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      transform: 'translate3d(-800px, 0, 0)'
    }),
    css('.slide', {
      float: 'left',
      width: '800px',
      height: '100%',
      minHeight: '1px'
    }, [
      css('span', {
        color: '#fff',
        fontSize: '30px',
        display: 'block',
        textAlign: 'center'
      }),
      css('.slide_pic', {
        textAlign: 'center'
      }),
      css('.slide_pic img', {
        width: '100%',
        height: '400px',
        transition: 'opacity ease .2s'
      })
    ]),
    css('.prev', {
      position: 'absolute',
      left: '5px',
      top: '50%',
      cursor: 'pointer',
      borderWidth: '38.5px 34px 38.5px 0',
      borderColor: 'transparent #666 transparent transparent',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      // zIndex: 1,
      transform: 'translate3d(0, -50%, 0)'
    }),
    css('.next', {
      position: 'absolute',
      right: '5px',
      top: '50%',
      cursor: 'pointer',
      borderWidth: '38.5px 0 38.5px 34px',
      borderColor: 'transparent transparent transparent #666',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      // zIndex: 1,
      transform: 'translate3d(0, -50%, 0)'
    }),
    // page 5
    css('.contact_me', {
      width: '500px',
      height: '460px',
      left: '50%',
      top: '50%',
      position: 'absolute',
      margin: '-200px 0 0 -250px'
    }),
    css('.clear', {
      clear: 'both',
      overflow: 'hidden'
    }),
    css('.foot_border', {
      width: '488px',
      height: '30px',
      borderBottom: '6px solid #ffd200',
      borderRight: '6px solid #ffd200',
      borderLeft: '6px solid #ffd200',
      position: 'absolute',
      bottom: '0'
    }),
    css('.info', {
      position: 'absolute',
      width: '400px',
      height: '400px',
      left: '50px',
      top: '30px'
    }),
    css('.en_info', {
      width: '370px',
      height: '100px',
      marginLeft: '18px',
      borderBottom: '1px solid #ffd200',
      overflow: 'hidden'
    }, [
      css('.p1', {
        color: '#ffd200',
        fontSize: '40px',
        fontFamily: 'Microsoft Yahei',
        fontWeight: 800,
        width: '204px',
        lineHeight: '70px',
        float: 'left'
      }),
      css('.p2', {
        color: '#fff',
        width: '160px',
        marginLeft: 0,
        fontSize: '40px',
        fontFamily: 'Microsoft Yahei',
        fontWeight: 800,
        lineHeight: '70px',
        float: 'left'
      })
    ]),
    css('.cn_info', {
      width: '400px',
      height: 'auto',
      margin: '0 auto',
      textAlign: 'center'
    }, [
      css('.p3', {
        marginTop: '10px',
        height: '50px',
        lineHeight: '50px'
      }, [
        css('em', {
          fontSize: '24px',
          fontFamily: 'Microsoft Yahei',
          fontStyle: 'normal',
          padding: '0 24px'
        })
      ]),
      css('.p4', {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '18px',
        color: '#fff',
        fontFamily: 'Microsoft Yahei',
        lineHeight: '45px'
      }),
      css('.p3_1', {
        color: '#e3723c'
      }),
      css('.p3_2', {
        color: '#84c800'
      }),
      css('.p3_3', {
        color: '#3cf'
      }),
      css('.p3_4', {
        color: '#f63'
      })
    ]),
    css('.contact_', {
      width: '370px',
      height: 'auto',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-evenly'
    }, [
      css('img', {
        width: '34px',
        height: '34px',
        borderRadius: '50%'
      }),
      css('img:hover', {
        width: '34px',
        height: '34px',
        border: '1px solid #fff'
      }),
      css('img:hover+.github', {
        opacity: 1
      }),
      css('img:hover+.phone', {
        opacity: 1
      }),
      css('img:hover+.qq', {
        opacity: 1
      }),
      css('img:hover+.wechat', {
        opacity: 1
      }),
      css('img:hover+.wechat', {
        opacity: 1
      }),
      css('img:hover+.email', {
        opacity: 1
      }),
      css('span', {
        opacity: 0,
        width: '58px',
        height: '30px',
        backgroundColor: '#337ab7',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '12px',
        position: 'absolute',
        left: '-12px',
        top: '-40px',
        textAlign: 'center',
        lineHeight: '30px',
        transition: 'all 1s ease'
      }),
      css('span:after', {
        content: '',
        position: 'absolute',
        right: '16px',
        width: '0',
        height: '0',
        borderLeft: '12px solid transparent',
        borderTop: '12px solid #337ab7',
        borderRight: '12px solid transparent',
        top: '25px',
        borderRadius: '2px'
      }),
      css('div', {
        width: '36px',
        height: '36px',
        position: 'relative'
      }),
      css('.qq', {
        position: 'absolute',
        width: '138px',
        height: '150px',
        left: '-55px',
        top: '-170px',
        border: '2px solid #337ab7',
        background: 'url(../images/qq.png) left top no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }),
      css('.qq::after', {
        content: '',
        position: 'absolute',
        right: '55px',
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderTop: '12px solid #337ab7',
        borderRight: '12px solid transparent',
        top: '150px',
        borderRadius: '2px'
      }),
      css('.wechat', {
        position: 'absolute',
        width: '138px',
        height: '150px',
        left: '-55px',
        top: '-170px',
        border: '2px solid #337ab7',
        background: 'url(../images/wx.png) left top no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }),
      css('.wechat::after', {
        content: "",
        position: 'absolute',
        right: '55px',
        width: '0',
        height: '0',
        borderLeft: '12px solid transparent',
        borderTop: '12px solid #337ab7',
        borderRight: '12px solid transparent',
        top: '150px',
        borderRadius: '2px'
      })
    ])
  ]
).mountStyle()

// page1, page2,page3.page4.page5
/**@type CSSStyleDeclaration*/
const swiperCommonStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  backgroundSize: 'cover',
}

// swiper pages
css('.show1, .show2, .show3, .show4, .show5', swiperCommonStyle).mountStyle()
css('.show1', {
  overflow: 'hidden'
}).mountStyle()

// swiper pagination
css('#pc_but', {
    position: 'fixed',
    top: '50%',
    right: '20px',
    transform: 'translate3d(0, -50%, 0)'
  },
  [
    css('.pagination-wrapper', {
        display: 'flex',
        flexDirection: 'column'
      }, [
        css('.pagination-item', {
          width: '10px',
          height: '10px',
          border: '1px solid #000',
          backgroundColor: '#000',
          borderRadius: '50%',
          margin: '10px 0',
          cursor: 'pointer'
        })
      ]
    )
  ]).mountStyle()

// mobile
css('#mobile', {
  display: 'none'
}).mountStyle()



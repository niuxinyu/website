const {
  css,
} = createCssRender();
const h = document.documentElement;

const rootStyleVariable = `
--first-z: 100;
--second-z: 1000;
--biggest-z: 1002;
`;
h.style.cssText = rootStyleVariable;

// reset style
css('html, body, body *', {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  [
    css('body', {
      overflow: 'hidden',
    }),
    css('button', {
      backgroundColor: 'transparent',
    }),
    css('ul', {
      listStyle: 'none',
    }),
    css('a', {
      textDecoration: 'none',
      listStyle: 'none',
    }),
  ]).mountStyle('reset-style');

// font-family
css('@font-face', {
  fontFamily: 'SketchFineSerif',
  src: 'url(./font/SketchFineSerif.otf)',
}).mountStyle('font-family');

// animation
css('@-webkit-keyframes spin', {
  '0%': {
    transform: 'rotate(0)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
}).mountStyle('animation');

// loading style
css('#loading', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 'var(--biggest-z)',
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
    content: '',
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '5px',
    bottom: '5px',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    animation: 'spin 3s linear infinite',
  }),
  css('#loading-progress::after', {
    content: '',
    position: 'absolute',
    top: '15px',
    left: '15px',
    right: '15px',
    bottom: '15px',
    borderRadius: '50%',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    animation: 'spin 1.5s linear infinite',
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
    lineHeight: '30px',
  }),
  css('.loading-section', {
    position: 'absolute',
    top: 0,
    width: '51%',
    height: '100%',
    background: '#a5bdbd',
    transform: 'translateX(0)',
  }),
  css('.loading-section.section-left', {
    left: 0,
  }),
  css('.loading-section.section-right', {
    right: 0,
  }),
]).mountStyle('loading');


css('.loaded', {}, [
  css('#loading', {
    visibility: 'hidden',
    transform: 'translateY(-100%)',
    transition: 'all .3s 1s ease-out',
  }, [
    css('#loading', {
      transition: 'all .3s ease-out',
    }),
    css('.section-left', {
      transition: 'all .7s .3s cubic-bezier(.645, .045, .355, 1)',
    }),
    css('section-right', {
      transition: 'all .7s .3s cubic-bezier(.645, .045, .355, 1)',
    }),
  ]),
]).mountStyle('loading-animation');

// mask
css('.mask', {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(218,218,218,.35)',
  zIndex: 'var(--second-z)',
}).mountStyle('mask');

// welcome box
css('.box', {
  width: '100%',
  height: '100%',
  padding: '50px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}, [
  css('.image-shadow', {
    width: '700px',
    height: '300px',
    borderRadius: '10px',
    overflow: 'hidden',
    textAlign: 'center',
    transition: 'box-shadow ease .3s',
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
      backgroundPosition: 'center',
    }, [
      css('.welcome', {
        fontSize: '80px',
        fontFamily: 'SketchFineSerif',
      }),
      css('span', {
        fontSize: '20px',
        letterSpacing: '2px',
        marginTop: '10px',
      }),
    ]),
  ]),
]).mountStyle('welcome');

// slider
css('#slides', {
  width: '100%',
  height: '100%',
  position: 'relative',
  left: 0,
  top: 0,
  maxHeight: 'none',
  maxWidth: '100%',
  verticalAlign: 'top',
  border: 'none',
  overflow: 'hidden',
}, [
  css('.slides_list', {
    width: '100%',
    height: '100%',
  }),
  css('.slides_list ul', {
    width: '10000%',
    height: '100%',
    position: 'relative',
    left: 0,
    margin: 0,
    padding: 0,
  }, [
    css('li', {
      position: 'relative',
      width: '1%',
      height: '100%',
      lineHeight: 0,
      overflow: 'hidden',
      float: 'left',
      padding: 0,
      margin: 0,
    }),
  ]),
]).mountStyle('slides');



function initWelcome() {
  let changedPos = {
    X: 0,
    Y: 0,
    CX: 0,
    CY: 0,
  };

  let a = {
    X: changedPos.X,
    Y: changedPos.Y,
    CX: changedPos.CX,
    CY: changedPos.CY,
  };

  let animationId;

  const welcome = $('.title-container');
  const imgShadow = $('.image-shadow');

  // polyfill https://github.com/darius/requestAnimationFrame
  function setImgShadowStyle() {
    a.CY += ((changedPos.Y - a.CY) / 12) | 0;
    a.CX += ((changedPos.X - a.CX) / 12) | 0;

    imgShadow.css({
      transform: `scale(1.00) translate(${.05 * a.CX}px, ${.05 * a.CY}px) rotateX(${.05 * a.CY}deg) rotateY(${.05 * a.CX}deg)`,
    });

    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animationId = requestAnimationFrame(startAnimation);
  }

  function startAnimation() {
    animationId = requestAnimationFrame(() => {
      setImgShadowStyle();
    });
  }

  function handleMouseMove(e) {
    changedPos.X = (e.pageX - $(this).offset().left - welcome.width() / 2) | 0;
    changedPos.Y = (e.pageY - $(this).offset().top - welcome.height() / 2) | 0;
  }

  function handleMouseLeave() {
    changedPos.X = changedPos.CX;
    changedPos.Y = changedPos.CY;
  }

  welcome.on('mouseenter', startAnimation);
  welcome.on('mousemove', handleMouseMove);
  welcome.on('mouseleave', handleMouseLeave);

  const mask = $('.mask');

  function handleImgShadowMouseEnter() {
    imgShadow.css({
      boxShadow: '0 0 30px 5px rgba(0,0,0,89)',
    });
    imgShadow.addClass('in');
  }

  function handleImgShadowMouseLeave() {
    imgShadow.css({
      boxShadow: '0 0 0 0 ',
    });
  }

  mask.on('mouseenter', handleImgShadowMouseEnter);
  mask.on('mouseleave', handleImgShadowMouseLeave);
}

function init() {
  $('body').addClass('loaded');
  initWelcome();
}

$(function () {
  init();
});



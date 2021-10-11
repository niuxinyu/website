const kebabRegex = /[A-Z]/g;

/**
 * @param {string} pattern
 * */
function kebabCase(pattern) {
  return pattern.replace(kebabRegex, match => '-' + match.toLowerCase());
}

function tersePath(pathArr) {
  return pathArr.join(' ')
}

// fix @keyframe
function normalizePropertyName(propertyName) {
  if (typeof propertyName === 'object' && propertyName !== null) {
    return ' {\n ' +
      Object.entries(propertyName).map(v =>
        `  ${kebabCase(v[0])}: ${v[1]}`
      ).join('\n') + '\n' + '}';
  }
  return `: ${propertyName};`
}

// add 可以添加回调，这样可以在回调函数中访问到当前的 selector
// add 如果不传入选择器，默认返回不带括号的样式
function createStyle(selector, styleSheet, context) {
  if (typeof styleSheet === 'function') {
    const res = styleSheet(selector)
    styleSheet = res
    if (!res) styleSheet = {}
  }
  const propertyNames = Object.keys(styleSheet)
  if (propertyNames.length === 0) {
    return ''
  }
  const styleArr = selector ? [
    selector + ' {'
  ] : []
  propertyNames.forEach(key => {
    // ::after 等伪类
    let propertyName = styleSheet[key] === '' ? '\"\" ' : styleSheet[key]
    key = kebabCase(key)
    styleArr.push(`  ${key}${normalizePropertyName(propertyName)}`)
  })

  selector && styleArr.push('}')
  return styleArr.join('\n')
}

let deep = 0

function traverseStyle(children, styles, pathArr) {
  deep += 1
  // add 子选择器有逗号的时候尝试添加父选择器
  // tips: 可能不合理
  if (deep > 1) {
    if (children.root.includes(',')) {
      const childrenRootList = children.root.split(',')
      for (let i = 0; i < childrenRootList.length;i++) {
        const cur = childrenRootList[i]
        const parent = pathArr[pathArr.length - 1]
        if (i === 0) {
          children.root = [cur]
        }
        else {
          children.root.push(' ' + parent + cur)
        }
      }
    }
  }
  pathArr.push(children.root)
  const sel = tersePath(pathArr)
  const style = createStyle(sel, children.styleSheet, this);
  styles.push(style)
  if (children.children.length) {
    for (let i = 0; i < children.children.length; i++) {
      traverseStyle(children.children[i], styles, pathArr)
    }
  }
  pathArr.pop()
  return styles.join('\n\n')
}

function renderStyle() {
  const styles = [];
  const styleStr = traverseStyle(this, styles, []);
  deep = 0;
  return styleStr;
}

/**
 * @param {string} id
 * */
function mountStyle(id = '') {
  let styleStr = this.renderStyle()

  const style = document.createElement('style')
  if (id.length) {
    style.setAttribute('id', id)
  }
  style.textContent = styleStr
  document.head.appendChild(style)
}

function createCssRender() {
  /**
   * @param {string} selector
   * @param {
   *   {
   *     [key in keyof CSSStyleDeclaration]?: string | number ;
   *   } | function (selector: string): void
   *  } styleSheet
   * @param {[]} children
   * @example css('body', [css('.div', [])])
   * */
  function css(selector, styleSheet, children = []) {
    return {
      root: selector,
      styleSheet,
      children,
      renderStyle,
      mountStyle
    }
  }

  return {
    css
  }
}

window.createCssRender = createCssRender

export function handleTitle(path, suffix = '绩效考评') { // eslint-disable-line
  const len = path.length;
  let newSuffix = suffix;
  if (len > 2) {
    newSuffix = `-${path[len - 2].title}-${suffix}`;
  } else {
    newSuffix = `-${newSuffix}`;
  }
  document.title = path[len - 1].title ?
    `${path[len - 1].title}${newSuffix}` : suffix;
}

// 下划线命名转驼峰命名
export function underline2Hump(underlineName) {
  const underlineNameArr = underlineName.split('');
  let humpName = '';
  underlineNameArr.forEach((item, index) => {
    if (item === '_' && index < underlineNameArr.length) {
      humpName += underlineNameArr[index + 1].toUpperCase();
      underlineNameArr[index + 1] = '';
    } else {
      humpName += item;
    }
  });
  return humpName;
}

export function initialUppercase(title) {
  return title[0].toUpperCase() + title.substring(1);
}


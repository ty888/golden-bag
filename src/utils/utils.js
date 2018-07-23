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

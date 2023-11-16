export const sanitize = async (s: any) => {
  if (s && s.constructor === String) {
    return s.replace(/<\w+>|<\/\w>|[^0-9A-Za-z_@\/\-.,:\n$"'*& ]/g, '');
  } else if (s && s.constructor === Array) {
    const arr = [];
    for (const i of s) {
      arr.push(await sanitize(i));
    }
    return arr;
  } else if (s && s.constructor === Object) {
    for (const k in s) {
      s[k] = await sanitize(s[k]);
    }
  }
  return s;
};

const objectIndexOf = (src, search) => {
  const a = Object.keys(src);

  for (let i = 0; i < a.length; i++) {
    const key = a[i];

    if (src[key] === search) {
      return { key, value: src[key] };
    }
  }

  return null;
};

const objectLastIndexOf = (src, search) => {
  console.warn(src, search);
};

export { objectIndexOf, objectLastIndexOf };

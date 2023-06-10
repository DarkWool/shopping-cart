async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const isNumber = (n) => typeof n === "number" && !isNaN(n);

export { fetchData, isNumber };

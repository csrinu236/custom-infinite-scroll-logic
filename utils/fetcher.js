export const fetcher = async (...urls) => {
  const data = await Promise.all(
    urls.map((url) => {
      return fetch(url)
        .then((resp) => resp.json())
        .then((data) => data);
    })
  );
  return data.flat();
};

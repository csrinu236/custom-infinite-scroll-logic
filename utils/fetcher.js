export const fetcher = async (...urls) => {
  if (urls?.length > 1) {
    console.log("URL_ARRAY");
    const data = await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => {
          const linkHeader = resp.headers.get("Link");
          const hasMorePages = linkHeader && linkHeader.includes('rel="next"');
          if (hasMorePages) {
            console.log("More pages exist");
          } else {
            console.log("No more pages");
          }
          return resp.json().then((data) => Promise.resolve({ list: data, hasMorePages }));
        });
      })
    );
    return data;
  } else {
    return fetch(urls[0]).then((resp) => {
      const linkHeader = resp.headers.get("Link");
      const hasMorePages = linkHeader && linkHeader.includes('rel="next"');
      if (hasMorePages) {
        console.log("More pages exist");
      } else {
        console.log("No more pages");
      }
      return resp.json().then((data) => Promise.resolve({ list: data, hasMorePages }));
    });
  }
};

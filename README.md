This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Here I wrote Custom Infinite Scroll Logic for React/NextJs WITHOUT the use of 
1) Scroll event listener + debouncing it,
2) Any third-party npm packages like react-infinite-scroll.
To use react-infinite-scroll, we need to maintain enough initial height to enable infinite scroll i.e., page 1 fetched data should span more height than viewport height.
Sometimes that can be problematic if page 1 data doesn't have enough data to span more height than viewport height.

But my Custom Infinite Scroll Logic will handle all such situations. It is independent of page 1 fetched data height. 
Check these videos: 

Custom Infinite Scroll Logic: https://www.awesomescreenshot.com/video/31006395?key=0f39d1c220b62afe29fcd4404fb8b953

react-infinite-scroll: https://www.awesomescreenshot.com/video/31006947?key=4e175053c6a5931c8bef7b122662cd73 

   
It can also be migrated to Angular with little research.
I used intersection observer and useSWRInfinite(this has to fetch pagination data).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then, inspect browser developer tools, the network tab, and add page filter and fetch/xhr. 

Then keep on scrolling, and you will see subsequent page requests:

<img width="1471" alt="image" src="https://github.com/user-attachments/assets/d11ba873-c7eb-45a5-ba5e-6227f204f0c7">



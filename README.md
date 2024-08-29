This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Here I wrote Custom Infinite Scroll Logic for React/NextJs WITHOUT the use of 
1) Scroll event listener + debouncing it,
2) Any third-party npm packages like react-infinite-scroll.
   
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



# Shopping Cart - [view live](https://darkwool.github.io/shopping-cart/)

Made **with**:

- React
- React Router
- Vite
- Vitest
- Tailwind
- Swiper

With this project, I managed to finally give Tailwind a shot alongside React Router and a couple of other React features that I left untouched on my last projects like **_context_** and **_custom hooks_**! both of them proved incredibly useful.

But one of the most important things with this project is that I was able to try the **_BestBuy API_**. Why was this so exciting to me?, because I managed to use **_real-world_** data in order to build this web app. Still, there's one minor inconvenience though: the API has a request limit, that's why at the end of the project I decided to "hardcode" the categories of the shop in order to avoid a lot of errors caused by this limit on the shop page.

And last but not least, I learned how to create tests for React using vitest and react-testing-library!

## Specifications

1. You should have at least two pages (a homepage and a shop page, which includes your shopping cart). Let a user navigate between the pages with a navigation bar, which will be shown on both routes.
1. To your homepage, you can add whatever you’d like! A few images or information will be totally fine; it doesn’t have to be something fancy. The main goal of the project is to focus on setting up the shopping cart. The homepage is there to practice routing using react-router-dom.
1. On your shopping cart route, a user should see a sticky bar (it can be just a top section as well), which displays the number of items currently in the cart.
1. Build individual card items for each of your products. Also, add an increment and decrement button next to it for fine-tuning. You can also display a title for each product as well as an “Add To Cart” button.
1. Once a user has submitted their order, the amount on the cart itself should adjust.
1. Make sure to test your app thoroughly using the React Testing Library. Take care that you don’t directly test react-router-dom, since it is an external library and the developers working on it must have tested the library already.

Check the assignment's page [here.](https://www.theodinproject.com/lessons/node-path-javascript-shopping-cart)

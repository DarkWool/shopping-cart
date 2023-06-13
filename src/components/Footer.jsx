import logo from "/src/assets/images/logo.png";
import { Link } from "react-router-dom";

const linksSections = [
  {
    title: "SHOP",
    items: [
      { title: "Gaming Desktops", url: "./shop/category/pcmcat287600050002" },
      { title: "Gaming Laptops", url: "./shop/category/pcmcat287600050003" },
      { title: "Gaming Monitors", url: "./shop/category/pcmcat304600050011" },
      { title: "Computer Cards & Components", url: "./shop/category/abcat0507000" },
      { title: "Virtual Reality", url: "./shop/category/pcmcat1476727552895" },
      { title: "PC Gaming Accessories", url: "./shop/category/pcmcat159700050051" },
    ],
  },
  {
    title: "USEFUL LINKS",
    items: [
      { title: "Home", url: "/" },
      { title: "Shop", url: "./shop" },
      {
        title: "Repository",
        url: "https://github.com/DarkWool/shopping-cart",
        target: "_blank",
      },
      {
        title: "DarkWool GitHub",
        url: "https://github.com/DarkWool",
        target: "_blank",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white text-sm">
      <div className="container max-w-screen-xl py-16 flex justify-between">
        <div className="max-w-xs mr-20 text-sm">
          <img src={logo} className="mb-5" />
          <p className="leading-tight">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni ut
            sit, veniam magnam nesciunt corporis neque aliquam earum facere repudiandae
            itaque exercitationem accusamus provident nemo quasi! Modi, amet iste.
          </p>
        </div>

        <div className="flex gap-x-28">
          {linksSections.map((section, i) => {
            const links = section.items.map((link, i) => {
              const attrs = { to: link.url };
              attrs.target = link.target && link.target;

              return (
                <li key={i}>
                  <Link
                    {...attrs}
                    className="transition ease-in-out text-gray-400 hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              );
            });

            return (
              <div className="w-36" key={i}>
                <span className="block text-2xl leading-none font-bold mb-5">
                  {section.title}
                </span>
                <ul className="flex flex-col gap-y-4">{links}</ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container max-w-screen-xl py-5 text-sm flex justify-between">
          <span className="text-gray-400">© 2023 Woolper Inc. All Rights Reserved.</span>

          <span className="font-medium">
            Project made by DarkWool using {"BestBuy's"} API.
          </span>
        </div>
      </div>
    </footer>
  );
}

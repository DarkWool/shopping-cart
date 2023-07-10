import heroImg from "/src/assets/images/hero-img.png";
import lipsImg from "/src/assets/images/lips.png";
import arrow from "/src/assets/images/arrow.svg";
import textBackground from "/src/assets/images/innovate-text-gradient.png";
import { Link } from "react-router-dom";
import { Marquee } from "../components/Marquee";
import { IconBox } from "../components/IconBox";
import { Container } from "../components/Container";

export function Home() {
  return (
    <>
      <section>
        <div className="-mt-20 absolute">
          <img src={textBackground} alt="" />
        </div>

        <Container className="flex items-center">
          <div className="w-1/2 max-w-full shrink-0">
            <div className="flex gap-4 mb-5">
              <img
                src={arrow}
                className="animate-opacity-pulse"
                style={{ "--order": 0 }}
              />
              <img
                src={arrow}
                className="animate-opacity-pulse [animation-delay:calc(var(--order)*100ms)]"
                style={{ "--order": 1 }}
              />
              <img
                src={arrow}
                className="animate-opacity-pulse [animation-delay:calc(var(--order)*100ms)]"
                style={{ "--order": 2 }}
              />
              <img
                src={arrow}
                className="animate-opacity-pulse [animation-delay:calc(var(--order)*100ms)]"
                style={{ "--order": 3 }}
              />
            </div>

            <h1 className="text-7xl font-headings mb-6 font-medium tracking-tighter text-black">
              <span className="ml-14">See with</span> <br />
              <span className="font-extrabold text-8xl">
                the future, <br />
              </span>
              <span className="ml-40">not the past.</span>
            </h1>

            <p className="leading-5 max-w-prose">
              Step into the future with the revolutionary Apple VR headset. Experience
              immersive technology like never before. Shop now and embrace the next level
              of digital reality.
            </p>
          </div>

          {/* second col */}
          <div className="grow relative">
            <img src={lipsImg} alt="" className="absolute top-0 left-0" />
            <img src={heroImg} alt="" />
          </div>
        </Container>
      </section>

      <Marquee
        className="bg-black text-white text-4xl md:text-7xl font-headings tracking-tighter font-medium whitespace-nowrap"
        content="THE JOURNEY STARTS HERE"
      />

      <Container as="section" className="my-14 flex items-center gap-36">
        <div className="max-w-sm w-full shrink-0"></div>

        <div>
          <h2 className="text-5xl mb-8 tracking-tight">
            Products that <span className="font-extrabold">fit YOU.</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum, nisl
            nec dictum vehicula, sapien metus convallis nisi, in tristique velit nulla
            tempor tortor. Ut vitae orci id purus efficitur viverra quis ut purus. Ut
            posuere vel augue a aliquet. Integer at erat lobortis, bibendum ex vitae,
            volutpat eros. Suspendisse euismod placerat nisi quis maximus. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Mauris volutpat pharetra malesuada. Cras non nisl imperdiet, posuere
            nunc quis, lobortis dui. Fusce mollis bibendum libero in ultrices. Nulla
            vulputate ullamcorper diam eget eleifend. Nulla id vehicula quam. Suspendisse
            dui justo, aliquam finibus lacinia eu, porta eget turpis.
          </p>
          <p>
            Quisque condimentum tempor cursus. Nulla nunc massa, porta a venenatis in,
            ornare at arcu. Nam pharetra, dolor id suscipit semper, nisl tellus lacinia
            ligula, et sollicitudin nibh lorem eget metus. Donec in aliquam tellus.
          </p>

          <div className="flex gap-x-16 mt-9">
            <IconBox
              heading={
                <h2 className="text-3xl mb-3 tracking-tight">
                  <span className="font-extrabold">Free</span> shipping
                </h2>
              }
              content="Free shipping on every order. No minimums, no restrictions. Your wallet's best friend."
            />
            <IconBox
              heading={
                <h2 className="text-3xl mb-3 tracking-tight">
                  <span>
                    <span className="font-extrabold">Extended</span> warranty
                  </span>
                </h2>
              }
              content="Protect your investment with additional coverage for peace of mind, our store handles all the difficulty for you."
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="flex items-center my-16">
        <div className="grow">
          <span className="text-gray-600 tracking-wider mb-2 block">
            Unleash their power. Unleash yours.
          </span>
          <h2 className="text-5xl tracking-tight">
            BEST GAMING <span className="font-extrabold">DESKTOPS.</span>
          </h2>
          <span className="mt-1 w-full h-1 bg-black block"></span>
        </div>
        <Link
          to="./shop/category/pcmcat287600050002"
          className="bg-black w-96 h-96 bg-[url('/src/assets/images/gaming-desktop-sm.jpg')] bg-center bg-[length:100%] bg-no-repeat transition-all duration-300 ease-in-out hover:bg-[length:120%]"
        />
      </Container>

      <Container as="section" className="py-20">
        <h2 className="text-5xl mb-8 tracking-tight">
          World-class <span className="font-extrabold">composable businesses.</span>
        </h2>
        <div className="flex column gap-x-16 text-slate-600">
          <div className="w-1/2 shrink-0">
            <p>
              Quisque imperdiet nisl malesuada orci sodales cursus. Nunc laoreet
              vestibulum risus, quis rhoncus risus efficitur semper. Proin dapibus massa
              quam, a gravida urna lobortis a. Integer faucibus diam eget urna pharetra
              aliquet. Duis cursus dui sit amet massa dapibus, sagittis iaculis libero
              semper. Vivamus ac accumsan sapien, nec condimentum erat. Praesent placerat
              vitae nulla in pellentesque. Proin et urna vel libero sodales pulvinar a nec
              metus. Praesent eget odio non eros fringilla tempor quis at diam. Quisque
              vestibulum hendrerit elit, quis sagittis leo tempor pellentesque. Nulla
              mauris ligula, malesuada ac lobortis non, finibus eget quam. Nam enim
              mauris, commodo vitae iaculis et, ultricies ac urna. Pellentesque eget quam
              in urna consectetur sollicitudin et blandit urna. Suspendisse malesuada
              dignissim consequat.
            </p>
            <p>
              In semper libero vel rhoncus maximus. Cras diam arcu, ultricies et cursus
              at, imperdiet nec leo. Praesent tempor magna ante. Integer elementum pretium
              enim, ornare tempor nisi ullamcorper eu. Praesent convallis porta felis at
              egestas. Fusce at sodales nibh. Fusce dignissim, risus a laoreet sodales,
              orci justo rhoncus sapien, quis sollicitudin nibh eros sed purus. Integer
              lobortis feugiat sem.
            </p>
            <p>
              Aenean vitae lobortis dolor, sed molestie elit. Proin ac elit neque.
              Suspendisse ac dui sed diam feugiat sagittis. Phasellus maximus porttitor
              nunc sed hendrerit. Vestibulum convallis, magna at egestas condimentum, dui
              ex dignissim leo, non lobortis libero elit mattis ante. Cras semper ut mi
              non pellentesque. Sed dignissim laoreet orci ut laoreet.
            </p>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fermentum
              ullamcorper libero, eu laoreet ligula iaculis sit amet. Proin euismod
              malesuada nisi, et convallis mauris faucibus et. Cras laoreet risus velit,
              eu sollicitudin est pharetra dapibus. Proin justo odio, finibus id quam eu,
              rutrum sagittis massa. Donec eu turpis massa. Proin in est eu enim semper
              cursus in eget dui. Aliquam tempor, dolor venenatis facilisis feugiat, justo
              ante dapibus nunc, a hendrerit urna mi in ex. Etiam eget molestie diam, eu
              auctor leo. Suspendisse id odio quis est tincidunt vulputate et ac ligula.
              Fusce non est malesuada, egestas mi id, tristique erat. Ut pulvinar
              condimentum dui a congue. In hac habitasse platea dictumst. Ut ac varius ex.
              Integer efficitur eu ligula sit amet pretium. Nam eget sem convallis,
              eleifend erat vel, dapibus diam. Sed ullamcorper ac elit consequat pretium.
              Sed placerat suscipit nunc in sodales. Etiam interdum dapibus dui eu
              tincidunt. Phasellus enim mauris, pellentesque et diam non, maximus auctor
              eros. In risus tellus, consectetur eu porta quis, elementum sed justo.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

import heroImg from "/src/assets/images/hero-img.png";
import lipsImg from "/src/assets/images/lips.png";
import arrow from "/src/assets/images/arrow.svg";
import textBackground from "/src/assets/images/innovate-text-gradient.png";
import smilingFace from "/src/assets/images/bestbuy-face.png";
import { Link } from "react-router-dom";
import { Marquee } from "../components/Marquee";
import { Container } from "../components/Container";

export function Home() {
  return (
    <>
      <section>
        <div className="-mt-20 absolute -z-10">
          <img src={textBackground} />
        </div>

        <Container className="flex flex-col md:flex-row items-center mt-9">
          <div className="md:w-1/2 max-w-full shrink-0">
            <div className="flex gap-4 mb-5 [&>img]:w-4 [&>img]:md:w-8">
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

            <h1 className="text-4xl md:text-7xl font-headings mb-7 md:mb-9 font-medium tracking-tighter text-black">
              <span className="ml-8 md:ml-14">See with</span> <br />
              <span className="font-extrabold text-5xl md:text-8xl">
                the future, <br />
              </span>
              <span className="ml-20 md:ml-40">not the past.</span>
            </h1>

            <p className="leading-5 max-w-prose">
              Step into the future with the revolutionary <b>Apple VR headset</b>.
              <br></br>
              Experience immersive technology like never before. Embrace the next level of
              digital reality.
            </p>

            <Link
              to="/shop"
              className="btn-primary mt-12 mb-10 inline-flex align-middle gap-x-3"
            >
              START SHOPPING
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* second col */}
          <div className="mt-10 md:mt-0 grow relative">
            <img
              src={lipsImg}
              alt=""
              className="max-w-[7rem] md:max-w-full absolute top-0 left-0"
            />
            <img src={heroImg} alt="" />
          </div>
        </Container>
      </section>

      <Marquee
        className="bg-black text-white text-4xl md:text-7xl font-headings tracking-tighter font-medium whitespace-nowrap"
        content="THE JOURNEY STARTS HERE"
      />

      <Container
        as="section"
        className="mt-14 md:mt-24 mb-14 flex flex-col-reverse md:flex-row items-center gap-14 md:gap-36"
      >
        <div className="max-w-lg w-full shrink-0 flex flex-col items-center">
          <img src={smilingFace} alt="" className="max-w-xs md:max-w-lg" />
          <Link to="/shop" className="btn-primary my-5">
            MEET THE NEW AGE
          </Link>
        </div>

        <div>
          <h2 className="text-4xl mb-9 tracking-tight">
            Tech is the <span className="font-extrabold">new age.</span>
          </h2>

          <div className="text-gray-700 text-sm leading-snug">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum,
              nisl nec dictum vehicula, sapien metus convallis nisi, in tristique velit
              nulla tempor tortor. Ut vitae orci id purus efficitur viverra quis ut purus.
              Ut posuere vel augue a aliquet. Integer at erat lobortis, bibendum ex vitae,
              volutpat eros. Suspendisse euismod placerat nisi quis maximus. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Mauris volutpat pharetra malesuada. Cras non nisl imperdiet,
              posuere nunc quis, lobortis dui. Fusce mollis bibendum libero in ultrices.
              Nulla vulputate ullamcorper diam eget eleifend. Nulla id vehicula quam.
              Suspendisse dui justo, aliquam finibus lacinia eu, porta eget turpis.
            </p>
            <p>
              Quisque condimentum tempor cursus. Nulla nunc massa, porta a venenatis in,
              ornare at arcu. Nam pharetra, dolor id suscipit semper, nisl tellus lacinia
              ligula, et sollicitudin nibh lorem eget metus. Donec in aliquam tellus.
            </p>
          </div>
        </div>
      </Container>

      <Container
        as="section"
        className="flex flex-col md:flex-row items-center my-10 md:my-32"
      >
        <div className="grow text-center md:text-left">
          <span className="text-gray-600 tracking-wider mb-2 block">
            Unleash their power. Unleash yours.
          </span>

          <h2 className="text-4xl md:text-5xl tracking-tight">
            BEST GAMING <span className="font-extrabold">DESKTOPS.</span>
          </h2>

          <span className="w-0.5 h-20 mx-auto mt-4 md:mt-1 md:w-full md:h-1 bg-black block"></span>
        </div>
        <Link
          to="./shop/category/pcmcat287600050002"
          className="bg-black w-full md:w-96 h-96 bg-[url('/src/assets/images/gaming-desktop-sm.jpg')] bg-center bg-[length:100%] bg-no-repeat transition-all duration-300 ease-in-out hover:bg-[length:120%]"
        />
      </Container>

      <Container as="section" className="py-10 md:py-20">
        <h2 className="text-4xl md:text-5xl mb-10 tracking-tight">
          World-class <span className="font-extrabold">composable businesses.</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-x-16 text-gray-700 text-sm leading-snug">
          <div className="md:w-1/2 shrink-0">
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

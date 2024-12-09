import HomeFeatures from "./components/home-features/index";
import { Card, StylingLine } from "../../common";
import { MainContainer, ContentContainer, LineContainer } from "./index.styled";

function HomePage() {
  return (
    <MainContainer>
      <ContentContainer>
        <div className="homeText">
          <h1>Banking Made Easy</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem,
            blanditiis laborum dolore repudiandae alias ipsa natus dignissimos
            debitis numquam. Dignissimos nostrum nobis excepturi quidem
            veritatis aliquid sit iure, officia adipisci!
          </p>
          <button
            onClick={() => {
              document
                .querySelector(`#line1`)
                .scrollIntoView({ behavior: `smooth` });
            }}
            className="btnScrollTo"
          >
            Learn more ⬇
          </button>
        </div>
        <Card />
      </ContentContainer>
      <LineContainer id="line1">
        <StylingLine />
      </LineContainer>
      <HomeFeatures />
    </MainContainer>
  );
}

export default HomePage;

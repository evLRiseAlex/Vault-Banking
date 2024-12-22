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
            Experience seamless banking tailored to your needs. From managing
            accounts to making payments, we bring simplicity and security to
            your financial journey.
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

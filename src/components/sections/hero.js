import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { email } from "@config";
import { navDelay, loaderDelay } from "@utils";
import { Container, Row, Col } from "reactstrap";
import Audio from "../audio";

const StyledHeroSection = styled.div`
  h1 {
    margin: 10px 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 30px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Tomás Vasquez</h2>;
  const four = (
    <p>
      I'm a software engineer based in Bolivia specializing in building web
      sites and applications and everything in between.
    </p>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      Get In Touch
    </a>
  );

  const items = [one, two, four, five];

  return (
    <>
      <StyledHeroSection>
        <Container
          className="d-flex mt-5 pt-5 my-md-0 "
          style={{
            minHeight: "100vh",
          }}
        >
          <Row
            className="d-flex my-auto"
            style={{
              width: "100%",
            }}
          >
            <Col xs="12" md="6" lg="7" className="my-auto">
              <TransitionGroup component={null}>
                {isMounted &&
                  items.map((item, i) => (
                    <CSSTransition
                      key={i}
                      classNames="fadeup"
                      timeout={loaderDelay}
                    >
                      <div style={{ transitionDelay: `${i + 1}00ms` }}>
                        {item}
                      </div>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </Col>
            <Col xs="12" md="6" lg="5" className="my-auto">
              {isMounted && (
                <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `100ms` }}>
                    <Audio />
                  </div>
                </CSSTransition>
              )}
            </Col>
          </Row>
        </Container>
      </StyledHeroSection>
    </>
  );
};

export default Hero;

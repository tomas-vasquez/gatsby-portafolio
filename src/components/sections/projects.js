import React, { useState, useEffect, useRef } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { srConfig } from "@config";
import sr from "@utils/sr";
import Icon from "@components/Icon";
import { Col, Container } from "reactstrap";

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.div`
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus {
    outline: 0;
    .project-inner {
      transform: translateY(-5px);
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
      allGithubData {
        nodes {
          data {
            user {
              repositories {
                nodes {
                  description
                  forkCount
                  id
                  name
                  primaryLanguage {
                    name
                  }
                  languages {
                    nodes {
                      name
                    }
                  }
                  updatedAt(fromNow: false)
                  readme {
                    text
                  }
                  stargazers {
                    totalCount
                  }
                  openGraphImageUrl
                  url
                }
              }
            }
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) =>
      sr.reveal(ref, srConfig(i * 100))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GRID_LIMIT = 6;

  const repos = data.allGithubData?.nodes[0].data.user.repositories.nodes;
  const firstSix = repos.slice(0, GRID_LIMIT);
  const reposToShow = showMore ? repos : firstSix;

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>
      <Link
        className="inline-link archive-link"
        to="/archive"
        ref={revealArchiveLink}
      >
        view the archive
      </Link>

      <Container className="mt-5">
        <TransitionGroup className="row">
          {reposToShow &&
            reposToShow.map((node, i) => {
              return (
                <Col xs="12" md="6" lg="4" className="mb-4">
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                    exit={false}
                  >
                    <StyledProject
                      key={i}
                      ref={(el) => (revealProjects.current[i] = el)}
                      tabIndex="0"
                      style={{
                        transitionDelay: `${
                          i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0
                        }ms`,
                        height: "100%",
                      }}
                    >
                      <div className="project-inner">
                        <header>
                          <div className="project-top">
                            <div className="folder">
                              <Icon icon="folder" />
                            </div>
                            <div className="project-links">
                              {node.url && (
                                <a href={node.url} aria-label="GitHub Link">
                                  <Icon icon="github" />
                                </a>
                              )}
                              {/* {node.external && (
                            <a
                              href={external}
                              aria-label="External Link"
                              className="external"
                            >
                              <Icon name="External" />
                            </a>
                          )} */}
                            </div>
                          </div>

                          <h3 className="project-title">{node.name}</h3>

                          <div
                            className="project-description"
                            dangerouslySetInnerHTML={{
                              __html: node.description,
                            }}
                          />
                        </header>

                        <footer>
                          {node.languages && (
                            <ul className="project-tech-list">
                              {node.languages.nodes.map((language, i) => (
                                <li key={i}>{language.name}</li>
                              ))}
                            </ul>
                          )}
                        </footer>
                      </div>
                    </StyledProject>
                  </CSSTransition>
                </Col>
              );
            })}
        </TransitionGroup>
      </Container>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? "Less" : "More"}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;

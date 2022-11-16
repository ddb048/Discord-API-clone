import React from "react";
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Footer () {
let sessionUser = useSelector(state => state.session.user)


if (sessionUser) return null
else
    return (
      <>
        <div className="Splash-footer">
          <div className="footer-content">
            <div className="contact-box">
              <div className="languages-card" id="languages">
                <div className="footer-title">Languages Used</div>
                <div className="language-button-div">
                  <Link
                    className="language-button"
                    to={{ pathname: "https://www.python.org/doc" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-python"></i>
                  </Link>

                  <Link
                    className="language-button"
                    to={{ pathname: "https://reactjs.org/" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-react"></i>
                  </Link>
                  <Link
                    className="language-button"
                    to={{ pathname: "https://nodejs.org/en/docs/" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-node-js"></i>
                  </Link>
                  <Link
                    className="language-button"
                    to={{
                      pathname:
                        "https://developer.mozilla.org/en-US/docs/Glossary/HTML5",
                    }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-html5"></i>
                  </Link>
                </div>
              </div>
              <div className="contact-card" id="abel">
                <div className="contact-text">Abel Brianvil</div>
                <div className="buttons-div">
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://github.com/abrianvil" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-github" />
                  </Link>
                  <Link
                    className="contact-button"
                    to={{
                      pathname:
                        "https://www.linkedin.com/in/abel-brianvil-ba4320170/",
                    }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              </div>

              <div className="contact-card" id="cindy">
                <div className="contact-text">Cindy Guzman</div>
                <div className="buttons-div">
                  <Link
                    className="contact-button"
                    to={{ pathname: "" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-github" />
                  </Link>
                  <Link
                    className="contact-button"
                    to={{
                      pathname: "https://www.linkedin.com/in/cindyroseguzman/",
                    }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              </div>
              <div className="contact-card" id="david">
                <div className="contact-text">David Burch</div>
                <div className="buttons-div">
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://github.com/ddb048" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-github" />
                  </Link>
                  <Link
                    className="contact-button"
                    to={{
                      pathname:
                        "https://www.linkedin.com/in/david-burch-26b92b226/",
                    }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              </div>
              <div className="contact-card" id="moran">
                <div className="contact-text">Moran Even</div>
                <div className="buttons-div">
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://github.com/MEven44" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-square-github" />
                  </Link>
                  <Link
                    className="contact-button"
                    to={{ pathname: "https://www.linkedin.com/in/moran-even/" }}
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Footer
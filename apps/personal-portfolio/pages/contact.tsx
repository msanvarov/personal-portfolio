import { ValidationError, useForm } from '@formspree/react';
import { Layout } from '@msanvarov/core-components';
import { useEffect, useState } from 'react';
import { Alert, Form } from 'reactstrap';

const ContactPage = () => {
  const [state, handleSubmit] = useForm('xeqbqqwj');
  const [displayBanner, setDisplayBanner] = useState(false);

  useEffect(() => {
    if (state.submitting) {
      setDisplayBanner(false);
    }
    if (state.succeeded) {
      setDisplayBanner(true);
    }
  }, [state]);

  return (
    <Layout wrapperClass="main-aboutpage">
      <section className="contact-area">
        <div className="container">
          <div className="gx-row d-flex justify-content-between gap-24">
            <div className="contact-infos">
              <h3 data-aos="fade-up">Contact Info</h3>
              <ul className="contact-details">
                <li className="d-flex align-items-center" data-aos="zoom-in">
                  <div className="icon-box shadow-box">
                    <i className="iconoir-mail" />
                  </div>
                  <div className="right">
                    <span>MAIL</span>
                    <h4>
                      <a href="mailto:sal@dezzign.studio">sal@dezzign.studio</a>
                    </h4>
                    <h4>
                      <a href="mailto:sal@dezzign.studio">
                        msalanvarov@gmail.com
                      </a>
                    </h4>
                  </div>
                </li>
                <li className="d-flex align-items-center" data-aos="zoom-in">
                  <div className="icon-box shadow-box">
                    <i className="iconoir-phone" />
                  </div>
                  <div className="right">
                    <span>CONTACT</span>
                    <h4>
                      <a
                        href="https://calendly.com/msalanvarov"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Calendly
                      </a>
                    </h4>
                  </div>
                </li>
                <li className="d-flex align-items-center" data-aos="zoom-in">
                  <div className="icon-box shadow-box">
                    <i className="iconoir-pin-alt" />
                  </div>
                  <div className="right">
                    <span>Location</span>
                    <h4>
                      Toronto, <br />
                      Canada
                    </h4>
                  </div>
                </li>
              </ul>
              <h3 data-aos="fade-up">External</h3>
              <ul
                className="social-links d-flex align-center"
                data-aos="zoom-in"
              >
                <li>
                  <a
                    className="shadow-box"
                    href="https://github.com/msanvarov"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="iconoir-github" />
                  </a>
                </li>
                <li>
                  <a
                    className="shadow-box"
                    href="https://linkedin.com/in/sal-anvarov"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="iconoir-linkedin" />
                  </a>
                </li>
              </ul>
            </div>
            <div data-aos="zoom-in" className="contact-form">
              <div className="shadow-box">
                <img src="/assets/bg1.png" alt="BG" className="bg-img" />
                <img src="/assets/icons/icon3.png" alt="Icon" />
                <h1>
                  Let’s work <span>together.</span>
                </h1>
                <Form onSubmit={handleSubmit}>
                  <Alert
                    className="messenger-box-contact__msg"
                    role="alert"
                    color="success"
                    isOpen={displayBanner}
                    toggle={() => setDisplayBanner(false)}
                  >
                    Message has been dispatched!
                  </Alert>

                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Name *"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="Email *"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="topic"
                      id="topic"
                      required
                      placeholder="Topic of Conversation *"
                    />
                    <ValidationError
                      prefix="topic"
                      field="topic"
                      errors={state.errors}
                    />
                  </div>
                  <div className="input-group">
                    <textarea
                      name="message"
                      id="message"
                      required
                      placeholder="Message *"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>
                  <div className="input-group">
                    <button
                      className="theme-btn submit-btn"
                      type="submit"
                      disabled={state.submitting}
                    >
                      Dispatch Message
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

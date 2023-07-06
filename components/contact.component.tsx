export const Contact = () => {
  return (
    <section className="contact-area page-section scroll-content" id="contact">
      <div className="custom-container">
        <div className="contact-content content-width">
          <div className="section-header">
            <h4 className="subtitle scroll-animation" data-aos="fade-up">
              <i className="las la-dollar-sign"></i> contact
            </h4>
            <h1 className="scroll-animation" data-aos="fade-up">
              Let&lsquo;s Work <span>Together!</span>
            </h1>
          </div>
          <h3 className="scroll-animation" data-aos="fade-up">
            hello@drake.design
          </h3>
          <p id="required-msg">* Marked fields are required to fill.</p>

          <form
            className="contact-form scroll-animation"
            data-aos="fade-up"
            method="POST"
            action="mailer.php"
          >
            <div
              className="alert alert-success messenger-box-contact__msg"
              style={{ display: "none" }}
              role="alert"
            >
              Your message was sent successfully.
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="full-name">
                    full Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    placeholder="Your Full Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="email">
                    Email <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email adress"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="phone-number">
                    phone <span>(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    placeholder="Your number phone"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label htmlFor="subject">
                    subject <sup>*</sup>
                  </label>
                  <select name="subject" id="subject">
                    <option value="">Select a subject</option>
                    <option value="subject1">Subject 1</option>
                    <option value="subject2">Subject 2</option>
                    <option value="subject3">Subject 3</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <label htmlFor="budget">
                    your budget <span>(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    placeholder="A range budget for your project"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group">
                  <label htmlFor="message">message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Wrire your message here ..."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group upload-attachment">
                  <div>
                    <label htmlFor="upload-attachment">
                      <i className="las la-cloud-upload-alt"></i> add an
                      attachment
                      <input type="file" name="file" id="upload-attachment" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-group submit-btn-wrap">
                  <button
                    className="theme-btn"
                    name="submit"
                    type="submit"
                    id="submit-form"
                  >
                    send message
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

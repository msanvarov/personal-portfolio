import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "../Contact.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        subject: "",
        message: ""
      }}
      onSubmit={(values, { resetForm }) => {
        axios
          .post("https://formcarry.com/s/bh2JHyiHHm7", {
            email: values.email,
            name: values.name,
            premise: values.subject,
            message: values.message
          })
          .then(res => {
            console.log(res.data);
            resetForm();
          })
          .catch(err => console.log(err));
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        name: Yup.string()
          .min(2)
          .required("Required"),
        subject: Yup.string()
          .max(255)
          .required("Required"),
        message: Yup.string().required("Required")
      })}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <Row>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} lg="6" md="6" sm="6" xs="12">
                  <Form.Control
                    required
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.name && !errors.name}
                    isInvalid={errors.name}
                  />
                  {errors.name ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback />
                  )}
                </Form.Group>
                <Form.Group as={Col} lg="6" md="6" sm="6" xs="12">
                  <Form.Control
                    required
                    id="email"
                    placeholder="Enter your email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={errors.email}
                  />
                  {errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback />
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} lg="12" md="12" sm="12" xs="12">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter a subject"
                    id="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.subject && !errors.subject}
                    isInvalid={errors.subject}
                  />
                  {errors.subject ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} lg="12" md="12" sm="12" xs="12">
                  <Form.Control
                    as="textarea"
                    id="message"
                    rows="4"
                    name="message"
                    placeholder="Enter a Message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.message && !errors.message}
                    isInvalid={errors.message}
                    required
                  />
                  {errors.message ? (
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback />
                  )}
                </Form.Group>
              </Row>
              <Form.Control hidden name="_gotcha" />
              <button
                type="submit"
                className="prt_btn submitForm"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          </Row>
        );
      }}
    </Formik>
  );
};
export default ContactForm;

import { Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { make_request } from '../../helpers';

const Login = ({ visible, onHide }) => {

    const onSubmit = (data) => {
        console.log(data);
        make_request(
            {
                method: 'post',
                url: '/users/sign_in',
                data: { user: data }
            })
            .then(function(response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    return (
        <Modal show={visible} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    // validationSchema={schema}
                    onSubmit={onSubmit}
                    initialValues={{}}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors
                      }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                              <Form.Group controlId="validationFormik01">
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                      type="text"
                                      name="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      isValid={touched.email && !errors.email}
                                  />
                                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group controlId="validationFormik02">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                      type="text"
                                      name="password"
                                      value={values.password}
                                      onChange={handleChange}
                                      isValid={touched.password && !errors.password}
                                  />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Check
                                      required
                                      name="terms"
                                      label="Agree to terms and conditions"
                                      onChange={handleChange}
                                      isInvalid={!!errors.terms}
                                      feedback={errors.terms}
                                      id="validationFormik0"
                                  />
                              </Form.Group>
                              <Button type="submit">Log In</Button>
                          </Form>
                    )}
                </Formik>
                <Button>Sign Up </Button>
            </Modal.Body>
        </Modal>
    );
};

export default Login;

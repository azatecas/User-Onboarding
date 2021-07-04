
import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(user => [...users, status]);
  }, [status]);
  return (
    <div className="animal-form">
      <Form>
        <label htmlFor="name">
          Name
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="your name here.."
          />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email
          <Field
            id="size"
            type="text"
            name="email"
            placeholder="your email here..."
          />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          <Field
            id="password"
            type="password"
            placeholder="type your password..."
            name="password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label className="checkbox-container">
          Accept our <a href="#">terms of services</a>
          <Field type="checkbox" name="terms" checked={values.terms} />
          <span className="checkmark" />
          {touched.terms && errors.terms && (
            <p className="errors">{errors.terms}</p>
          )}
        </label>
        <Field as="textarea" type="text" name="notes" placeholder="Notes" />
        <button type="submit">Submit!</button>
      </Form>
      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>name: {user.name}</li>
            <li>email: {user.email}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      terms: props.terms || false,
      notes: props.notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required("email"),
    password: Yup.string().required("password"),
    terms: Yup.boolean().oneOf([true], "terms required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);
export default FormikUserForm;
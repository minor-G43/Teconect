import React, { useState } from "react";
import validation from "./validation";
import Avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
  };
  return (
    <section className="Register-Form">
      <form>
        <div className="box">
          <div className="Avt">
            <img src={Avatar} alt="" />
          </div>
          <div className="RegF-Heading">
            <h4>Register</h4>
          </div>
          <div className="form-fields">
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your Email"
                className="form-control"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your Username"
                className="form-control"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="input-box">
              <input
                type="Password"
                placeholder="Enter your Password"
                className="form-control"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <div className="button-box">
                <button type="submit" onClick={handleSubmit}>
                  Register
                </button>
                <Link to="/">
                  <span>already a member? Sign in</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;

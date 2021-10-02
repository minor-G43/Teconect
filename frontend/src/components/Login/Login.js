import React from 'react';
import Avatar from '../../images/avatar.png';
import { Link } from 'react-router-dom';
import '../Register/Register.css';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <section className="Register-Form">
      <form>
        <div className="box">
          <div className="Avt">
            <img src={Avatar} alt="" />
          </div>
          <div className="RegF-Heading">
            <h4>Login</h4>
          </div>
          <div className="form-fields">
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your Username or Email"
                className="form-control"
              />
            </div>
            <div className="input-box">
              <input
                type="Password"
                placeholder="Enter your Password"
                className="form-control"
              />
              <div className="button-box">
                <button type="submit" onClick={handleSubmit}>
                  Login
                </button>
                <Link to="/register">
                  <span>New? Create account.</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;

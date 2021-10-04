import React, {Component} from 'react';
import { Redirect } from 'react-router';
import './Login.css';


class Login extends Component {

  constructor() {
    super();

    this.state = {
      details: {},
      errors: {},       
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);

  };

  handleChange(e) {
    let details = this.state.details;
    details[e.target.name] = e.target.value;
    this.setState({
      details
    });

  }

  submitForm(e) {

    e.preventDefault();

    if (this.validateForm()) {
        let details = {};
        details["username"] = "";
        details["emailid"] = "";
        details["password"] = "";
        this.setState({details:details});
        alert("You have been logged in successfully!"); 
        this.setState({redirect: true});
      }

  }

  validateForm() {

    let details = this.state.details;
    let errors = {};
    let validity = true;

    if (!details["username"]) {
      validity = false;
      errors["username"] = "*Please enter your Username";
    }

    if (typeof details["username"] !== "undefined") {
      if (!(details["username"].length > 5)) {
        validity = false;
        errors["username"] = "*Please enter more than 5 characters";
      }
    }

    if (!details["emailid"]) {
      validity = false;
      errors["emailid"] = "*Please enter your Email ID";
    }

    if (typeof details["emailid"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(details["emailid"])) {
        validity = false;
        errors["emailid"] = "*Please enter valid Email ID";
      }
    }

    if (!details["password"]) {
      validity = false;
      errors["password"] = "*Please enter your Password";
    }

    if (typeof details["password"] !== "undefined") {
      if (!(details["password"].length > 6)) {
        validity = false;
        errors["password"] = "*Please enter more than 6 characters";
      }
    }

    this.setState({
      errors: errors
    });
    return validity;

  }


render() {
  return (

   <div className="login">

     <div className="container">

        <form className="form" method="post" name="RegistrationForm" onSubmit= {this.submitForm}>

            <h2>SignUp To Register</h2>
            
            <div className="control">
                <label htmlFor = "username">Username</label>
                <input type="text" 
                name = "username" 
                value={this.state.details.username} 
                placeholder="Username" 
                onChange={this.handleChange} />
                <small className="errorMsg">{this.state.errors.username}</small>
            </div>

            <div className="control">
                <label htmlFor = "email">Email</label>
                <input type="text" 
                name = "emailid" 
                value={this.state.details.emailid}  
                placeholder="Enter Email" 
                onChange={this.handleChange} />
                <small className="errorMsg">{this.state.errors.emailid}</small>
            </div>

            <div className="control">
                <label htmlFor = "password">Password</label>
                <input type="password" 
                name = "password" 
                value={this.state.details.password} 
                placeholder="Enter Password" 
                onChange={this.handleChange} />
                <small className="errorMsg">{this.state.errors.password}</small>
            </div>

            <input type="submit" className="button"  value="Register" />
        </form>
        {this.state.redirect ? <Redirect to="/register" /> : ''}
    </div>
  </div>

    );
}

}


export default Login;
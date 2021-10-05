import React, {Component} from 'react';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
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
        details["emailid"] = "";
        details["password"] = "";
        fetch("http://localhost:5000/api/auth/login" , {
          method : "post", 
          body :{
            "email"  : details["emailid"],
            "password" : details["password"]
          }
        }).then(res=>{
          if(res.status === 200 || res.status  === 201){
            this.setState({details:details});
            alert("You have been logged in successfully!"); 
            this.setState({redirect: true});
          }
          else{
            alert(res.statusText);
          }
        }).catch( err =>{
          alert(err);
        }) 
      }

  }

  validateForm() {

    let details = this.state.details;
    let errors = {};
    let validity = true;

    if (!details["emailid"]) {
      validity = false;
      errors["emailid"] = "*Please enter your Email ID";
    }

    if (typeof details["emailid"] !== "undefined") {

      let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
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

        <form className="form" method="post" name="Login-Form" onSubmit= {this.submitForm}>

            <h2>Teconect Login</h2>

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

            <div className="control">
              <span>Don't have an Account?  <Link to='/register' className="register-link">Register</Link></span>
            </div>

            <input type="submit" className="button"  value="Login" />
        </form>
    </div>
  </div>

    );
}

}


export default Login;
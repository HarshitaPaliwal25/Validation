import { useState } from "react";
import classes from "./Register.module.css";
import { FaUser,FaKey,FaAt,FaPhone } from "react-icons/fa";

const Register = () => {
  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    email: "",
    contact: "",
  });
  const handleOnChange = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();

    setErrors(validate(inputData));
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const contactno = /^\d{10}$/;
    const errors = {};
    if (!values.name) {
      errors.name = "User Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.contact) {
      errors.contact = "contact is required!";
    } else if (!contactno.test(values.contact)) {
      errors.contact = "Contact must be in 10 characters";
    }

    return errors;
  };
  return (
    <div className={classes.container}>
  
      {isSubmitted && Object.keys(errors).length === 0 && (
        <p className={classes.success}>Form submitted successfully!</p>
      )}

      <h2 className={classes.title}>Registration Form</h2>
      
      <form onSubmit={handleOnSubmit}>
        <div className={classes.form}>
          <div className={classes.field}>
            <label>
              <span className={classes.icon}><FaUser/></span>
            
           <input 
                type="text"
                name="name"
                placeholder="User Name"
                values={inputData.name}
                onChange={handleOnChange}
                className={classes.input}
              />  
            </label>

            {errors.name && <p className={classes.error}>{errors.name}</p>}
          </div>

          <div className={classes.field}>
            <label>
        <span className={classes.icon}><FaKey/></span>
        
             <input 
                type="password"
                name="password"
                placeholder="Password"
                values={inputData.password}
                onChange={handleOnChange}
                className={classes.input}
              
                
              />
            </label>
            {errors.password && (
              <p className={classes.error}>{errors.password}</p>
            )}
          </div>
          <div className={classes.field}>
            <label>
            <span className={classes.icon}><FaAt/></span>
              <input
                type="text"
                name="email"
                placeholder="Email"
                values={inputData.email}
                onChange={handleOnChange}
                className={classes.input}
              />
            </label>
            {errors.email && <p className={classes.error}>{errors.email}</p>}
          </div>
          <div className={classes.field}>
            <label>
          <span className={classes.icon}><FaPhone/></span>
              <input
                type="number"
                name="contact"
                placeholder="+91"
                
                values={inputData.contact}
                onChange={handleOnChange}
                className={classes.input}
              />
            </label>
            {errors.contact && (
              <p className={classes.error}>{errors.contact}</p>
            )}
          </div>
          <button type="submit" className={classes.button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

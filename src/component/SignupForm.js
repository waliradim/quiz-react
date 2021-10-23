import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";
export default function SignupForm() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState();

  const { signUp } = useAuth();
  const History = useHistory();

  async function handelSubmit(e) {
    e.preventDefault();
    if (password !== confPassword) {
      return setError("Password not match");
    }
    try {
      setError("");
      setloading(true);
      await signUp(email, password, userName);
      History.push("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      setError("Fail to create an Account");
    }
  }

  return (
    <Form className={classes.signup} onSubmit={handelSubmit}>
      <TextInput
        type="text"
        required
        placeholder="Enter name"
        icon="person"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
      />
      <TextInput
        type="text"
        required
        placeholder="Enter E-mail"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confPassword}
        onChange={(e) => setconfPassword(e.target.value)}
      />
      <Checkbox
        required
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />
      <Button disabled={loading} type="submit">
        Submit Now
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}

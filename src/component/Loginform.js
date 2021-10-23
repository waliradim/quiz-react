import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Login.module.css";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setloading] = useState();

  const { login } = useAuth();
  const History = useHistory();

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setloading(true);
      await login(email, password);
      History.push("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      setError("Fail to Login");
    }
  }

  return (
    <Form className={classes.login} onSubmit={handelSubmit}>
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
      <Button disabled={loading} type="submit">
        Login
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}

import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <button
  onClick={() => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  }}
  style={{
    marginTop: '10px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ccc',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  }}
>
  Sign in with Google
</button>

    </div>
  );
};

export default Register;





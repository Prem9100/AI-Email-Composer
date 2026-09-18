import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/users/register", {
                name,
                email,
                password
            });

            alert("Registration Successful!");

            navigate("/");

        } catch (error) {

            if (error.response) {

                alert(error.response.data.detail);

            } else {

                alert("Unable to connect to server.");

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-left">

                <div className="overlay">

                    <h1>AI Email Composer</h1>

                    <p>
                        Create your account and start generating
                        professional AI-powered emails.
                    </p>

                </div>

            </div>

            <div className="login-right">

                <form
                    className="login-card"
                    onSubmit={handleRegister}
                >

                    <h2>Create Account</h2>

                    <p>Register to continue</p>

                    <div className="input-box">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                        />

                    </div>

                    <div className="input-box">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="input-box">

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >

                        Register

                    </button>

                    <div className="register-link">

                        Already have an account?

                        <Link to="/">
                            Login
                        </Link>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Register;
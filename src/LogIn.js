import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";
import Frame from "./frame";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        }

        axios.post("http://localhost:8080/login", data)
            .then((response) => {
                login(response.data);

                //success message
                toast.success("Login Successful");
                navigate("/");
            })
            .catch((error) => {
                //error message
                toast.error("Invalid Credentials");
                console.log(error);
            });
    }

    return (
        <div>
            <Frame />
            <div className="container">

                <h1>Login Page</h1>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
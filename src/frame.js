import { useAuth } from "./utils/AuthContext";
import './App.css';

function Frame() {
    const { logout } = useAuth();
    return (
        <div>
            <header><center><h1>Welcome to point of sale</h1>
                <button className="rigt-align-button" onClick={logout}>Logout</button>
            </center></header>
            <footer className="footer"><center>
                <a href="/products editor">Item and Category Management</a>
                <a href="/stocks">Stock Data</a>
                <a href="/purchase">Purchase Page</a>
            </center></footer>
        </div>
    )
}

export default Frame;
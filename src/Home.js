import { Link } from "react-router-dom";
import Frame from "./frame";

function Home() {
    return (
        <div className="card-container">
            <Frame />

            <div className="card"><h2>Item Category Management</h2><p>Easy to Manage Add Update Items at the shop with ease</p></div>
            <div className="card"><h2>Stock Data</h2><p>Shop have a huge stock which is maintaned up to date</p></div>
            <div className="card"><h2>Purchase Item</h2><p>Our valued coustomers are welcomed to our stock to find what they need</p></div>
            <a href="/login" className="card">Log In If Not</a>
        </div>
    )
}

export default Home;
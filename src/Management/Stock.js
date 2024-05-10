import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";

function Stocks() {

    const [categories, setCategories] = useState([]);

    const { isAuthenticated, jwtToken, logout } = useAuth();

    const [edit, setedit] = useState(false);
    const [qty, setQty] = useState(0);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        //code to be triggered in the side effect
        if (isAuthenticated) {
            axios.get("http://localhost:8080/get categories", config)
                .then(function (response) {
                    setCategories(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }, [isAuthenticated], [categories]);

    return (
        <div>
            <header><button onClick={logout}>Logout</button></header><br/><br/>
            {categories && categories.map((category) => {
                {
                    category.map((item) => {
                        <div className="card">
                            <center>
                                <h2>{item.item}</h2>
                                <h7>{category.itemCategory}</h7>
                                if({edit}){
                                    <div>
                                        <input type="number" defaultValue={item.qty} onChange={(event) => {
                                            setQty(event.target.value);
                                        }} /><br />
                                        <button onClick={() => {
                                           
                                            axios.post("http://localhost:8080/set stock/"+item.itemId, qty , config)
                                                .then(function (response) {
                                                    console.log(response.data)
                                                }).catch(function (error) {
                                                    console.log(error);
                                                })

                                            setedit(false);
                                        }}>Change</button>
                                    </div>
                                }else{
                                    <div>
                                        <h7>{item.qty}</h7><br />
                                        <button onClick={() => {
                                            setedit(true);
                                        }}>Edit {item.item}</button>
                                    </div>
                                }
                            </center>
                        </div>
                    })
                }
            })}
            <footer className="footer"><center>
                <a href="/products editor">Item and Category Management</a>
                <a href="/stocks">Stock Data</a>
                <a href="/purchase">Purchase Page</a>
            </center></footer>
        </div>
    )
}

export default Stocks;
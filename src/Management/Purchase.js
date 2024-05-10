import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";

function Purchase() {
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState(null);
    {/**
            item : `${Item.item}`,
            qty :  event.target.value,
            itemWisePrice : itemWisePrice
    */}

    const { isAuthenticated, jwtToken, logout } = useAuth();

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

    const [purchased, setPurchased] = useState([]);
    const [noOfItem, setNoOfItem] = useState(0);
    const [itemWisePrice, setItemWisePrice] = useState(0.0);
    const [wholePrice, setWholePrice] = useState(0.0);

    return (
        <div>
            <header><button onClick={logout}>Logout</button><center><a href="#cart">View Cart</a><button onClick={() => {
                axios.put("http://localhost:8080/add purchase", purchased, config)
                    .then(function(response){
                        console.log(response.data);
                    }).catch(function(error){
                        console.log(error);
                    })
            }}>Purchase</button><a href="#stock">Add more to cart</a></center>
                <br /></header><br /><br /><br />

            <table id="cart" width="100%" border="2px" bgcolor="yellow">
                <thead>
                    <th>Item</th><th>Quantity</th><th>Unit Price</th><th>Price for Item</th><th bgcolor="orange">Remove</th>
                </thead>
                <tbody>
                    {purchased && purchased.map((purchasedItem) => {
                        <tr>
                            <td>{purchasedItem.item}</td><td>{purchasedItem.quantity}</td><td>{purchasedItem.unitPrice}</td><td>{purchasedItem.price}</td><td><button onClick={() => {
                                // Remove the purse item from the purchased array
                                const removePurseItem = (id) => {
                                    const newPurchased = purchased.filter(item => item.itemId !== id);
                                    setPurchased(newPurchased);
                                }

                                // Call the function to remove the purse item
                                removePurseItem(`${purchasedItem.itemId}`);
                            }}>Remove</button></td>
                        </tr>
                    })}

                </tbody>
            </table>
            <table>
                <tr></tr>
                <tr><td>No of Item</td><input type="number" value={noOfItem} /></tr>
                <tr><td>Whole Price</td><input type="number" value={wholePrice} /></tr>
            </table>
            <hr color="green" /><h7>Search your Item Here</h7><input type="text" defaultValue={item} onChange={(event) => {
                setItem(event.target.value);
            }} id="stock" />

            {categories.map((category) => {
                <div>
                    {category.map((Item) => {
                        <div className="card">
                            <h7>{Item.item}</h7><br />
                            <h7>{Item.price}</h7><br />
                            <h7>Available Quanity</h7><h7>{Item.qty}</h7><br />
                            <input type="number" onChange={(event) => {
                                let amount = `${event.target.value}` * `${item.price}`;
                                setItemWisePrice(amount);
                                let data = {
                                    item: `${Item.item}`,
                                    qty: event.target.value,
                                    itemWisePrice: itemWisePrice
                                }
                                setItem(data)
                            }} /><button onClick={() => {
                                if (`${item.item}` != `${Item.item}`) {
                                    alert(`First edit the Quantity`);
                                    return;
                                }
                                {
                                    category.map((existItem) => {
                                        if (`${existItem.item}` == `${Item.item}`) {
                                            alert(`First remove ${existItem.item} from the cart`);
                                            return;
                                        }
                                    })
                                }
                                let newQty = { noOfItem } + `${item.qty}`;
                                setPurchased([...purchased, item]);
                                setNoOfItem(newQty);
                                let newAmount = { wholePrice } + `${itemWisePrice}`;
                                setWholePrice(newAmount);
                            }}>Add To Cart</button>
                        </div>
                    })}
                </div>
            })}

            <footer className="footer"><center>
                <a href="/products editor">Item and Category Management</a>
                <a href="/stocks">Stock Data</a>
                <a href="/purchase">Purchase Page</a>
            </center></footer>
        </div>
    )
}

export default Purchase;
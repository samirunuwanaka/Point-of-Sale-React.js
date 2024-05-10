import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";

{/*<div className="card"></div>*/ }

function Products() {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    const [changerId, setChangerId] = useState("null");
    const [changer, setchanger] = useState("null");

    const { isAuthenticated, jwtToken, logout } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        //code to be triggered in the side effect
        if (isAuthenticated) {
            getCategories();
        }

    }, [isAuthenticated], [items], [categories]);

    const [itemCategory, setItemCategory] = useState("null");
    const [itemName, setItemName] = useState("null");
    const [price, setPrice] = useState(0.0);
    const [qty, setQty] = useState(0);

    function getCategories() {
        axios.get("http://localhost:8080/get catogries", config)
            .then(function (response) {
                setCategories(response.data);
            }).catch(function (error) {
                console.log(error);
            })
    }

    function handleCategoryChanger(event) {
        event.preventDefault();

        const data = {
            itemCategoryId: changerId,
            itemCategory: itemCategory
        }

        axios.post("http://localhost:8080/set category/"+changerId, itemCategory, config)
            .then(function (response) {
                getCategories();
                window.location.reload();
            }).catch(function (error) {
                console.log(error);
            })
    }

    function handleItemCategoryType(event) {
        setItemCategory(event.target.value);
    }

    function handleItemName(event) {
        setItemName(event.target.value);
    }

    function handleItemPrice(event) {
        setPrice(parseFloat(event.target.value));
    }

    function handleItemQty(event) {
        setQty(event.target.value);
    }

    function handleItemEdit() {
        const data = {
            item: itemName,
            price: price,
            itemCategory: itemCategory,
            qty: qty
        }

        axios.post("http://localhost:8080/set item", data, config)
            .then(function (response) {
                setItems(response.data);
            }).catch(function (error) {
                console.log(error);
            })
    }

    function handleItemDelete(id) {
        axios.delete("http://localhost:8080/item delete/"+id, config)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            <header><button onClick={logout}>Logout</button><center><a href="#create">New Category or Item</a></center></header><br/><br/>
            <h3>Categories in the shop</h3>
            {categories && categories.map((category) => (
                <div className="card">
                    <a href={category.itemCategory}><h2>{category.itemCategory}</h2></a><br />
                    <button onClick={() => {
                        setChangerId(category.itemCategoryId);
                        setchanger("category");
                        `editCategory${category.itemCategoryId}`.current.scrollIntoView({ behavior: 'smooth' });
                    }}>Edit ${category.itemCategory}</button><br />
                    <button onClick={() => {
                        axios.delete(`http://localhost:8080/category delete/${category.itemCategoryId}`, config)
                            .then(function (response) {
                                console.log(response);
                            }).catch(function (error) {
                                console.log(error);
                            })
                    }}>Delete</button>
                </div>
            ))}
            <br />
            {categories && categories.map((category) => (
                <div>
                    <div ref={`editCategory${category.itemCategoryId}`}>
                        if ({changer} == "category" && {changerId} == {category.itemCategoryId}) {
                            <form onSubmit={handleCategoryChanger}>
                                <input type="text" onChange={handleItemCategoryType} defaultValue={category.itemCategory} />
                                <button type="submit">Ok</button>
                            </form>
                        }else{
                            <h3>{category.itemCategory}</h3>
                        }
                    </div>
                    <table>
                        <thead>
                            <th>Item</th><th>Category</th><th>Price</th><th>Quantity</th><th></th><th></th>
                        </thead>
                        <tbody>
                            {category.map((itemInCategory) => (
                                <div>
                                    <tr>
                                        if({changer} == "item" && {changerId} == {itemInCategory.itemId}){
                                            <div>
                                                <td><input type="text" onChange={handleItemName} defaultValue={itemInCategory.item} /></td>
                                                <td>
                                                    <select onChange={handleItemCategoryType} defaultValue={itemInCategory.item}>
                                                        {categories.map((option) => (
                                                            <option value={option.itemCategory}>{option.itemCategory}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td><input type="number" onChange={handleItemPrice} defaultValue={itemInCategory.price}/></td>
                                                <td><input type="number" onChange={handleItemQty} defaultValue={itemInCategory.stocks.qty}/></td>
                                                <td></td>
                                                <td>
                                                    <button onClick={() => {
                                                        handleItemEdit();
                                                    }}>Ok</button>
                                                </td>
                                            </div>
                                        }else{
                                            <div>
                                                <td>{itemInCategory.item}</td>
                                                <td>{category.itemCategory}</td>
                                                <td>{itemInCategory.price}</td>
                                                <td>{itemInCategory.stocks.qty}</td>
                                                <td><button onClick={() => {
                                                    setChangerId(`${itemInCategory.itemId}`);
                                                    setchanger("item");
                                                }}>Edit</button></td>
                                                <td><button onClick={() => {
                                                    handleItemDelete(itemInCategory.itemId);
                                                }}>Delete</button></td>
                                            </div>
                                        }
                                    </tr>
                                </div>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}


            <div id="create">        {/*scroll using /*create.current.scrollIntoView({ behavior: 'smooth' });*/}
                <div className="card">
                    <h3>Create New ctaegory</h3>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        if (!`${itemCategory}`) {

                            axios.put("http://localhost:8080/add category", itemCategory, config)
                                .then(function (response) {
                                    console.log(response.data);
                                    window.location.reload();
                                }).catch(function (error) {
                                    console.log(error);
                                })
                        }
                    }}>
                        <center>
                            <h7>Category Name</h7>
                            <input type="text" onChange={handleItemCategoryType} defaultValue={itemCategory} /><br />
                            <button type="submiit">Create Category</button>
                        </center>
                    </form>
                    {/*create category*/}
                </div>
                <div className="card">
                    <h3>Create New Item</h3>
                    <center><form onSubmit={(event) => {
                        event.preventDefault();
                        if (!{ itemName }) {
                            const data = {
                                item: itemName,
                                price: price,
                                itemCategory: itemCategory
                            }

                            axios.put("http://localhost:8080/add item", data, config)
                                .then(function (response) {
                                    console.log(response.data);
                                    window.location.reload();
                                }).catch(function (error) {
                                    console.log(error);
                                })
                        }

                    }}>
                        <h7>Item Name</h7><input type="text" defaultValue={itemName} onChange={handleItemName} />
                        <br />
                        <h7>Price of Item</h7><input type="text" defaultValue={price} onChange={handleItemPrice} />
                        <br />
                        <h7>Category Of the Item</h7>
                        <select onChange={handleItemCategoryType} defaultValue={itemCategory}>
                            {categories.map((category) => (
                                <div>
                                    <option value={category.itemCategory}>{category.itemCategory}</option>
                                </div>
                            ))}
                        </select><br />
                        <button type="submit">Create Item</button>
                    </form></center>
                    {/*create Item*/}
                </div>
            </div>
            <footer className="footer"><center>
                <a href="/products editor">Item and Category Management</a>
                <a href="/stocks">Stock Data</a>
                <a href="/purchase">Purchase Page</a>
            </center></footer>
        </div>
    )
}

export default Products;
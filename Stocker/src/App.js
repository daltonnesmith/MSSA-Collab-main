import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, Component } from "react";
import Stock from "./Components/Stock";
import WebSocket from "./Components/WebSocket";
import LoginForm from "./Components/LoginForm";
import { DEFAULT_RECONNECT_INTERVAL_MS } from "react-use-websocket/dist/lib/constants";

function App() {
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123",
    };
    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");
    const Login = (detail) => {
        console.log(detail);

        if (
            detail.email == adminUser.email &&
            detail.password == adminUser.password
        ) {
            console.log("Logged In");
            setUser({
                name: detail.name,
                email: detail.email,
            });
        } else {
            console.log("failed to login");
            alert("INCORRECT LOGIN DETAILS");
        }
    };

    const Logout = () => {
        console.log("Logout");
        setUser({
            name: "",
            email: "",
        });
    };

    //alter the initial state to be a function that will on execute on initial render.
    const [btcStockList, setbtcStockList] = useState(() => {
        // get the last trade from localStorage
        const lastTrade = localStorage.getItem("btcStockList");
        // return JSON.parse(lastTrade);
    });
    const [ethStockList, setEthStockList] = useState(() => {
        // get the last trade from localStorage
        const lastTrade = localStorage.getItem("ethStockList");
        // return JSON.parse(lastTrade);
    });
    const onSetEthStockList = (stock) => {
        console.log(stock);
        if (ethStockList === null) {
            alert("Successful connection, currently Loading!");
        }
        // if (Object.keys(stock.data).length !== 0) {
        //   setbtcStockList((prev) => prev.concat(stock));
        // }
        //Returns data from the APIcall and sets to btcStockList for STOCK Component
        setEthStockList(stock.data.price);
    };

    // run each the the component mounts
    useEffect(() => {
        // if there are any elements in btcStockList, store it
        if (btcStockList !== null) {
            // conver the object into a string and store it
            localStorage.setItem("btcStockList", JSON.stringify(btcStockList));
        }
        if (ethStockList !== null) {
            localStorage.setItem("ethStockList", JSON.stringify(ethStockList));
        }
    });
    const onSetbtcStockList = (stock) => {
        console.log(stock);
        if (btcStockList === null) {
            alert("Successful connection, currently Loading!");
        }
        // if (Object.keys(stock.data).length !== 0) {
        //   setbtcStockList((prev) => prev.concat(stock));
        // }
        //Returns data from the APIcall and sets to btcStockList for STOCK Component
        return setbtcStockList(stock.data.price);
        // let ethResult = setbtcStockList(stock.data);
        // let btcResult = setbtcStockList(stock.data);
        // if (btcResult.data.channel === "live_trades_btcusd") {
        //     let btcStockList = btcResult.data.price;
        //     return btcStockList;
        // } else {
        //     let ethStockList = ethResult.data.price;
        //     return ethStockList;
        // }
    };
    const onDeleteStock = (id) => {
        let updatedList = [...btcStockList];
        updatedList.splice(id, 1);
        setbtcStockList(updatedList);
    };
    return (
        <div class="row">
            <div class="col-md-3" />
            <div class="col-md-6">
                <div class="App">
                    {/* <StockInput btcStockListHandler={onSetbtcStockList} /> */}
                    <h1 className="text-color:blue">Stocker</h1>
                    {/* WebSocket button Press for the most recent trade */}
                    <WebSocket
                        setbtcStockListHandler={onSetbtcStockList}
                        setEthStockListHandler={onSetEthStockList}
                    />
                    {/* {btcStockList.map((stock, index) => (
                                <Stock
                                    stockItem={stock}
                                    key={index}
                                    keyToManage={index}
                                    onDeleteStockHandler={onDeleteStock}
                                />
                            ))} */}
                    {/* Displays the crytocoin price in a card view */}
                    {btcStockList ? (
                        <Stock
                            btcItem={btcStockList}
                            //key={0}
                            keyToManage={0}
                            onDeleteStockHandler={onDeleteStock}
                        />
                    ) : (
                        ""
                    )}
                    {/* {ethStockList ? (
                                <Stock
                                    ethItem={ethStockList}
                                    //key={0}
                                    keyToManage={0}
                                    onDeleteStockHandler={onDeleteStock}
                                />
                            ) : (
                                ""
                            )} */}
                </div>
            </div>
            <div mx-5 className="App">
                {user.email != ""}
                <h2>
                    Welcome, <span>{user.name}</span>
                    <LoginForm Login={Login} error={error} />
                </h2>
                <button onClick={Logout}>Logout</button>
            </div>
            <div className="col-md-3" />
            <div></div>
        </div>
    );
}

export default App;

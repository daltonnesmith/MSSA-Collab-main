import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { assertIsWebSocket } from "react-use-websocket/dist/lib/util";

const WebSocket = (props) => {
    // const [liveTrades, setLiveTrades] = useState([]);
    // const { onDeleteStockHandler, keyToManage, stockItem} = props;
    // const socketUrl = "wss://echo.websocket.events";

    const socketUrl = "wss://ws.bitstamp.net";

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl);
    useEffect(() => {
        if (lastMessage !== null) {
            props.setbtcStockListHandler(JSON.parse(lastMessage.data));
            props.setEthStockListHandler(JSON.parse(lastMessage.data));
        }
    }, [lastMessage]);
    //JSON Message sent to API for Btc to USD
    const startLiveTradesBtc = () => {
        const apiCall = {
            event: "bts:subscribe",
            data: {
                channel: "live_trades_btcusd",
            },
        };
        sendMessage(JSON.stringify(apiCall));
        // Needed: Display the connection was successful and display loading
    };
    //JSON Message sent to API for Eth to USD
    const startLiveTradesEth = () => {
        const apiCall = {
            event: "bts:subscribe",
            data: {
                channel: "live_trades_ethusd",
            },
        };
        sendMessage(JSON.stringify(apiCall));
    };
    const stopLiveTradesBtc = () => {
        const apiCall = {
            event: "bts:unsubscribe",
            data: {
                channel: "live_trades_btcusd",
            },
        };
        sendMessage(JSON.stringify(apiCall));
    };
    const stopLiveTradesEth = () => {
        const apiCall = {
            event: "bts:unsubscribe",
            data: {
                channel: "live_trades_ethusd",
            },
        };
        sendMessage(JSON.stringify(apiCall));
    };

    return (
        <div>
            <button
                className="pb-1 mx-1 btn-dark"
                onClick={() => {
                    stopLiveTradesEth();
                    startLiveTradesBtc();
                }}
            >
                Show Bitcoin
            </button>
            <button
                className="pb-1 mx-1 btn-primary"
                onClick={() => {
                    startLiveTradesEth();
                    stopLiveTradesBtc();
                }}
            >
                Show Ethereum
            </button>
        </div>
    );
};

export default WebSocket;

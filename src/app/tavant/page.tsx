"use client";
import { useState } from "react";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { useSelector, Provider } from "react-redux";

interface State {
    month: string
}

interface Action {
    type: "month";
    payload: string;
}

const initialState = { "month": "Not Set" };

const reducer: Reducer<State,Action> = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case "month":
            return {
                ...state,
                month: action.payload,
            };
        default:
            return state;
    }
    
}

const store = configureStore({
   reducer,
   preloadedState: initialState
});

const A = () => {

    const month = "February";
    return (<div><button onClick={() => store.dispatch({ type: "month", payload: month })}>Set Month</button></div>)
}


const B = () => {
    const month = useSelector((state: State) => state.month);
    return (<div>{month}</div>)
}


function Tavant () {
    const [inputData, setInputData] = useState<string>("");

    const handleSubmit = async () => {
        
        const response = await Promise.allSettled([fetch("https://jsonplaceholder.typicode.com/posts/1"),
                                fetch("https://jsonplaceholder.typicode.com/posts/2"),
                                fetch("https://jsonplaceholder.typicode.com/posts/3")] );

        const data = await Promise.all(response.map(async (res) => {
            if (res.status === "fulfilled") {
                return res.value.json();
            } else {
                console.error(res.reason);
                return null; // or some other default value
            }
        }));
        
        console.log(data);
    }


    return (<>
    <input type="text" onChange={(e) => setInputData(e.target.value)} />
    <button disabled={!inputData} onClick={handleSubmit}>Submit</button>
    <Provider store={store}>
        <A />
        <B />
    </Provider>
    </>)
}

export default Tavant;
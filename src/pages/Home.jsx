import React from 'react';
import {Outlet} from "react-router-dom";
import "../styles/main.css";

function Home() {

    return (
        <div>
            <br/>
            <h1>Welcome</h1>
            <br/>
            <p>This is a dog walker website</p>
            <p>/admin-panel</p>
            <p>/admin-panel/update</p>
            <p>/user-overview</p>
            <Outlet/>
        </div>
    );
}

export default Home;
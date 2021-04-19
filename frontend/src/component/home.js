import React from "react"
import Header from "./header";

function Home(){

    return(
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3 login-form">
                <h1>Main page</h1>
                <p>This is a main page of a project</p>
            </div>
        </div>
    )
}

export default Home
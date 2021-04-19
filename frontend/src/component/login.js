import React, {useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import Header from "./header";

function Login(){
    const [email, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/relations")
        }
    }, [])

    async function auth(){
        let data = {email, password}

        let result = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)

        })
        result = await result.json()
        if (result.authorization) {
            localStorage.setItem('user-info', JSON.stringify(result))
            history.push("/relations")
        } else {
            alert(result.message)
            setPassword("")
        }
    }

    return(
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3 login-form">
                <h1>Login form</h1>
                <label>
                    Email
                </label>
                <input id="email" type="email" value={email} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="email"/>

                <label>
                    Password
                </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder=""/>
                <button onClick={auth} className="btn btn-primary">LogIn</button>
            </div>
        </div>
    )
}

export default Login
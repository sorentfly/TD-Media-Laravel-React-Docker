import React from "react";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

function Header(){
    const history = useHistory()

    let userInfo = JSON.parse(localStorage.getItem('user-info'));

    async function logOut(){

        fetch('http://127.0.0.1:8000/api/logout', {
            headers: {
                'Authorization': userInfo.authorization
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    localStorage.removeItem('user-info')
                    window.location.reload();
                }
            })
            .then(data => {
                if (data && data.message) {
                    alert(data.message)
                    localStorage.removeItem('user-info')
                    history.push("/login")
                }
            });
    }

    return(
        <div>
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Brand href="/">TD Media</Navbar.Brand>
                <Navbar.Toggle area-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto nav-link-wrapped">
                        {
                            (localStorage.getItem('user-info')) ?
                                <>
                                    <Link to="/relations">Relations</Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                </>
                        }
                    </Nav>
                    <Nav>
                        {
                            (localStorage.getItem('user-info')) ?
                                <NavDropdown title={userInfo && userInfo.name}>
                                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                :
                                null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
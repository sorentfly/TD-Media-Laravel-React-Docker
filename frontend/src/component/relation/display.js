import React, {useEffect, useState} from "react";
import Header from "../header";
import {Button, Table} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Display(){
    const history = useHistory();
    if (!localStorage.getItem('user-info')) {
        history.push('/login')
    }

    let userInfo = JSON.parse(localStorage.getItem('user-info'));
    let clientState = 'Client',
        bookState   = 'Book'

    const [relations, setRelations] = useState([]);
    const [clients,setClients]=useState([]);
    const [client,setClient]=useState(clientState);
    const [books,setBooks]=useState([]);
    const [book,setBook]=useState(bookState);

    const handleSelectClient=(e)=>{
        console.log(e);
        setClient(e)
    }
    const handleSelectBook=(e)=>{
        console.log(e);
        setBook(e)
    }

    useEffect(async () => {
        await getRelations();
        await getBooks();
        await getClients();
    }, []);

    async function getRelations(){
        let result = await fetch('http://127.0.0.1:8000/api/relation', {
            method: 'GET',
            headers: {
                'Authorization': userInfo.authorization,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        setRelations(result)
    }
    async function getClients(){
        let result = await fetch('http://127.0.0.1:8000/api/relation/clients', {
            method: 'GET',
            headers: {
                'Authorization': userInfo.authorization,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        setClients(result)
    }
    async function getBooks(){
        let result = await fetch('http://127.0.0.1:8000/api/relation/books', {
            method: 'GET',
            headers: {
                'Authorization': userInfo.authorization,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        setBooks(result)
    }

    async function deleteOperation(client_id, book_id){
        let data = {
            client_id: client_id,
            book_id: book_id
        };

        let result = await fetch('http://127.0.0.1:8000/api/relation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': userInfo.authorization
            },
            body: JSON.stringify(data)
        })

        if (!result.ok) {
            alert("Server-side error occurred");
        } else {
            await getRelations();
        }
    }

    async function addOperation(client_id, book_id){
        let data = {
            client_id: client_id,
            book_id: book_id
        };

        let result = await fetch('http://127.0.0.1:8000/api/relation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': userInfo.authorization
            },
            body: JSON.stringify(data)
        })

        if (!result.ok) {
            result = await result.json()
            alert(result.message);
        } else {
            await getRelations();
        }
    }




    return(
        <>
            <Header/>
            <div>
                <h1>List Relations component</h1>
                <Table striped bordered hover className="relations">
                    <thead>
                        <tr>
                            <th>Client fullname</th>
                            <th>Book title</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        relations.map((item) =>
                            <tr key={item.client.id + ' ' + item.book.id}>
                                <td><p>{item.client.fullname}</p></td>
                                <td><p>{item.book.title}</p></td>
                                <td><Button variant="danger" onClick={() => deleteOperation(item.client.id, item.book.id)}>Remove relation</Button></td>
                            </tr>
                        )
                    }
                    <tr>
                        <td>
                            <DropdownButton
                                alignRight
                                title="Client"
                                id="dropdown-client"
                                drop="right"
                                onSelect={handleSelectClient}
                                className="margin-bottom"
                            >
                                {
                                    clients.map((client) =>
                                        <Dropdown.Item key={client.id} eventKey={client.id}>{client.fullname}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            {/*<p id="client-selected">Харитонов Дмитрий Евгеньевич</p>*/}
                        </td>
                        <td>
                            <DropdownButton
                                alignRight
                                title="Book"
                                id="dropdown-book"
                                drop="right"
                                onSelect={handleSelectBook}
                                className="margin-bottom"
                            >
                                {
                                    books.map((book) =>
                                        <Dropdown.Item key={book.id} eventKey={book.id}>{book.title}</Dropdown.Item>
                                    )
                                }
                            </DropdownButton>
                            {/*<p id="book-selected">Книга 4</p>*/}
                        </td>
                        <td>
                            <Button onClick={() => addOperation(client, book)}>Add relation</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Display
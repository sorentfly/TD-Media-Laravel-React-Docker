import React, {Component, useEffect, useState} from "react";
import {withRouter} from "react-router-dom"
import Header from "../header";
import {Button, Table} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-js-pagination";


class Display extends Component{
    constructor(props) {
        super(props);
        if (!localStorage.getItem('user-info')) {
            props.history.push('/login')
        } else {
            this.api = JSON.parse(localStorage.getItem('user-info')).authorization
        }
    }
    state = {
        // userInfo:   JSON.parse(localStorage.getItem('user-info')),
        // current_page: 1,
        pagination: null,
        clients:    null,
        books:      null,
        client:     null,
        book:       null
    }


    async componentDidMount(){
        await this.getPagination();
        await this.getBooks();
        await this.getClients();
        // console.log(this.state)
    }

    renderRelationsRows(){
        const {data, current_page, per_page, total} = this.state.pagination
        // console.log(data, current_page, per_page, total)
        return (
            data.map((book_client) =>
                <tr key={book_client.id}>
                    <td><p>{book_client.fullname}</p></td>
                    <td><p>{book_client.title}</p></td>
                    <td><Button variant="danger" onClick={() => this.deleteOperation(book_client.client_id, book_client.book_id)}>Remove relation</Button></td>
                </tr>
            )
        )
    }

    renderAddRelationRow(){
        const {clients, client, books, book} = this.state;
        const handleSelectClient=(e)=>{
            console.log(e);
            this.setState({
                client: e
            })
        }
        const handleSelectBook=(e)=>{
            console.log(e);
            this.setState({
                book: e
            })
        }

        return(
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
                        {clients.map((item) => {
                                return <Dropdown.Item key={item.id}
                                                      eventKey={item.id}>{item.fullname}</Dropdown.Item>
                        })}
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
                        {books.map((item) => {
                                return <Dropdown.Item key={item.id} eventKey={item.id}>{item.title}</Dropdown.Item>
                        })}
                    </DropdownButton>
                </td>
                <td>
                    <Button onClick={() => this.addOperation(client, book)}>Add relation</Button>
                </td>
            </tr>
        )
    }
    renderPaginator(){
        const {current_page, per_page, total} = this.state.pagination;
        return(
            <div className="mt-3 pagination-center">
                <Pagination
                    totalItemsCount={total}
                    activePage={current_page}
                    itemsCountPerPage={per_page}
                    onChange={(pageNumber) => this.getPagination(pageNumber)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
        )
    }

    async getPagination(page = 1){
        let result = await fetch(`http://127.0.0.1:8000/api/relation?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': this.api,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        console.log(result)
        this.setState({
            pagination: result
        })
    }
    async getClients(){
        let result = await fetch('http://127.0.0.1:8000/api/relation/clients', {
            method: 'GET',
            headers: {
                'Authorization': this.api,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        this.setState({
            clients: result
        })
    }
    async getBooks(){
        let result = await fetch('http://127.0.0.1:8000/api/relation/books', {
            method: 'GET',
            headers: {
                'Authorization': this.api,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        result = await result.json()
        this.setState({
            books: result
        })
    }

    async deleteOperation(client_id, book_id){
        let data = {
            client_id: client_id,
            book_id: book_id
        };

        let result = await fetch('http://127.0.0.1:8000/api/relation', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': this.api
            },
            body: JSON.stringify(data)
        })

        if (!result.ok) {
            result = await result.json()
            alert(result.message)
        } else {
            await this.getPagination(this.state.pagination.current_page);
        }
    }
    async addOperation(client_id, book_id){
        let data = {
            client_id: client_id,
            book_id: book_id
        };

        let result = await fetch('http://127.0.0.1:8000/api/relation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': this.api
            },
            body: JSON.stringify(data)
        })

        if (!result.ok) {
            result = await result.json()
            alert(result.message);
        } else {
            await this.getPagination(this.state.pagination.current_page);
        }
    }



    render() {
        const { pagination, clients, books } = this.state

        return(
            <>
                <Header/>
                <div>
                    <h1>List Relations component</h1>
                    { pagination && this.renderPaginator() }
                    <Table striped bordered hover className="relations">
                        <thead>
                        <tr>
                            <th>Client Full Name</th>
                            <th>Book Title</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        { clients && books && this.renderAddRelationRow() }
                        { pagination && this.renderRelationsRows() }
                        </tbody>
                    </Table>

                </div>
            </>
        )
    }
}

// import {useHistory} from 'react-router-dom'
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Pagination from "react-js-pagination";

export default withRouter (Display)
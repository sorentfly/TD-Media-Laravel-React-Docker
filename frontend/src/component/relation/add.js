import React,{useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import {Button} from "react-bootstrap";

function Add(){
    const [client,setClient]=useState('Select Client');
    const [book,setBook]=useState('Select Book');
    const handleSelectClient=(e)=>{
        console.log(e);
        setClient(e)
    }
    const handleSelectBook=(e)=>{
        console.log(e);
        setBook(e)
    }

    return(
        <div>
            <h1>Add Relation component</h1>
            <DropdownButton
                alignRight
                title={client}
                id="dropdown-menu-align-right"
                onSelect={handleSelectClient}
            >
                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
                alignRight
                title={book}
                id="dropdown-menu-align-right"
                onSelect={handleSelectBook}
            >
                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
            </DropdownButton>
            <Button>Add relation</Button>
            <h4>You selected {client}</h4>
            <h4>You selected {book}</h4>
        </div>
    )
}

export default Add
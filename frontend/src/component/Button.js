import React, {Component} from "react";

class Button extends Component {
    render() {
        const { userInfo, relation} = this.props;

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
                // await getRelations();
            }
        }


        return <Button variant="danger" onClick={() => deleteOperation(relation.client.id, relation.book.id)}>Remove relation</Button>

    }
}

export default Button
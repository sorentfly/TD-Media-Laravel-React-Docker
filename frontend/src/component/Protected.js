import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";


function Protected(props){
    // Check for protection
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push('/login')
        }
    })

    // Render component
    let Cmp = props.Cmp;
    return (
        <div>
            <Cmp />
        </div>
    )
}

export default Protected
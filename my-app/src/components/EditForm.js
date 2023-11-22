import React, {useState, useEffect} from 'react';

function EditForm(){

    const [dataBase, setDataBase] = useState('');
    console.log(dataBase)

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/dataforms')
        .then (response=> response.json())
        .then(response => console.log(response))
        .then(data => setDataBase(data))
    },[]);

    return (
        <div>
            <h1>EditForm Page</h1>

        </div>
    )
}

export default EditForm;
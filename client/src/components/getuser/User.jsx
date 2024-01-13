import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import "./user.css";
import { Link } from 'react-router-dom'


const User = () => {

    // use useState and use useEffect
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        // fetch data from server
        const fetchData = async()=>{
            const response = await axios.get("http://localhost:8000/api/getall")
            setUsers(response.data);

        }

        fetchData();
    },[])
   // delete data from server and client
    const deleteUser = async(userId)=>{
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=> prevUser.filter((user)=>user._id !== userId))
            toast.success(response.data.msg, {position: 'top-center'})

            console.log(response);
        })
            

        
        .catch((error)=>{
            console.log(error);
        })

    }
    return (
    
        <div className='userTable'>
            <Link to={"/add"} className='addButton'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead class="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Items</th>

                        <th>Categories</th>
                        <th>Price</th>
                        <th>Payment_Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // use map method to put the data in the client from server db
                       users.map((user, index)=>{
                        return(
                            <tr key={user._id}>
                        <td>{index+1}</td>
                        <td>{user.item_name} </td>
                        <td>{user.categorie_name}</td>
                        <td><span>&#8377;&nbsp;</span>{user.price}</td>
                        <td>{user.status}</td>
                        <td>{user.date}</td>
                        <td className='actionButtons'>
                            <button onClick={()=> deleteUser(user._id)}>Delete</button>
                            <Link to={`/edit/`+user._id}>Edit</Link>
                        </td>
                    </tr>
                        )
                       })
                    }
                    
                </tbody>
            </table>

        </div>

    )
}

export default User
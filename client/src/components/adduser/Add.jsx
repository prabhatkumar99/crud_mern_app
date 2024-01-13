import React, { useState } from 'react'
import axios from "axios";
import "./add.css";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Add = () => {

    const users = {
        item_name:"",
        categorie_name:"",
        price:"",
        status:"",
        date:""


    }

    const[user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler =(e)=>{
        const {name, value}= e.target;

         setUser({...user, [name]:value});

        console.log(user);
    
    }
    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
        .then((response)=>{
            toast.success(response.data.msg, {position:"top-center"})
            navigate("/")
            console.log(response);
        }).catch(error => console.log(error))
    }
  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new Items</h3>
        <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlfor="item_name">Items</label>
            <input type="text" onChange={inputHandler}  id="item_name" name="item_name" autoComplete='off' placeholder="enter items"/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="categorie_name">Categories</label>
            <input type="text" onChange={inputHandler} id="categorie_name" name="categorie_name"  placeholder="enter categorie"/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="price">Price &#8377;</label>
            <input type="Number" onChange={inputHandler} id="price" name="price"  placeholder=""/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="payment_status">Payment_Status</label>
            <div className="radioInline">
                <input type="radio" onChange={inputHandler} id="radio-4" name="status" value="Accepted" />
                <label for="radio-4" class="radio-label">Accepted</label>
            </div>
            <div className="radioInline">
                <input type="radio" onChange={inputHandler} id="radio-5" name="status" value="Failed" />
                <label for="radio-5" class="radio-label">Failed</label>
            </div>
            <div className="radioInline">
                <input type="radio" onChange={inputHandler} id="radio-6" name="status" value="Processing" />
                <label for="radio-6" class="radio-label">Processing</label>
            </div>
        </div>
        <div className='inputGroup'>
            <label htmlfor="date">Date</label>
            <input type="date" onChange={inputHandler} id="date" name="date"/>
        </div>
        <div className="inputGroup">
            <button type="submit">Add Items</button>
        </div>
        </form>
    </div>
  )
}

export default Add
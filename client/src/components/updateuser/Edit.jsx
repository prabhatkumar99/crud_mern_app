import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        item_name:"",
        categorie_name:"",
        price:"",
        status:"",
        date:""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e)=>{
        const{name, value} = e.target;
        setUser({...user,[name]:value});
        console.log(user);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((response)=>{
            setUser(response.data)
            console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
        .then((response)=>{
            toast.success(response.data.msg, {position:"top-center"})
            navigate("/")
            console.log(response);
        }).catch(error => console.log(error))
    }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update Items</h3>
        <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlfor="item_name">Items</label>
            <input type="text" value={user.item_name} onChange={inputChangeHandler}  name="item_name" autoComplete='off' placeholder="enter items"/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="categorie_name">Categories</label>
            <input type="text" value={user.categorie_name} onChange={inputChangeHandler}  name="categorie_name"  placeholder="enter categorie"/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="price">Price &#8377;</label>
            <input type="Number" value={user.price} onChange={inputChangeHandler}  name="price"  placeholder=""/>
        </div>
        <div className='inputGroup'>
            <label htmlfor="payment_status">Payment_Status</label>
            <div className="radioInline">
                <input type="radio" checked={user.status==='Accepted'}   onChange={inputChangeHandler}  name="status" value="Accepted" />
                <label htmlfor="status"  class="radio-label">Accepted</label>
            </div>
            <div className="radioInline">
                <input type="radio" checked={user.status==='Failed'}  onChange={inputChangeHandler}  name="status" value="Failed" />
                <label htmlfor="status" class="radio-label">Failed</label>
            </div>
            <div className="radioInline">
                <input type="radio" checked={user.status==='Processing'}  onChange={inputChangeHandler}  name="status" value="Processing" />
                <label htmlfor="status" class="radio-label">Processing</label>
            </div>
        </div>
        <div className='inputGroup'>
            <label htmlfor="date">Date</label>
            <input type="date" value={user.date} onChange={inputChangeHandler}  name="date"/>
        </div>
        <div className="inputGroup">
            <button type="submit">Update Items</button>
        </div>
        </form>
    </div>
  )
}

export default Edit
// import module
import User from "../model/userModel.js";

// create data and save to database
export const create = async(req,res)=>{
    try {

        const userData = new User(req.body);
        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }
        await userData.save();
        
        res.status(200).json({msg:"Item Created Successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
        
    }
}

// get All data from database
export const getAll = async(req,res)=>{
    try {
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }
        console.log(userData);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

// get one data from database
export const getOne = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
           return res.status(404).json({msg: "user not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

// update data from database
export const update = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
           return res.status(401).json({msg: "user not found"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        // res.status(200).json({updatedData});
        res.status(200).json({msg: "Item updated Successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

// delete data from database
export const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
           return res.status(404).json({msg:"user not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg:"item deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

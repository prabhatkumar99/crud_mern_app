//import module from library framework
import mongoose from "mongoose";

// model Schema Structure
const userSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },

    categorie_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: String,
    date: String
})

export default mongoose.model("User", userSchema);
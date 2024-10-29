import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        id:{
            type: String,
            requerid: true,
         },
         name:{
            type: String,
            requerid: true,
         },
         products:[
            {
                id:{
                    type: Number,
                    requerid: true,
                },
                name:{
                    type: String,
                    requerid: true,
                },
                price:{
                    type: Number,
                    requerid: true,
                },
                category:{
                    type: String,
                    requerid: true,
                },
                url: {
                    type: String,
                    requerid: true,
                },
                quantity: {
                    type: String,
                    requerid: true,
                },
            },
         ],
         status:{
            type: String,
            requerid: true,
         },
    },
    
},
{
    timestamps: true,
})

export default mongoose.model('Order', OrderSchema)
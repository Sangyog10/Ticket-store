import mongoose from "mongoose";
import { OrderStatus } from "@santicket/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs{
    id:string;
    version:number;
    userId:string;
    price:number;
    status:OrderStatus;
}

interface OrderDocs extends mongoose.Document{
    version:number;
    userId:string;
    price:number;
    status:OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDocs>{
    build(attrs:OrderAttrs):OrderDocs;
}

const orderSchema=new mongoose.Schema({
    price:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey','version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build=(attrs:OrderAttrs)=>{
    return new Order({
        _id:attrs.id,
        version:attrs.version,
        price:attrs.price,
        userId:attrs.userId,
        status:attrs.status
    })
}

const Order=mongoose.model<OrderDocs,OrderModel>('Order',orderSchema)

export {Order}
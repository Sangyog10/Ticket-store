import mongoose from "mongoose";

interface PaymentAtters{
    orderId:string;
    stripeId:string;
}

interface PaymentDoc extends mongoose.Document{
    orderId:string;
    stripeId:string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc>{
    build(attrs:PaymentAtters):PaymentDoc;
}

const paymentSchema=new mongoose.Schema({
    orderId:{
        type:String,
        requried:true
    },
    stripeId:{
        type:String,
        requried:true
    },
},{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
        }
    }
})

paymentSchema.statics.build=(attrs:PaymentAtters)=>{
    return new Payment(attrs)
}

const Payment=mongoose.model<PaymentDoc,PaymentModel>('Payment',paymentSchema)

export {Payment}
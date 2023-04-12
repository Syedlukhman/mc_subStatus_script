const express=require("express")
const app=express()
const _=require('lodash');
app.use(express.json())
const {createCollectionInstance}=require('./mongodb')
const { ObjectId } = require('mongodb');


const updateMcSubStatus=async()=>{
    const iMemoryCard=await createCollectionInstance('memorycards');
    const memorycards=await iMemoryCard.find({subStatus:{$exists:false}}).toArray();
    const mcTransactionDb=await createCollectionInstance('mctransactionlogs');
    for(let mc of memorycards){
        // if(mc.status==="ready"){
        //     const updateMc=await iMemoryCard.updateOne({_id:new ObjectId(mc._id)},{
        //         $set:{
        //             subStatus:"ready"
        //         }
        //     })
        // }
        if(mc.status==="busy"){
            const [log]=await mcTransactionDb.find({qrCode:mc.qrCode}).sort({_id:-1}).toArray();
            if(log.isReceived && log.isEmpty){
            //      const updateMc=await iMemoryCard.updateOne({_id:new ObjectId(mc._id)},{
            //     $set:{
            //         subStatus:"copyPending"
            //     }
            // })
            }
            if(!log.isReceived && !log.isEmpty){
            //      const updateMc=await iMemoryCard.updateOne({_id:new ObjectId(mc._id)},{
            //     $set:{
            //         subStatus:"inShoot"
            //     }
            // })
            }
        }
    }
}
updateMcSubStatus();
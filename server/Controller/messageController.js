


const message = (req,res)=>{
  console.log("Message Received");
    res.status(200).json({message: "Message Received"})
}
module.exports={ message};
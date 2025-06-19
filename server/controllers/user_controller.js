import {User} from "../models/user.js"

export const login = (req, res) => {
    res.send("Login request received");
};

export const newUser=async (req,res)=>{
  const avatar={
    public_id:"nkanxa",
    url:"nkanka"
  };


  await User.create({name:"cha",username:"chan",password:"chama"});
res.status(201).json({message:"user created successfully"});
};


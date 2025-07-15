import { userSocketIDs } from "../server";

export const getSockets= (users=[])=>{
return  users.map((user)=>userSocketIDs.get(user._id.toString()));


};
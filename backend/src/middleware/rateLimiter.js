import ratelimit from "../config/upstash.js";
import dotenv from 'dotenv';


const rateLimiter = async(req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("my-rate-limit")
        if(!success){return res.status(429).json({message : "Too many requests"})}
        next();
    }catch(err){
        console.log("Rate limit error",err)
        next(err);
    }
}

export default rateLimiter
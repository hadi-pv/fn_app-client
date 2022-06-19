

export default function signuphandler(req,res){
    const {email,name,age}=req.body
    console.log([email,name,age])
    if(email=='email@gmail.com'&& name=='hadi'&& age=='21'){
        res.status(201).json({message:"Success"})
    }else{
        res.status(500).json({message:"Invalid signup"})
    }
}
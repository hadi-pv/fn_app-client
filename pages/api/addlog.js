import { v4 as uuidv4 } from 'uuid'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
    const id=uuidv4();

    const {user_id, news_id, task, send_to, startTime, currTime} = req.body;
    // convert start time and current time to integer seconds and subtract
    const time_in_sec = Math.floor((currTime - startTime) / 1000);

    const queryText="insert into logs(id,user_id,news_id,task,send_to,time_in_sec) values($1,$2,$3,$4,$5,$6);"
    const queryValues=[id,user_id,news_id,task,send_to,time_in_sec]

    var client
    try{
        client= await dbClient.connect()
        await client.query('BEGIN')
        const result=await client.query(queryText,queryValues)
        await client.query('COMMIT')

        res.status(200).send({
            message:"success"
        })
    }catch(e){
        console.log(e)
        client.query('ROLLBACK',(err)=>null)
        res.status(500).send({
            message:"Server Error"
        })
    }finally{
        if (client){
            client.release()
        }
    }
    return
}

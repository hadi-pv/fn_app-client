import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
    const id=uuidv4()

    const {news_id,user_id,task,rt,send_to,close_from,time_in_sec,add_info}=req.body

    const queryText='insert into logs(id,news_id,user_id,task,rt,send_to,close_from,time_in_sec,add_info) values($1,$2,$3,$4,$5,$6,$7,$8,$9);'
    const queryValues=[id,news_id,user_id,task,rt,send_to,close_from,time_in_sec,add_info]

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
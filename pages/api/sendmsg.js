import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
  const id=uuidv4()

    const {fk_news_id,send_to,send_by,time_taken}=req.body

    const queryText='insert into message(id,fk_news_id,send_to,send_by,timetaken) values($1,$2,$3,$4,$5);'
    const queryValues=[id,fk_news_id,send_to,send_by,time_taken]

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
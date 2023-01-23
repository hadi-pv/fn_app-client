import axios from 'axios'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
    
  const {send_by}=req.body

  const queryText='select * from message where send_by=$1'
  const queryValues=[send_by]
    console.log(req.body,queryValues)
  try{
      await dbClient.connect()
      

      const result=await dbClient.query(queryText,queryValues)
      if(result.rowCount==0){
          res.status(200).send('No data')
      }

      res.status(200).send({
          message:Array.from(
              result.rows,(row)=>{
                  const {id,fk_news_id,send_by,send_to}=row
                  return {fk_news_id,send_to}
              }
          )
      })
  }catch(e){
      console.log(e)
      res.status(500).send({
          message:"Server Error"
      })
  }
  return
  
  
}
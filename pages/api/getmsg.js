import axios from 'axios'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
  const {send_by}=req.body

  const queryText='select news.news_id as news_id,news.author as author,news.headline as headline,news.info as info,news.image_link as image_link,message.send_to as send_to from news inner join message on news.news_id=message.fk_news_id and message.send_by=$1;'
  const queryValues=[send_by]

  try{
      await dbClient.connect()

      const result=await dbClient.query(queryText,queryValues)

      if(result.rowCount==0){
          res.status(200).send()
      }

      res.status(200).send({
          message:Array.from(
              result.rows,(row)=>{
                  const {news_id,author,image_link,headline,info,send_to}=row
                  return {news_id,author,image_link,headline,info,send_to}
              }
          )
      })
  }catch(e){
    console.log("error")
      console.log(e)
      res.status(500).send({
          message:"Server Error"
      })
  }
  return
  
  
}
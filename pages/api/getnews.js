// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import dbClient from './postgres/postgres'

export default async function handler(req, res) {
  const queryText='select * from news;'
  const queryValues=[]

  try{
      await dbClient.connect()

      const result=await dbClient.query(queryText,queryValues)

      res.status(200).send({
          message:Array.from(
              result.rows,(row)=>{
                  const {news_id,author,image_link,headline,info,description}=row
                  return {news_id,author,image_link,headline,info,description}
              }
          )
      })
  }catch(e){
      console.log(e)
      res.status(500).send()
  }
  return
  
}

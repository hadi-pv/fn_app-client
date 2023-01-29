import axios from "axios"
import dbClient from './postgres/postgres'
import { v4 as uuidv4 } from 'uuid';

export default async function signuphandler(req,res){
  const {name,email,age,gender,motherTongue,homeState,educationalQualification,educationalBackground,occupation,collegeName,socialMediaUsage,socialMediaUsageOrder,socialMediaUsageTime,isWhatsappGroupMember,whatsappUsageFrequencyForNews,prefferedLanguageOnSocialMedia,family,friend,colleague,rt,nt,datetime}=req.body;

  const user_id=uuidv4();

  const queryText="insert into users(user_id,name,email,age,gender,motherTongue,homeState,educationalQualification,educationalBackground,occupation,collegeName,socialMediaUsage,socialMediaUsageOrder,socialMediaUsageTime,isWhatsappGroupMember,whatsappUsageFrequencyForNews,prefferedLanguageOnSocialMedia,family,friend,colleague,ratingtype,newstype,datetime) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)"
  const queryValues=[user_id,name,email,age,gender,motherTongue,homeState,educationalQualification,educationalBackground,occupation,collegeName,socialMediaUsage,socialMediaUsageOrder,socialMediaUsageTime,isWhatsappGroupMember,whatsappUsageFrequencyForNews,prefferedLanguageOnSocialMedia,family,friend,colleague,rt,nt,datetime]

  var client
  try{
      client = await dbClient.connect()
      console.log('userrouter signup')
      await client.query('BEGIN')
      const result = await client.query(queryText,queryValues)
      await client.query('COMMIT')
      res.status(200).send(user_id)
      
  } catch (e) {
      console.log(e)
      client.query('ROLLBACK', (err) => null)
      res.status(500).send()
  }finally{
      if (client) client.release()
  }

  return
}
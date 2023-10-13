import type { NextApiRequest, NextApiResponse } from 'next'
import { signInWithEmailAndPassword } from "firebase/auth";
import {set, get, getDatabase, ref} from 'firebase/database'
import { db } from "../../../fireBaseConfig";
import { users } from '../../../fireBaseConfig'
import { authTypes, user } from '../../../types/authTypes';


export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {email, password} = req.body as authTypes['credentials']
  try{
     const userCredentials = await signInWithEmailAndPassword(users, email, password)
      if(userCredentials.user) {
    const db = getDatabase()
    const userSnapshot = await get(ref(db, `users/${userCredentials.user.uid}`))
    if(userSnapshot.val()){
      const userData = userSnapshot.val()
      const user: user = {
        isAuth: true,
        role: 'user',
        uid: userCredentials.user.uid,
        email: userData.email,
        name: userData.name,
        sirname: userData?.surname,
        notifications: {
    type: 'success',
    status: 'success', 
    message: 'success'
  },
          }
      return res.send({status: 'success'})
    }
  }
  }catch(error: any){
    console.log(error)
      return res.status(400).send({error: error.message})
    }
}
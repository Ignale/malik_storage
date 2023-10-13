import type { NextApiRequest, NextApiResponse } from 'next'
import { authTypes } from '../../../types/authTypes';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {set, get, getDatabase, ref} from 'firebase/database'
import { db } from "../../../fireBaseConfig";
import { users } from '../../../fireBaseConfig'


export default async function (request: NextApiRequest, response: NextApiResponse) {

  console.log(request.body)
  const credentials = request.body as authTypes['signUpCredentials']
  const {email, password, firstName, secondName} = credentials
   const res = await createUserWithEmailAndPassword(users, email, password)
  if (res.user) {
    try{
    await updateProfile(res.user, {
      displayName: `${firstName} ${secondName}`
    })
    const userInfo = {
      email: res.user.email,
      uid: res.user.uid,
      role: 'user',
      name: firstName,
      sirname: secondName,
    }
        const fetchUser = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/users/${res.user.uid}.json`,({
      body: JSON.stringify({email: userInfo.email,
      uid: userInfo.uid,
      name: userInfo.name,
      sirname: userInfo.sirname,
      role: userInfo.role}),
      method: 'PUT'
    }))
    if (!fetchUser.ok) {
      const error = await fetchUser.json()
      console.log(error)
      throw new Error(error)
      
    } else { 
      const user = await fetchUser.json()
      return response.redirect('/allproducts')
    }

    } catch (error: any) {
     console.log(error)
      return response.status(400).send({error: error.message})
    
    }
  }
    return response.status(200).json(res)
}
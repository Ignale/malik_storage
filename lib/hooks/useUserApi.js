import { useRouter } from 'next/navigation'
import { useState, useCallback } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { users } from '../../fireBaseConfig'


const useUserApi = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const resetError = useCallback(() => {
    setError(null)
  })

  const login = async ({ email, password }) => {
    setError(null)
    setLoading(true)
    try {
      const userCredentials = await signInWithEmailAndPassword(users, email, password)
      if (userCredentials.user) {
        router.push('/allproducts')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.message)
      return { error: error.message }
    }
    setLoading(false)
  };

  const register = async ({ firstName, secondName, email, password }) => {
    setError(null)
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(users, email, password)
      if (res.user) {
        try {
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
          const fetchUser = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/users/${res.user.uid}.json`, ({
            body: JSON.stringify({
              email: userInfo.email,
              uid: userInfo.uid,
              name: userInfo.name,
              sirname: userInfo.sirname,
              role: userInfo.role
            }),
            method: 'PUT'
          }))
          if (!fetchUser.ok) {
            setLoading(false)
            const error = await fetchUser.json()
            throw new Error(error)

          }
        } catch (error) {
          setLoading(false)
          console.log(error)
          setError(error.message)
          return { error: error.message }
        }
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.message)
      return { error: error.message }
    }
    setLoading(false)
    router.push('/allproducts')
  };



  return { login, register, loading, error, resetError }

}
export default useUserApi;
"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { AuthContext } from "@context/authContext"
import useForm from "@hooks/useForm"
import { REGISTER_USER } from "@queries/auth"
import styles from './signup.module.scss'
import routes from "@lib/routes"
import Link from "next/link"
import Nav from "@components/nav/Nav"

export default function Auth(){
  const router = useRouter()
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState<string>()

  const { onChange, onSubmit, values } = useForm(handleSubmit, {
    email: "",
    password: ""
  })

  useEffect(() => {
    if(context.user!=null) router.push(routes.dashboard)
  }, [context.user, router])

  const [regisiterUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData }}){
      context.login(userData)
      router.push(routes.dashboard)
    },
    onError(e){
      setErrors(e.message)
    },
    variables: { email: values.email,  password: values.password }
  })

  async function handleSubmit(){
    console.log(values)
    regisiterUser()
  }

  return (
    <main className={styles.auth}>
      <Nav/>

      <h2>Sign up to The Motivation Scale</h2>  

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter your email..." onChange={onChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Entry your password..." onChange={onChange} required />

        <input type="submit" value="Sign up"/>
      </form>
      <Link href={routes.login}>Already have an account? Login</Link>
      {errors ?
        <p className={styles.errors}>{errors}</p>
      : undefined}
    </main>
  )
}

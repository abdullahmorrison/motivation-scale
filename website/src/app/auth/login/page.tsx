"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { AuthContext } from "@context/authContext"
import useForm from "@hooks/useForm"
import { LOGIN_USER } from "@queries/auth"
import styles from './login.module.scss'
import routes from "@lib/routes"
import Link from "next/link"

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

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData }}){
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
    loginUser()
  }

  return (
    <main className={styles.auth}>
      <h2>Login to The Motivation Scale</h2>  

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter your email..." onChange={onChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Entry your password..." onChange={onChange} required />

        <input type="submit" value="Login"/>
      </form>
      <Link href={routes.signup}>Don&apos;t have an account? Sign up</Link>
      {errors ?
        <p className={styles.errors}>{errors}</p>
      : undefined}
    </main>
  )
}

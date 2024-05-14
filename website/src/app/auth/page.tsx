"use client"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@apollo/client"
import { AuthContext } from "@/context/authContext"
import useForm from "@/hooks/useForm"
import { LOGIN_USER } from "@/queries/auth"
import styles from './auth.module.scss'

export default function Auth(){
  const router = useRouter()
  const context = useContext(AuthContext)

  const { onChange, onSubmit, values } = useForm(handleSubmit, {
    email: "",
    password: ""
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData }}){
      context.login(userData)
      router.push("/dashboard")
    },
    onError({ graphQLErrors }){
      console.log(graphQLErrors)
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
      <a href="">Don't have an account? Sign up</a>
    </main>
  )
}

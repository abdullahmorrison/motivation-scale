"use client"
import { useState } from "react";

export default function useForm(callback: (...values: any)=>{}, initialState: any = {}){
  const [values, setValues] = useState(initialState)

  function onChange(event: any){
    setValues((prevValues: any) => { return { ...prevValues, [event.target.name]: event.target.value}})
  }
  function onSubmit(event: any){
    event.preventDefault()
    callback()
  }
  return { onChange, onSubmit, values }
}

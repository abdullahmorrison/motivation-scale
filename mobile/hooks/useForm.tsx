import { useState } from "react"

export default function useForm(callback: (...values: any)=>{}, initialState: any = {}){
  const [values, setValues] = useState(initialState)

  function onChange(key: any, value: any){
    setValues((prevValues: any) => { return { ...prevValues, [key]: value}})
  }
  function onSubmit(){
    callback()
  }
  return { onChange, onSubmit, values }
}

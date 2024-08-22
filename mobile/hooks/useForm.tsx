import { useState } from "react"

export default function useForm<T extends object>(callback: ()=>void, initialState: T = {} as T){
  const [values, setValues] = useState<T>(initialState)

  function onChange(key: keyof T, value: T[keyof T]){
    setValues((prevValues: T) => { return { ...prevValues, [key]: value}})
  }
  function onSubmit(){
    callback()
  }
  return { onChange, onSubmit, values }
}

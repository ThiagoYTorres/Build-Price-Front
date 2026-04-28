import React from 'react'
import { Button } from './components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { CheckCircle2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
function Teste() {
    const [logado,setLogado] = React.useState(null)
    const [alert,setAlert] = React.useState(false)
    const [token, setToken] =  React.useState('')

    React.useEffect( () => {
      if(alert){
        const timer = setTimeout( () => setAlert(false), 3000)
        return () => clearTimeout(timer)  
      }
    },[alert])

    async function login(formData){
      const user = {
        email:formData.get('email'),
        password:formData.get('password'),

      }

      try{
         const response = await fetch('http://localhost:8080/api/v1/auth/login',{
          method:"POST",
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(user)
         })

         if(response.ok){
          setAlert(true)
          setLogado(true)
        }
        else{
           setAlert(true)
           const tokenData = await response.json()
           setToken(tokenData.message)
          console.log(tokenData)
          console.log('Erro no login')
          setLogado(false)
         }
      }
      catch(error){
        console.error(error)
      }
    }

    console.log(token)


  return (
    <div className='flex justify-center items-center h-screen flex-col'>

    <Card className="w-full max-w-sm p-3 ">
        <form action={login}>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold pt-10">Build Price</CardTitle>
        <CardDescription className="text-center  mb-7">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2 mb-5">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
                <Input id="password" type="password" name="password" required  />
            </div>
           
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
         <Button type="submit" className="w-full bg-orange-400">
          Login
        </Button>
        <Button variant="outline" className="w-full" >
          Login with Google
        </Button>
        
      </CardFooter>
        </form>
        
    </Card>
     { alert ? 
         <Alert className={cn("max-w-md mt-5 flex flex-col items-center p-4 bg-green-600 text-white animate-in fade-in slide-in-from-top-2 duration-500",
          logado ? "bg-green-600" : "bg-red-400"
  )}>
          <div className='flex items-center gap-1'>
            {logado ? <CheckCircle2Icon size={17}/> : <AlertCircleIcon size={17}/>}
            <AlertTitle>{logado ? 'Usuário logado com sucesso!' : 'Erro'}</AlertTitle>


          </div>
      <AlertDescription className="max-w-full text-white rounded-4xl ">
        {logado ? null : token}
      </AlertDescription>
    </Alert>
: null}
    </div>
  
  )
}

export default Teste
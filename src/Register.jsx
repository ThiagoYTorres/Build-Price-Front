import React from 'react'
import { Button } from './components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from 'react-router-dom'

function Teste() {
  const navigate = useNavigate()
    const [alert,setAlert] = React.useState(false)
    const [response, setResponse] = React.useState("")
    const [userCreated,setUserCreated] = React.useState(null)

    async function registerUser(formData){
      const user = {
         firstName: formData.get("nome"),
         lastName: formData.get("sobrenome"),
         email: formData.get("email"),
         password: formData.get("senha")
      }
      setAlert(false)

      try{
        const response = await fetch('http://localhost:8080/api/v1/auth/register',{
          method: 'POST',
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(user)
        }) 
        if(response.ok) {
          setAlert(true)
          setResponse("Usuário Cadastrado")
          setUserCreated(true)
          setTimeout( () => navigate("/login"), 2000 )
      } 
      else {
        const errorData = await response.json()
        console.error("Erro no cadastro:", errorData)
        setAlert(true)
        setResponse(errorData.message)
        setUserCreated(false)
       
      }}
      catch(error){
        console.log(error)
      }
    }

    React.useEffect( () => {
      if(alert){
        const timer = setTimeout( () => setAlert(false), 3000)
        return () => clearTimeout(timer)

      }
    },[alert])

  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <Card className="w-full max-w-sm p-3 ">
        <form action={registerUser}>
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold pt-10">Build Price</CardTitle>
          <CardDescription className="text-center mb-4">Crie sua conta</CardDescription>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Nome</Label>
                <Input name="nome" id="name" type="text" required/>
              </div>
        
              <div className="grid gap-1">
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input id="sobrenome" name="sobrenome" type="text" required />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
              </div>

              <div className="grid gap-1 mb-6">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" name="senha" required />   
              </div>
            </div> 
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full bg-orange-400">Criar conta</Button>
          <Button variant="outline" className="w-full" >Login with Google</Button>
          { alert ?  
            <Alert className={cn("text-white bg-red-400 max-w-md animate-in fade-in slide-in-from-top-2 duration-500 text-center flex flex-col items-center",
              userCreated ? "bg-green-600" : "bg-red-400"
            )} >
               <div className='flex items-center gap-1'>
                <AlertCircleIcon size={17} />
                <AlertTitle>{userCreated ? 'Sucesso' : 'Erro'}</AlertTitle>
                </div>
                <AlertDescription className="text-white">
                    {response}
                </AlertDescription>
            </Alert> : null }
          {console.log(alert)}
        </CardFooter>
        </form>
      </Card>
    </div>

  )
}

export default Teste
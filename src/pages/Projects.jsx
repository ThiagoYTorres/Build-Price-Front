import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon } from "lucide-react"
import {Trash2Icon} from "lucide-react"
import { CheckCircle2Icon, TrashIcon, FolderIcon } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { createProject, deleteProject, getBudgets, getProjects } from '@/services/api'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from '@/components/ui/label'
import StepClientes from './Project-Form/StepClientes'
import StepProjeto from './Project-Form/StepProjeto'
import StepBudget from './Project-Form/StepBudget'

export default function Projects() {
  const token = localStorage.getItem('token')
  const [projetos, setProjetos] = useState([])
  const [budgets, setBudgets] = useState([])
  const [alert, setAlert] = useState(false)
  const [open, setOpen ] = useState(false)
  // Loading State
  const [loading, setLoading] = useState(true)
  // Etapas do Form
  const [step, setSteps] = useState(1)
  // Form
  const [formData, setFormData] = useState({
    clientId: null,
    projectId: null,
    budgetId: null,
  })

// Passa essa função para a pagina do form de cadastro de cliente, fazendo a req, recebendo o id do
// cliente e passando para o objeto, possibilitando a próxima página acessar esse dado
  function getClientId(clientId){
    setFormData(prev => ({...prev, clientId: clientId}))
    setSteps(2)
  }

  function getProjectId(projectId){
    setFormData( prev => ({...prev, projectId: projectId}))
    setSteps(3)
  }

  function getBudgetId(budgetId){
    setFormData( prev => ({...prev, budgetId: budgetId}))
    setSteps(3)
  }

  async function showBudgets(token, budgetId){
    const resp = await getBudgets(token, budgetId)
    setBudgets([resp])
  }


 console.log(budgets)

  console.log(formData)
  async function getProjectData(formData){
    const project = {
      nameWork: formData.get("nomeObra"),
      clientName: formData.get("nomeCli"),
      description: formData.get("desc"),
      uf: formData.get("uf"),
      bdi: formData.get("bdi")
    }
    try{
      
      const resp = await createProject(token, project)
      setOpen(false)
      setAlert(true)
      if(projetos.length > 0){
        const projects = await getProjects(token)
        setTimeout(() => setProjetos(projects), 2000 )
      }
      console.log(resp)

    }catch(error){
      console.log(error)
    }
  }

  async function delProject(token,id){
    console.log('id projeto', id)
    try{
      const resp = await deleteProject(token,id)
      console.log(resp)
      const projects = await getProjects(token)
      setProjetos(projects)
    }catch(error){
      console.log(error)
    }
  }

// Alert
  useEffect( () => {
      if(alert){
        const timer = setTimeout( () => setAlert(false), 3000)
        return () => clearTimeout(timer)  
      }
    },[alert])

// Carregar Projetos
  useEffect(() => {
    async function getUserProjects(){
      try{
        const projects = await getProjects(token)
        setTimeout(() => setProjetos(projects), 2000)
        console.log(projects)

      }catch(error){
        console.log(error)
      }
      // Irá executar sempre, não importa se cair no catch
      finally{
        setLoading(false)
      }
    }
    getUserProjects(token)
  },[])

  return (
    <>
    <main className='mx-2'>
       
        <Dialog open={open} onOpenChange={setOpen} >
          <div className='flex justify-between shadow-md pb-5 w-sc items-center px-4 pt-5 '>
             <h1 className='text-2xl mb-1 '>PROJETOS</h1>
      <DialogTrigger
      onClick={() => setOpen(true)}
       className='px-3 py-1 bg-gray-950 rounded-lg text-white cursor-pointer text-sm'> {/* Botão para abrir o modal */}
        + Projeto
      </DialogTrigger>
          </div>
   
      <DialogContent className='py-10 px-5 sm:max-w-2xl'>
        

      {/* Conteúdo do form ( inputs ) */}
            
              { step === 1 && <StepClientes  nextS={getClientId} /> }
              { step === 2 && <StepProjeto   nextS={getProjectId} clientId={formData.clientId}  /> }
              {/* { step === 3 && <StepBudget    nextS={getBudgetId} /> } */}
              
      </DialogContent>
    </Dialog>

    {/* Seção de Projetos */}
    {console.log(projetos)}
    <section className='mt-6'>

      { loading ? 
      [1,2,3].map( el => (
        <Card key={el} className="w-full max-w-xs bg-gray-700 mb-2">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card> 
      )) : projetos.length > 0 ? projetos.map( el => ( 
        <Card key={el.id} className="relative mx-auto w-full max-w-sm pt-0 mb-4">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="default">{el.uf}</Badge>
        </CardAction>
        <CardTitle >{el.nameWork}</CardTitle>
        <CardTitle className="text-sm font-normal ">
          {el.clientName}
        </CardTitle>
        <CardDescription className='break-all'>
          {el.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-between'>
      {/* Página visualizar os orçamentos do projeto */}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            {/* Função do button onClick={() => showBudgets(token, el.budgetIds[0])} */}
            <Button variant="outline" >Ver orçamentos</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">

        {/* Form para criar orçamento */}
            <StepBudget projectId={el.id} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

        {/* Deletar Projeto modal */}
          <Dialog>
          <DialogTrigger>
            <Trash2Icon size={20}  stroke='red' className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-center'>Apagar Projeto?</DialogTitle>
              <DialogDescription className='text-center'>
                Essa ação não pode ser desfeita, todos os dados desse projeto serão apagados.
              </DialogDescription>
            </DialogHeader>
              <Button
                onClick={() => delProject(token, el.id)}
                variant='destructive' className='cursor-pointer'>Apagar</Button>
          </DialogContent>
        </Dialog>

      </CardFooter>
    </Card>
      )) : <>
       <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>Sem Projetos</EmptyTitle>
        <EmptyDescription>
          Você ainda não tem nenhum projeto, comece criando um projeto novo.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => setOpen(true)}>Criar Projeto</Button>
      </EmptyContent>
    </Empty>
    </> 
    
  }
    
 {console.log(alert)}
    </section>
      { alert ? <div className='flex justify-center'>
      <Alert className="bg-green-600 fixed bottom-1 w-1/2 z-1000 animate-in fade-in slide-in-from-top-2 duration-500"  >
               <div className='flex justify-center gap-1 text-white'>
                <CheckCircle2Icon size={17} />
                <AlertTitle>Sucesso</AlertTitle>
                </div>
                <AlertDescription className="text-white text-center">
                    Projeto criado com sucesso!
                </AlertDescription>
            </Alert>
            </div> : null }


    </main>
    </>
  )
}


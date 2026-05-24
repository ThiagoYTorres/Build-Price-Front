import React, { useEffect, useState } from 'react'
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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { createBudget, getProjects } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function StepBudget({projectId, nextS, openBudgetPage}) {
    const navigate = useNavigate()
    const [budgetID, setBudgetID] = useState('')
    const [projectBudgets,setProjectBudgets] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function loadBudgets(){
            const budgets = await getProjects(token)
            // Procura pelo projeto através do ID
            const findProject = budgets.find( el => el.id === projectId)
            console.log(projectId)
            // Verifica se o array de budgets está vazio
            if(findProject.budgetIds.length > 0){
                setProjectBudgets(findProject.budgetIds)
            }
            console.log(findProject)
            
        }

        loadBudgets()
        console.log(projectBudgets)
    },[])
    
        async function getBudgetData(formData){
             const budget = {
                    name: formData.get("name"),
                    bdi: formData.get("bdi"),
                    projectId: projectId,
                }
                console.log(budget)
        try{
            const getBudgetId = await createBudget(token, budget)
            setBudgetID(getBudgetId)
            
        } catch(error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <DialogHeader>
        {console.log(projectBudgets)}
            <DialogTitle className='text-center text-2xl'>Orçamentos</DialogTitle>
                <DialogDescription  className='text-center mb-6'>
                    Orçamentos do projeto
                </DialogDescription>
        </DialogHeader>
        <div>
           { projectBudgets.length > 0 ? 
           <div className='flex flex-col gap-4'>
                { projectBudgets.map( el => (
                    <div key={el} className='flex justify-between items-center'>
                        <p>{el}</p>
                        <Button className='cursor-pointer' onClick={() => setTimeout( () => navigate(`/budget/${el}`), 2000 )}>
                        Selecionar</Button>
                    </div>
                ))}
            </div> : <>
                <p className='text-center mb-6 text-gray-500'>
                    Você ainda não tem orçamentos para esse projeto.
                </p>
            {/* <Dialog>
                <DialogTrigger asChild>
                    
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg py-10 px-10">
                    <DialogTitle className='text-center text-xl'>Dados do Orçamento</DialogTitle>
                        <DialogDescription className='text-center'>
                            Preencha os campos para criar um orçamento.
                        </DialogDescription>

                    <form action={getBudgetData}>
                        <FieldGroup className='grid grid-cols-2'>
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">Nome</FieldLabel>
                                <Input id="fieldgroup-name" placeholder="Orçamento Principal" name="name" required/>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">BDI</FieldLabel>
                                <Input id="fieldgroup-name" placeholder="25.5" name="bdi" type='number' />
                                <FieldDescription>
                                </FieldDescription>
                            </Field>

                            <Field orientation="horizontal" className='col-span-full flex justify-center'>
                                <Button type="submit" className='cursor-pointer'>Fazer Orçamento</Button>
                            </Field>
                        </FieldGroup>
                    </form>

                </DialogContent>
            </Dialog>   */}
            
            </> }
            <DialogFooter className='sm:justify-center mt-7'>
                          <DialogClose asChild >
                            <Button onClick={openBudgetPage}>+ Novo orçamento</Button>
                          </DialogClose>
             </DialogFooter>
        </div>
        {/* <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Orçamentos</DialogTitle>
                <DialogDescription  className='text-center mb-6'>
                    Preencha todos os campos para fazer um orçamento.
                </DialogDescription>
        </DialogHeader>
    <form action={getBudgetData}>
        <FieldGroup className='grid grid-cols-2'>
            <Field>
                <FieldLabel htmlFor="fieldgroup-name">Nome</FieldLabel>
                <Input id="fieldgroup-name" placeholder="Orçamento Principal" name="name" required/>
            </Field>

            <Field>
                <FieldLabel htmlFor="fieldgroup-name">BDI</FieldLabel>
                <Input id="fieldgroup-name" placeholder="25.5" name="bdi" type='number' />
                <FieldDescription>
                    We&apos;ll send updates to this address.
                </FieldDescription>
            </Field>

            <Field orientation="horizontal" className='col-span-full flex justify-center'>
                <Button type="submit" className='cursor-pointer'>Ir para orçamento</Button>
            </Field>
        </FieldGroup>
      </form> */}
      </>
  )
}

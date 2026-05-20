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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { createBudget, getProjects } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function StepBudget({projectId, nextS}) {
    const navigate = useNavigate()
    const [budgetID, setBudgetID] = useState('')
    const [projectBudgets,setProjectBudgets] = useState([])

    useEffect(() => {
        async function loadBudgets(){
            const budgets = await getProjects(token)
            const findProject = budgets.find( el => el.id === projectId)
            console.log(findProject)
            setProjectBudgets([findProject.budgetIds])
        }

        loadBudgets()
        console.log(projectBudgets)
    },[])
    
    const token = localStorage.getItem('token')

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
            <DialogTitle className='text-center text-2xl'>Orçamentos</DialogTitle>
                <DialogDescription  className='text-center mb-6'>
                    Orçamentos do projeto
                </DialogDescription>
        </DialogHeader>
        <div>
           {projectBudgets.length > 0 ? 
           <div className='flex items-center justify-around'>
                {projectBudgets}
                <Button className='cursor-pointer' onClick={() => setTimeout( () => navigate("/budget"), 2000 )}>Selecionar</Button>
           </div>
           : 
            <DialogDescription  className='text-center mb-6'>
                Você ainda não tem orçamentos para esse projeto.
            </DialogDescription>} 
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

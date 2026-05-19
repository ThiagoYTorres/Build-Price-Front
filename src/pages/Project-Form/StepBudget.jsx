import React, { useState } from 'react'
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
import { createBudget } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function StepBudget({projectId, nextS}) {
    const navigate = useNavigate()
    const [budgetID, setBudgetID] = useState('')

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
            setTimeout( () => navigate("/budget"), 2000 )
        } catch(error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Dados Orçamento</DialogTitle>
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
      </form>
      </>
  )
}

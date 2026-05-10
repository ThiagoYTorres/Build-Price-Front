import React from 'react'
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
import { createClient } from '@/services/api'

export default function StepClientes({nextS}) {
const token = localStorage.getItem('token')

        async function getClientData(formData){
             const cliente = {
                name: formData.get("name"),
                cpfCnpj: formData.get("cpfCnpj"),
                phone: formData.get("phone"),
                email: formData.get("email")
                }
        try{
            const clientId = await createClient(token, cliente)
            console.log(clientId)
            nextS(clientId)
        } catch(error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Cadastrar Cliente</DialogTitle>
                <DialogDescription  className='text-center mb-6'>
                    Preencha todos os campos para cadastrar um cliente.
                </DialogDescription>
        </DialogHeader>
    <form action={getClientData}> 
    <FieldGroup className='grid grid-cols-1'>
        <Field>
            <FieldLabel htmlFor="fieldgroup-name">Nome</FieldLabel>
            <Input id="fieldgroup-name" placeholder="Jordan Lee" name="name" required/>
        </Field>

        <Field>
            <FieldLabel htmlFor="fieldgroup-name">CPF/CNPJ</FieldLabel>
            <Input id="fieldgroup-name" placeholder="" name="cpfCnpj" />
        </Field>

        <Field className='col-span-full'>
            <FieldLabel htmlFor="fieldgroup-name" >Celular</FieldLabel>
            <Input id="fieldgroup-name" placeholder="" name="phone" />
        </Field>

        <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
            id="fieldgroup-email"
            type="text"
            placeholder="JoaoDaSilva@gmail.com"
            name="email"
            />
            <FieldDescription>
                We&apos;ll send updates to this address.
            </FieldDescription>
        </Field>

        

        <Field orientation="horizontal" className='col-span-full flex justify-center'>
            <Button type="submit" className='cursor-pointer'>Cadastrar</Button>
        </Field>
      </FieldGroup>
      </form>
      </>
  )
}

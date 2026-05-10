import React from 'react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createProject } from '@/services/api'
export default function StepProjeto({clientId, nextS}) {
  const token = localStorage.getItem('token')
  console.log(clientId)
          async function getProjectData(formData){
               const projeto = {
                  nameWork: formData.get("nomeObra"),
                  description: formData.get("desc"),
                  uf: formData.get("uf"),
                  clientId: clientId,
                  }
          try{
              const projetoId = await createProject(token, projeto)
              console.log(projetoId)
              nextS(projetoId)
          } catch(error) {
              console.log(error)
          }
      }

  return (
    <>
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Criar um Projeto</DialogTitle>
              <DialogDescription  className='text-center mb-6'>
                Preencha todos os campos para criar um projeto.
              </DialogDescription>
            </DialogHeader>
            <form action={getProjectData}>
            <FieldGroup className='grid grid-cols-2'>
    <Field>
        <FieldLabel htmlFor="fieldgroup-name">Nome da Obra</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Reforma Apartamento" name="nomeObra" required/>
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-email">UF</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="text"
          placeholder="SP"
          name="uf"
          defaultValue="SP"
        />
        
      </Field>

       <Field className='col-span-full'>
        <FieldLabel htmlFor="fieldgroup-name" >Descrição</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Troca de pisos" name="desc" />
        <FieldDescription>
          Faça uma breve descrição do projeto.
        </FieldDescription>
      </Field>

      

      

      <Field orientation="horizontal" className='col-span-full flex justify-center'>
        <Button type="submit" className='cursor-pointer' >Criar Projeto</Button>
        
      </Field>
      </FieldGroup>
      </form>
    </>
  )
}

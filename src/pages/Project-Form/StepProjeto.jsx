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
import { createProject, getProjects } from '@/services/api'
export default function StepProjeto({clientId, setSteps, setOpen, setAlert,setProjetos}) {
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
              setOpen(false) // Fecha o modal
              setAlert(true) // Ativa o alert
              setSteps(1) // Reseta para a primeira página, caso contrário ao criar o projeto o formulário carregaria na página 2
              const projects = await getProjects(token)
              setProjetos(projects)
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

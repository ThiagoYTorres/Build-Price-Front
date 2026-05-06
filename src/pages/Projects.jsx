import React from 'react'
import { Button } from "@/components/ui/button"
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
import { createProject } from '@/services/api'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Projects() {
  async function getProjectData(formData){
    const project = {
      nameWork: formData.get("nomeObra"),
      clientName: formData.get("nomeCli"),
      description: formData.get("desc"),
      uf: formData.get("uf"),
      bdi: formData.get("bdi")
    }
    try{
      const token = localStorage.getItem('token')
      const resp = await createProject(token, project)
      console.log(resp)

    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
    <main className='p-5'>
    <h1 className='text-4xl'>Projetos</h1>
        <Dialog >
      <DialogTrigger> {/* Botão para abrir o modal */}
        + Projeto
      </DialogTrigger>
      <DialogContent className='py-10 px-5 sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>Criar um Projeto</DialogTitle>
          <DialogDescription  className='text-center mb-6'>
            Preencha todos os campos para criar um projeto.
          </DialogDescription>
        </DialogHeader>
      {/* Conteúdo do form ( inputs ) */}
      <form action={getProjectData}>
          <FieldGroup className='grid grid-cols-2'>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Nome da Obra</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Reforma Apartamento" name="nomeObra"/>
      </Field>

       <Field>
        <FieldLabel htmlFor="fieldgroup-name">Nome do Cliente</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" name="nomeCli" />
      </Field>

       <Field className='col-span-full'>
        <FieldLabel htmlFor="fieldgroup-name" >Descrição</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Troca de pisos" name="desc" />
        <FieldDescription>
          Escreva uma breve descrição do projeto.
        </FieldDescription>
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
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-email">BDI</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="number"
          placeholder="25.5"
          name="bdi"
        />
      </Field>

      <Field orientation="horizontal" className='col-span-full flex justify-center'>
        <Button type="submit">Criar Projeto</Button>
      </Field>
    </FieldGroup>
    </form>
      </DialogContent>
    </Dialog>
    {/* Seção de Projetos */}
    <section>
       <Card className="w-full max-w-xs bg-gray-500">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
    </section>



    </main>
    </>
  )
}


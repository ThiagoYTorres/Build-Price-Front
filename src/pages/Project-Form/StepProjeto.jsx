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
export default function StepProjeto() {
  return (
    <>
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Criar um Projeto</DialogTitle>
              <DialogDescription  className='text-center mb-6'>
                Preencha todos os campos para criar um projeto.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className='grid grid-cols-2'>
    <Field>
        <FieldLabel htmlFor="fieldgroup-name">Nome da Obra</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Reforma Apartamento" name="nomeObra" required/>
      </Field>

       <Field>
        <FieldLabel htmlFor="fieldgroup-name">Nome do Cliente</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" name="nomeCli" />
      </Field>

       <Field className='col-span-full'>
        <FieldLabel htmlFor="fieldgroup-name" >Descrição</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Troca de pisos" name="desc" />
        <FieldDescription>
          Faça uma breve descrição do projeto.
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
        <Button type="submit" className='cursor-pointer' >Criar Projeto</Button>
        
      </Field>
      </FieldGroup>
    </>
  )
}

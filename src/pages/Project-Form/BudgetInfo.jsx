import React from 'react'

export default function BudgetInfo({projectId}) {
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
    <Dialog>   
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

    </Dialog>
  )
}

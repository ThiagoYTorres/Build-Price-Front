import { createBudget, getSinapiItens } from '@/services/api'
import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
 } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from '@/components/ui/select'
export default function Budget({projectID}) {

    const token = localStorage.getItem('token')
    const [sinapiItens, setSinapiItens] = useState([])
    const [item, setItem] = useState('')
    const [page, setPage] = useState(0)



    async function getAllData(){
            const getItens = await getSinapiItens(token,page,'')
            console.log(getItens)
            setSinapiItens(getItens.content)
            
        }

    useEffect(() => {
        getAllData()
        console.log(sinapiItens)
    }, [page])
        
    async function searchItem(value){
        console.log(value)
        setItem(value)
        const getItens = await getSinapiItens(token,page,value)
        console.log(getItens)
        setSinapiItens(getItens.content)
        console.log(sinapiItens)
        
    }

    async function filterItem(formData){
        const filters = {
          search: formData.get('nomeItem'),
          uf: formData.get('uf'),
          taxRelief: formData.get('tipo')
        }

        const getItens = await getSinapiItens(token,page,filters)
        setSinapiItens(getItens.content)
        console.log(getItens)
        
    }






  return (
    <>  
        <div>
            <h1 className='text-3xl mb-10 mt-5 ml-5'>Orçamento</h1>
        {/* <Command className="screen rounded-lg border">
            <CommandInput placeholder="Type a command or search..." onValueChange={searchItem} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                   
                {sinapiItens.length > 0 ? sinapiItens.map( el => (
                    <Card key={el.id} className='mb-2'>
                     <CommandItem value={el.description}>{el.description} 
                    <Badge className="bg-blue-950 text-blue-300">{el.taxRelief}</Badge>
                    <Badge  className="bg-purple-950 text-purple-300">{el.classification}</Badge>
                     
                     
                     
                     </CommandItem>
                     
                    </Card>
                ))
            : null } 
                </CommandGroup>
                <CommandSeparator />
               
            </CommandList>
        </Command> */}
        <div className='flex justify-center'>

        
      <form action={filterItem} className='w-screen flex flex-col gap-2 px-5'>
        <Input  placeholder="Jordan Lee" name='nomeItem'/>
        <div className='flex gap-2 '>

        
        <Select defaultValue="SP" name='uf'>
          <SelectTrigger >
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="SP">SP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select defaultValue=" " name='tipo'>
          <SelectTrigger >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                <SelectItem value=" " >Todos os Tipos</SelectItem>
                <SelectItem value="ISD">ISD — Sem desoneração</SelectItem>
                <SelectItem value="ICD">ICD — Composições</SelectItem>
                <SelectItem value="ISE">ISE — Com encargos</SelectItem>
              </SelectGroup>
          </SelectContent>
        </Select>
    </div>
        <Button>Pesquisar</Button>
      </form>
</div>
    <div className='max-h-[500px] overflow-y-auto border rounded-lg p-2 mt-10'>

    
        <Table >
  <TableHeader >
    <TableRow >
      <TableHead >Código</TableHead>
      <TableHead>Descrição</TableHead>
      <TableHead>Classe</TableHead>
      <TableHead>Un.</TableHead>
      <TableHead>UF</TableHead>
      <TableHead>Tipo</TableHead>
      <TableHead>Preço</TableHead>
      <TableHead></TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {sinapiItens.map((item) => (
      <TableRow key={item.id}>
        <TableCell>
            <Badge variant='outline' className='bg-gray-500 text-gray-100'>{item.codSinapi}</Badge>
        </TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell >
          <Badge variant="outline"
          className={cn(
            "border",
            item.classification === "MATERIAL" &&
                "bg-orange-100 text-orange-700 border-orange-300",

            item.classification === "MAO DE OBRA" &&
                "bg-green-100 text-green-700 border-green-300",

            item.classification === "SERVIÇOS" &&
                "bg-purple-100 text-purple-700 border-purple-300"
            )}>{item.classification}</Badge>
        </TableCell>
        <TableCell>{item.unit}</TableCell>
        <TableCell>{item.uf}</TableCell>
        <TableCell>
            <Badge className=' bg-blue-950 text-blue-300'>
                {item.taxRelief}</Badge>
        </TableCell>
        <TableCell>
          {Number(item.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </TableCell>
        <TableCell>
          <Button size="sm">Adicionar</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</div>
    <Pagination className='mt-5'>
            <PaginationContent>
                <PaginationItem >
                <PaginationPrevious onClick={() => setPage(prev => Math.max(prev - 1, 0))} />
                </PaginationItem>
                
                <PaginationItem >
                <PaginationLink isActive={true}>{page + 1}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                <PaginationNext  onClick={() => setPage(prev => prev + 1)}  />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    

        </div>
    </>
  
    

  )
}

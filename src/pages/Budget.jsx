import { addSinapiItens, createBudget, getBudgetData, getSinapiItens } from '@/services/api'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cn } from "@/lib/utils"
import {
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardDescription, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Calendar1, ChartLine, CircleDollarSign, DollarSign, Landmark, Package, PackageOpen, Percent } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { RefreshCcwIcon } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Label } from "@/components/ui/label"

export default function Budget({ projectID }) {

  const token = localStorage.getItem('token')
  const [sinapiItens, setSinapiItens] = useState([])
  const [item, setItem] = useState('')
  const [page, setPage] = useState(0)
  const [budgetData, setBudgetData] = useState(null)
  const [budgetItems, setBudgetItems] = useState([])
  const [filters, setFilters] = useState({ search: '', uf: 'SP', taxRelief: ' ' })

  // Estados do dialog
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSinapiId, setSelectedSinapiId] = useState(null)
  const [selectedItemName, setSelectedItemName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const { budgetId } = useParams()

  async function getAllData() {
    const getItens = await getSinapiItens(token, page, filters)
    setSinapiItens(getItens.content)
  }

  useEffect(() => {
    getAllData()
  }, [page])

  useEffect(() => {
    async function loadBudgetData() {
      const bData = await getBudgetData(token, budgetId)
      console.log(bData)
      setBudgetData(bData)
      setBudgetItems(bData.items)
    }
    loadBudgetData()
  }, [])

  async function filterItem(formData) {
    const selectedFilters = {
      search: formData.get('nomeItem'),
      uf: formData.get('uf'),
      taxRelief: filters.taxRelief
    }
    setPage(0)
    setFilters(selectedFilters)
    const getItens = await getSinapiItens(token, page, selectedFilters)
    setSinapiItens(getItens.content)
  }

  // Abre o dialog ao clicar em Adicionar
  function handleOpenDialog(sinapiItem) {
    setSelectedSinapiId(sinapiItem.id)
    setSelectedItemName(sinapiItem.description)
    setQuantity(1)
    setDialogOpen(true)
  }

  // Confirma a adição com a quantidade escolhida
  async function handleConfirmAdd() {
    if (!selectedSinapiId || quantity < 1) {
      return
    }
    try {
      const itemPayload = { budgetId: budgetId, quantity: Number(quantity) }
      await addSinapiItens(token, selectedSinapiId, itemPayload)
      const bData = await getBudgetData(token, budgetId)
      
      setBudgetItems([...(bData.items || [])])
      setBudgetData(bData)
      setDialogOpen(false)
    } catch(error){
      console.log(error)
    }
  }
  // Formatação da Data de Criação do Projeto
  const data = budgetData?.createdAt || 0
  const formatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'full',
  })
  

  return (
    <>
      <div className='lg:px-70 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-0'>
        <div className='flex mb-10 mt-6 ml-3 flex-col gap-3  '>
           <h1 className='text-3xl lg:text-4xl font-medium'>{budgetData?.name || 'Orçamento'}</h1>
           <div className='text-[12px] flex items-center  gap-2 text-sm bg-gray-300 text-gray-800 py-1 px-2 w-fit rounded-md'>
            <Calendar size={17} className='text-gray-700'/>
            <p>{formatter.format(new Date(data))}</p>
           </div>
           

        </div>
       
        {budgetData ?
          <section className='grid grid-cols-2 gap-3 mx-2 lg:flex mb-10 '>
            
            <Card className=' lg:w-70 animate-in fade-in slide-in-from-left-4 duration-500 delay-0'>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">BDI</CardTitle>
                <div className='p-1 rounded bg-gray-300'><Percent className="h-4 w-4 text-gray-600" /></div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl lg:text-3xl font-bold ">{budgetData.bdi}%</p>
                <p className="text-xs text-muted-foreground">Benefícios e Despesas Indiretas</p>
              </CardContent>
            </Card>

            <Card className='lg:w-70 animate-in fade-in slide-in-from-left-4 duration-500 delay-100'>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Margem Bruta</CardTitle>
                <div className='p-1 rounded bg-gray-300'><ChartLine className="h-4 w-4 text-gray-600 " /></div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl lg:text-3xl font-bold">{budgetData.grossMargin.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <p className="text-xs text-muted-foreground">Valor aplicado sobre o custo base</p>
              </CardContent>
            </Card>
            
            <Card className='lg:w-70 col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200'>
              <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total sem BDI</CardTitle>
                <div className='p-1 rounded bg-gray-300'><DollarSign className="h-4 w-4 text-gray-600" /></div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl lg:text-3xl font-bold">{budgetData.totalWithOutBDI.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <p className="text-xs text-muted-foreground">Valor base</p>
              </CardContent>
            </Card>

            <Card className='lg:w-70 col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300'>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total com BDI</CardTitle>
                <div className='p-1 rounded bg-gray-300'><Landmark size={3} className="h-4 w-4 text-gray-600" /></div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl lg:text-3xl font-bold text-green-600">{budgetData.totalWithBDI.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <p className="text-xs text-muted-foreground">Valor final</p>
              </CardContent>
            </Card>

            
          </section>
          : null}
      <section className='border pb-4 pt-7  rounded-2xl mx-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400'>
        <h1 className='px-3 pb-4 mb-4 text-center border-b '>
          <Badge variant='outline'className='text-xl px-10 py-5'>Tabela Sinapi</Badge></h1>
        <div className='flex justify-center'>
          
          <form action={filterItem} className='w-screen flex flex-col gap-2 px-2'>
            <Input placeholder="Buscar item..." name='nomeItem' />
            <div className='flex gap-2'>
              <Select defaultValue="SP" name='uf'>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="SP">SP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select defaultValue=" " name='tipo'
                value={filters.taxRelief}
                onValueChange={(value) => setFilters(prev => ({ ...prev, taxRelief: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value=" ">Todos os Tipos</SelectItem>
                    <SelectItem value="ISD">ISD — Sem desoneração</SelectItem>
                    <SelectItem value="ICD">ICD — Composições</SelectItem>
                    <SelectItem value="ISE">ISE — Com encargos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex justify-center'>
               <Button className='lg:w-80 w-full cursor-pointer'>Pesquisar</Button>
            
            </div>
           
          </form>
        </div>

        <div className='max-h-[500px] overflow-y-auto border rounded-lg p-2 mt-8 '>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
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
                  <TableCell className='max-w-[200px] lg:max-w-[350px] truncate'>{item.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "border",
                      item.classification === "MATERIAL" && "bg-orange-100 text-orange-700 border-orange-300",
                      item.classification === "MAO DE OBRA" && "bg-green-100 text-green-700 border-green-300",
                      item.classification === "SERVIÇOS" && "bg-purple-100 text-purple-700 border-purple-300"
                    )}>{item.classification}</Badge>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.uf}</TableCell>
                  <TableCell>
                    <Badge className='bg-blue-950 text-blue-300'>{item.taxRelief}</Badge>
                  </TableCell>
                  <TableCell>
                      <Badge className=' bg-green-900 text-green-300 rounded border-green-400'>
                        {Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </Badge>
                  </TableCell>
                  <TableCell>
                    {/* Passa o item inteiro para ter acesso à descrição no dialog */}
                    <Button size="sm" onClick={() => handleOpenDialog(item)}>Adicionar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className='mt-5'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(prev => Math.max(prev - 1, 0))} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={true}>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => setPage(prev => prev + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
{/* Secão de Produtos Adicionados ao Budget */}
<section className='mt-15 flex justify-center mt-5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500'>
      <Card className='mx-2 mb-4 w-full'>
        <CardTitle className='border-b pb-3 pl-3 flex text-xl items-center gap-3'>
          <div className=' bg-gray-300 rounded-full p-1'><Package size={20} /></div>Itens do Orçamento 
          </CardTitle>
       
        <CardContent className='px-4'>
              <div className="border rounded-lg overflow-hidden">
      { budgetItems.length === 0 ? 
      <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia >
          <div className='p-2 rounded-full bg-gray-300'>
            <PackageOpen size={30} />

          </div>
        </EmptyMedia>
        <EmptyTitle>Sem Itens</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Você ainda não tem nenhum item adicionado ao orçamento.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        
      </EmptyContent>
    </Empty> : <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className='w-30'>Classificação</TableHead>
            <TableHead>Un.</TableHead>
            <TableHead>UF</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço unit.</TableHead>
            <TableHead className="text-right pr-4">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Badge variant="outline" className="bg-gray-500 text-gray-100">
                  {item.codSinapi}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{item.description}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(
                  "border",
                  item.classification === "MATERIAL" && "bg-orange-100 text-orange-700 border-orange-300",
                  item.classification === "MAO DE OBRA" && "bg-green-100 text-green-700 border-green-300",
                  item.classification === "SERVIÇOS" && "bg-purple-100 text-purple-700 border-purple-300"
                )}>
                  {item.classification}
                </Badge>
              </TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.uf}</TableCell>
              <TableCell className="text-right p-2">
                <Badge variant='outline' className='rounded bg-gray-700 text-white' > {item.quantity}</Badge>
               </TableCell>
              <TableCell className="text-right">
                {Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </TableCell>
              <TableCell className="text-right font-medium pr-4 text-green-500">
                <Badge className=''> {(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Badge>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
    </div>

        </CardContent>
      </Card>
 </section>       
        {/* Dialog de confirmação com quantidade */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className='border-b py-2 pb-4 text-center'>Adicionar item ao orçamento</DialogTitle>
            </DialogHeader>

            <div className="py-2">
              <div className='flex flex-col items-center justify-center border p-2  py-3 rounded-2xl'>
                <Badge>Item</Badge>
              <p className=" p-2 rounded text-sm text-gray-700 font-medium line-clamp-4 text-center">
                {selectedItemName}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4">

                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleConfirmAdd} disabled={quantity < 1}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </>
  )
}
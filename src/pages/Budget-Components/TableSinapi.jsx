// import React from 'react'
// import {
//   Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
//   PaginationLink, PaginationNext, PaginationPrevious,
// } from "@/components/ui/pagination"
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// import { Card, CardDescription, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
// import { Input } from '@/components/ui/input'
// import { cn } from "@/lib/utils"
// export default function TableSinapi({sinapiItens, page, setPage, handleOpenDialog, filterItem, filters, setFilters}) {
//   return (
//      <>
//      <div className='flex justify-center items-center '>
//           <form action={filterItem} className='w-[100%] flex flex-col gap-2 lg:items-center'>
//             <Input placeholder="Buscar item..." name='nomeItem' className='lg:w-[30%]' />
//             <div className='flex gap-2'>
//               <Select defaultValue="SP" name='uf'>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value="SP">SP</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>

//               <Select defaultValue=" " name='tipo'
//                 value={filters.taxRelief}
//                 onValueChange={(value) => setFilters(prev => ({ ...prev, taxRelief: value }))}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value=" ">Todos os Tipos</SelectItem>
//                     <SelectItem value="ISD">ISD — Sem desoneração</SelectItem>
//                     <SelectItem value="ICD">ICD — Composições</SelectItem>
//                     <SelectItem value="ISE">ISE — Com encargos</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <Button>Pesquisar</Button>
//           </form>
//         </div>
     

//         <div className='max-h-[500px] overflow-y-auto border rounded-lg p-2 '>
            
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Código</TableHead>
//                 <TableHead>Descrição</TableHead>
//                 <TableHead>Classe</TableHead>
//                 <TableHead>Un.</TableHead>
//                 <TableHead>UF</TableHead>
//                 <TableHead>Tipo</TableHead>
//                 <TableHead>Preço</TableHead>
//                 <TableHead></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sinapiItens.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <Badge variant='outline' className='bg-gray-500 text-gray-100'>{item.codSinapi}</Badge>
//                   </TableCell>
//                   <TableCell>{item.description}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={cn(
//                       "border",
//                       item.classification === "MATERIAL" && "bg-orange-100 text-orange-700 border-orange-300",
//                       item.classification === "MAO DE OBRA" && "bg-green-100 text-green-700 border-green-300",
//                       item.classification === "SERVIÇOS" && "bg-purple-100 text-purple-700 border-purple-300"
//                     )}>{item.classification}</Badge>
//                   </TableCell>
//                   <TableCell>{item.unit}</TableCell>
//                   <TableCell>{item.uf}</TableCell>
//                   <TableCell>
//                     <Badge className='bg-blue-950 text-blue-300'>{item.taxRelief}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     {Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
//                   </TableCell>
//                   <TableCell>
//                     {/* Passa o item inteiro para ter acesso à descrição no dialog */}
//                     <Button size="sm" onClick={() => handleOpenDialog(item)}>Adicionar</Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         <Pagination className='mt-5'>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious onClick={() => setPage(prev => Math.max(prev - 1, 0))} />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink isActive={true}>{page + 1}</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext onClick={() => setPage(prev => prev + 1)} />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//     </>
//   )
// }

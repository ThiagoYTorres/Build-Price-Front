import { createBudget, getSinapiItens } from '@/services/api'
import React, { useEffect, useState } from 'react'
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
export default function Budget({projectID}) {
    const token = localStorage.getItem('token')
    const [sinapiItens, setSinapiItens] = useState([])

        async function getAllData(){
            const getItens = await getSinapiItens(token)
            setSinapiItens(getItens.content)
        }
        console.log(sinapiItens)

  return (
    <>  
        <div onClick={getAllData}>Budget</div>
        <Command className="max-w-sm rounded-lg border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                {sinapiItens.lenght > 0 ? sinapiItens.map( el => (
                     <CommandItem>{OK}</CommandItem>
                ))
            : null } 
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    </>
  
    

  )
}

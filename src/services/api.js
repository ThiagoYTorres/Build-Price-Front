const BASE_URL = 'http://localhost:8080/api/v1'

export async function cadastrarUser(userData){
    const resp = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    if(!resp.ok){
        const error = await resp.json()
        console.log('ERRO', error)
        // Precisa jogar um erro para o componente receber e cair no catch
        throw new Error(error.message)
        
    }

    return resp
}

export async function loginUser(credentials){
    const resp = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    })
    if(!resp.ok){
        const error = await resp.json()
        console.log('ERRO', error)
        // Precisa jogar um erro para o componente receber e cair no catch
        throw new Error(error.message)
        
    }
    const data = await resp.json()
    return data.token
}

// Projetos 
export async function getProjects(token){  
    const resp = await fetch(`${BASE_URL}/project`, {
         headers: { Authorization: `Bearer ${token}` }
    })
    if(!resp.ok){
        throw new Error("Erro ao buscar projetos")
    } 

  return resp.json()
}

// Cadastrar Cliente
export async function createClient(token, clientData){
    const resp = await fetch(`${BASE_URL}/clients`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(clientData)
    })
    if(!resp.ok){
        const erro = await resp.json()
        console.log(erro)
        throw new Error("Erro ao criar cliente")
    }
    const clientId = await resp.json()
    console.log(clientId)
    return clientId.id
}

export async function createProject(token, projectData){
    const resp = await fetch(`${BASE_URL}/project`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(projectData)
    })
    if(!resp.ok){
        const erro = await resp.json()
        console.log(erro)
        throw new Error("Erro ao criar projeto")
    }
    const project = await resp.json()
    console.log(project)
    return project.id
}

export async function createBudget(token, budgetData){
    const resp = await fetch(`${BASE_URL}/budgets`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(budgetData)
    })
    if(!resp.ok){
        const erro = await resp.json()
        console.log(erro)
        throw new Error("Erro ao criar projeto")
    }
    const budget = await resp.json()
    console.log(budget)
    return budget.id
}


export async function deleteProject(token, projectId) {
  const resp = await fetch(`${BASE_URL}/project/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return resp
}
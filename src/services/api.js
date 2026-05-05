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

export async function getProjects(token){  
    const resp = await fetch(`${BASE_URL}/project`, {
         headers: { Authorization: `Bearer ${token}` }
    })
    if(!response.ok){
        throw new Error("Erro ao buscar projetos")
    } 

  return resp.json()
}

export async function createProject(token, projectData){
    const resp = await fetch(`${BASE_URL}/project`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
    })

    return resp.json()
}
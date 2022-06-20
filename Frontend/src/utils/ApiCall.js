import config from './config'

class ApiCall {   

    async invokeGET(resource, queryParams) {//url y parametros de busqueda ["nombre=juan","apellido=perez"]
        
        queryParams = queryParams || [] //si hay parametros de busqueda, los agrega a la url, si no, no
        const queryString = queryParams.reduce((last, q, i) => last + `${i === 0 ? '?' : "&"}${q}`, '')
        const bearer = localStorage.getItem("token");
        
        const data = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
            }
        }
        const url = `${config.api.baseURL}${resource}${queryString}`
        let response = (await (await fetch(url, data)).json())
        return response
    }

    async invokePUT(resource, body) {

        const bearer = localStorage.getItem("token");

        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${bearer}`
            }
        }
        const url = `${config.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }

    async invokePOST(resource, body) {

        const bearer = localStorage.getItem("token");

        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${bearer}`
            }
        }
        const url = `${config.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }

    async invokeDELETE(resource) {
        
        const bearer = localStorage.getItem("token");

        const data = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${bearer}`
            }
        }
        const url = `${config.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
}

export default new ApiCall()
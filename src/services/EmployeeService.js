import client from "../shared/client/Client";

const api = "/mst"

export async function getAllEmployee() {
    const employeeList = await client.get(api)
    return employeeList.data
}

export async function addEmployee(form) {
    const response = await client.post(api,form)
    return response.data
}

export async function editEmployee(form) {
    const response = await client.put(api,form)
    return response.data
}

export async function deleteEmployee(employee) {
    const form = {
        id:employee
    }
    const response = await client.delete(api,{data:form})
    if(response.status == 200) return true
    else return false

}

export async function getAllPosition() {
    const positions = await client.get(`${api}/position`)
    return positions.data
}
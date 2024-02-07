import Axios from 'axios'

function findAll(){
    return Axios.get("http://apicourse.myepse.be/api/customers/")
                .then(response => response.data['hydra:member'])
}

function find(id){
    return Axios.get(`http://apicourse.myepse.be/api/customers/${id}`)
                .then(response => response.data)
}

function deleteCustomer(id){
    return Axios.delete(`http://apicourse.myepse.be/api/customers/${id}`)
}

function updateCustomer(id, customer){
    return Axios.put(`http://apicourse.myepse.be/api/customers/${id}`, customer)
}

function createCustomer(customer){
    console.log(customer)
    return Axios.post("http://apicourse.myepse.be/api/customers", customer)
}

export default {
    findAll : findAll,
    find: find,
    delete: deleteCustomer,
    update: updateCustomer,
    create: createCustomer
}
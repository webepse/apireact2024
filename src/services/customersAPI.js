import Axios from 'axios'

function find(id){
    return Axios.get(`http://apicourse.myepse.be/api/customers/${id}`)
                .then(response => response.data)
}

function findAll(){
    return Axios.get("http://apicourse.myepse.be/api/customers")
                .then(response => response.data['hydra:member'])
}

function deleteCustomer(id){
    return Axios.delete(`http://apicourse.myepse.be/api/customers/${id}`)
}

export default {
    find: find,
    findAll : findAll,
    delete: deleteCustomer
}
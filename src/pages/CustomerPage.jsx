import { useEffect, useState } from "react"
import customersAPI from "../services/customersAPI"
import { Link, useNavigate, useParams } from "react-router-dom"
import Field from "../components/forms/Field"

const CustomerPage = (props) => {
    let {id = "new"} = useParams()
    const navigate = useNavigate()

    const [editing, setEditing] = useState(false) // pour savoir si on est en mode édition ou création

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
        user: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const fetchCustomer = async id => {
        try{
            const {firstName, lastName, email, company, user} = await customersAPI.find(id)
            console.log(user.id)
            setCustomer({firstName, lastName, email, company, user:"/api/users/"+user.id})
        }catch(error)
        {
            // notif 
            // redirection
            navigate('/customer', {replace:true})
        }
    }

    useEffect(()=>{
        if(id !== "new")
        {
            setEditing(true)
            fetchCustomer(id)
        }
    },[id])

    const handleChange = (event) => {
        // const value = event.currentTarget.value 
        // const name = event.currentTarget.name
        const {name, value} = event.currentTarget
        setCustomer({...customer, [name]:value})
    }

    return ( <>
        <h1>Création d'un client</h1>
        <form>
            <Field 
                name="lastName"
                label="Nom de famille"
                placeholder="Nom de famille du client"
                value={customer.lastName}
                onChange={handleChange}
                error={errors.lastName}
            />
            <Field 
                name="firstName"
                label="Prénom"
                placeholder="Prénom du client"
                value={customer.firstName}
                onChange={handleChange}
                error={errors.firstName}
            />
            <Field 
                name="email"
                type="email"
                label="Adresse E-mail"
                placeholder="Adresse E-mail du client"
                value={customer.email}
                onChange={handleChange}
                error={errors.email}
            />
            <Field 
                name="company"
                label="Entreprise"
                placeholder="Entreprise du client"
                value={customer.company}
                onChange={handleChange}
                error={errors.company}
            />
            <div className="my-3">
                <button type="submit" className="btn btn-success me-1">Enregistrer</button>
                <Link to="/customers" className="btn btn-secondary">Retour aux clients</Link>
            </div>
        </form>
    </> );
}
 
export default CustomerPage;
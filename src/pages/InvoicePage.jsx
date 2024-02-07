import { useState, useEffect } from "react";
import invoicesAPI from "../services/invoicesAPI";
import customersAPI from "../services/customersAPI";
import { useParams, useNavigate, Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";


const InvoicePage = (props) => {

    let {id="new"} = useParams()
    const navigate = useNavigate()

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT",
        chrono: ""
    })

    const [customers, setCustomers] = useState([])

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    const [editing, setEditing] = useState(false)

    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
        }catch(error)
        {
            navigate("/invoices", {replace: true})
        }
    }

    useEffect(()=>{
        fetchCustomers()
    },[])

    const handleChange = (event) => {
        const {name, value} = event.currentTarget
        setInvoice({...invoice, [name]:value})
    }


    return ( 
        <>
            {editing ? <h1>Modification d'une facteur</h1> : <h1>Création d'une facture</h1>}
            <form>
                <Field 
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="my-3">
                    {
                        editing ?  <button type="submit" className="btn btn-warning me-1">Modifier</button> :  <button type="submit" className="btn btn-success me-1">Créer</button>
                    }
                   <Link to="/invoices" className="btn btn-secondary">Retour aux factures</Link>
                </div>
            </form>
        </>
     );
}
 
export default InvoicePage;
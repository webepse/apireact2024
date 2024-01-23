import { useState, useEffect} from 'react'
import Pagination from '../components/Pagination';
import invoicesAPI from '../services/invoicesAPI';
import moment from 'moment';

// pour la traduction
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}


const InvoicesPage = (props) => {
    return ( 
        <>
            <h1>Liste des factures</h1>
        </>
     );
}
 
export default InvoicesPage;
import { useState } from 'react'
import authAPI from '../services/authAPI';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [ error, setError ] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name 

        // pour copier ... et avec une virgule on peut ajouter ou remplacer un élément dans ma copie

        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await authAPI.authenticate(credentials)
            setError("")
        }catch(error)
        {
            setError("Aucun compte ne possède cette adresse e-mail ou les iformation ne corresponde pas")
        }
    }

    return ( 
        <>
            <div className="row">
                <div className="col-4 offset-4">
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="username">Adresse E-mail</label>
                            <input 
                                type="email"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder='Adresse E-mail de connexion'
                                id="username"
                                name="username"
                                className={"form-control " + (error && "is-invalid")}
                            />
                            { error && (
                                <p className='invalid-feedback'>{error}</p>
                            )} 
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Mot de passe</label>
                            <input 
                                type="password" 
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder='Mot de passe'
                                id="password"
                                name="password"
                                className='form-control'    
                            />
                        </div>
                        <div className="form-group my-3">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default LoginPage;
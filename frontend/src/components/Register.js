import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [name, setName] = useState('');
    const [dpi, setDpi] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/register', { name, dpi, email, password });
            setUser(response.data);
            navigate('/login');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert("Error de conexión. Intenta nuevamente.");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Registro</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Introduce tu nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dpi" className="form-label">DPI</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dpi"
                            placeholder="Introduce tu DPI"
                            value={dpi}
                            onChange={(e) => setDpi(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Introduce tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Introduce tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrar</button>
                </form>
                <div className="text-center mt-3">
                    <p>Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;

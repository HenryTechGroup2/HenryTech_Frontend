import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return <div>
        <div>
            <h1>Empresa</h1>
            <ul>
                <Link to="/">
                    <li>Inicio</li>
                </Link>
                <Link to="/preguntasfrecuentes">
                    <li>Preguntas frecuentes</li>
                </Link>
                <Link to="/sobrenosotros">
                    <li>Sobre nosotros</li>
                </Link>
            </ul>
                <h1>Mi cuenta</h1>
                <ul>
                    <Link to="/sobrenosotros">
                        <li>Iniciar sesión</li>
                    </Link>
                        <li>Registrarse</li>
                </ul>
            </div>
        </div>;
};

        export default Footer;
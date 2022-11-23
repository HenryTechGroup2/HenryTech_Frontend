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
                <h1>Métodos de pago</h1>
                <img src={"https://www.radioonlinehd.com/assets/images/usapagos-530x397.png"} alt="métodos de pago"></img>
            </div>
        </div>;
};

        export default Footer;
import React from 'react';

interface HeaderProps {
    title: string;
}

// React.FunctionComponent, ou seja, componente em forma de função
// Transforma-se o componente em constante e se usa ArrowFunction
// A interface indica quais são as propriedades que o componente pode receber (Lembra um contrato, interface em java)
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <h1>{props.title}</h1>
    );
}

export default Header;
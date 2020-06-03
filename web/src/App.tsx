import React, { useState } from 'react';
import './App.css';

import Header from './Header';

function App() {
	// a função useState retorna o valor inicial e uma função utilizada para atualizar o valor do counter
	// conceito de imutalibilidade não permite que o componente seja alterado diretamente
	const [counter, setCounter] = useState(0);

	function handleButtonClick() {
		setCounter(counter + 1);
	}
	
	return (
		<div>
			<Header title={`Counter: ${counter}`}/>
			<h1>{counter}</h1>
			<button type="button" onClick={handleButtonClick}>Sum</button>
		</div>
	);
}

export default App;

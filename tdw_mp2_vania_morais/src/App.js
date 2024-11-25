// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { fetchMarvelData } from './services/api';

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await fetchMarvelData('/characters', {
          limit: 10, // Número de resultados
        });
        setCharacters(data.data.results); // Guarda os resultados
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Marvel Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              style={{ width: '200px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [avviata, setAvviata] = useState(false);
  const [stato, setStato] = useState(false);
  const [gameID, setgameID] = useState(0);
  const [tentativo, setTentativo] = useState(0);
  const [tentativi, setTentativi] = useState(0);

  async function iniziaPartita(){
    setLoading(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const stampa = await response.json();
    console.log(stampa);
    setLoading(false);
    setAvviata(true);
    setgameID(stampa.id);
  }

  function aggiornaTenativo(e){
    setTentativo(e.target.value);
    console.log(tentativo);
  }


    async function inviaTentativo(){
      const response = await fetch(`http://localhost:8080/partita/${gameID}`, 
      {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({numero: tentativo})
      });
      const stampa = await response.json();
      setTentativi(stampa.tentativi);
      setStato(stampa.risultato);
      console.log(stampa);
    }
  return (


    <div className="App">
      <h1>indovina numero</h1>
      <button onClick={iniziaPartita}>Nuova Partita</button>

      {
          stato !== 0 && !loading && avviata ?
          <>
            <h2>id : {gameID}</h2>
            <h2>tentativi : {tentativi}</h2>
            <h2>inserisci un numero da 1 a 100</h2>
            <input thype="number" name="id" onChange={aggiornaTenativo}></input>
            <button onClick={inviaTentativo}>invia</button>
            
          </>
          :
            <>
            </>
          
        }

            {
              avviata && stato === 0 &&
              <>
                <h3>hai avuto una fortuna con la C maiuscola!!!</h3>
                <p>ci hai messo {tentativi} tentativi</p>
              </>
            }
            {
              avviata && stato === -1 &&
                <h3>numero troppo piccolo</h3>
            }
            {
              avviata && stato === 1 &&
                <h3>numero troppo grande</h3>
            }




      {
        loading &&
          <h1>caricamento...</h1>
      }
      
      

    </div>
  );
}

export default App;

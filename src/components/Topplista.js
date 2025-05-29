import { useEffect, useState } from "react";
import { supabase } from '../utils/supabase'

export default function Topplista() {
  const id = JSON.parse(localStorage.getItem('person')).id;
  const [resultat, setResultat] = useState([]);

  useEffect(() => {
    async function getTopplista() {
        const { data } = await supabase.from('svar').select(`
        person ( id, namn ),
        alternativ ( correct )`);
        const res = [];
        data.forEach(svar => {
          const personid = svar.person.id;
          let index = -1;
          res.forEach((personRad, personIndex) => {
            if (personRad.id === personid)
              index = personIndex; 
          });
          if (index === -1) {
            index = res.length;
            res[index] = { "id": personid, "namn": svar.person.namn, "antalRatt": 0 };
          }
          if (svar.alternativ.correct)
            res[index].antalRatt++;
        });
        res.sort((a, b) => b.antalRatt - a.antalRatt);
        setResultat(res);
    }
    getTopplista()
  }, []);

  return (
    <div className="topplista-div">
      <h1>Topplista</h1>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Antal rätt</th>
          </tr>
        </thead>
        <tbody>
          {resultat.map(person => {
            return (
              <tr key={`tr-${person.id}`} className={`${person.id === id ? "current-person" : ""}`}>
                <td>{person.namn}</td>
                <td>{person.antalRatt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

import { useEffect, useState } from "react";
import { supabase } from '../utils/supabase'

export default function Tipspromenad({ id }) {
    const [fragaNummer, setFragaNummer] = useState(1);
    const [svar, setSvar] = useState(1);
    const [fraga, setFraga] = useState(null);

    useEffect(() => {
        async function getFraga() {
            const { dataFraga } = await supabase.from('fraga').select(`
            nummer,
            fraga,
            alternativ ( alternativ, text )`).eq('nummer', fragaNummer);
            console.log(dataFraga);
            setFraga(dataFraga[0]);

            const { dataSvar } = await supabase.from('svar').select(`
            person,
            svar`).eq('person', id);
            console.log(dataSvar);
            if (dataSvar !== null)
                setSvar(dataSvar[0]);
        }
        getFraga()
    }, [fragaNummer])

    function onGoBack() {
        setFragaNummer(fragaNummer + 1);
    }
    async function onSubmitSvar() {
        const { error } = await supabase.from('svar').insert({ person: id, nummer: fragaNummer, svar: svar });
        setFragaNummer(fragaNummer + 1);
    }

    console.log(fraga);
    if (fraga == null)
        return null;

    return (
        <div>
            <h2>Fråga {fragaNummer}</h2>
            <legend>{fraga.fraga}</legend>
            {fraga.alternativ.map(alternativ => {
                return (
                    <div>
                        <input
                            type="radio"
                            key={`${fragaNummer}-${alternativ.alternativ}`}
                            id={`alternativ-${alternativ.alternativ}`}
                            name="alternativ"
                            value={alternativ.alternativ}
                            checked={alternativ.alternativ == svar}
                            onChange={e => { setSvar(e.target.value); console.log(e.target.value);}}
                        />
                        <label for={`alternativ-${alternativ.alternativ}`}>{alternativ.text}</label>
                    </div>
                )
            })}
            <button className={fragaNummer === 1 ? "hidden" : ""} onClick={onGoBack}>Gå tillbaka</button>
            <button className='primary-btn' onClick={onSubmitSvar}>Spara</button>
        </div>
    )
}

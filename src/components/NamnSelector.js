import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function NamnSelector() {
    const [namn, setNamn] = useState("");

    async function onNamnSelected() {
        const { data } = await supabase.from('person').insert({ namn: namn }).select();
        localStorage.setItem('person', JSON.stringify(data[0]));
        window.location.reload();
    }

    return (
    <>
        <div id="namn-backdrop">
        </div>
        <div id='namn-selector'>
            <h2>Välj namn:</h2>
            <div id='namn-selector-wrapper'>
                <input type="text" placeholder='Namn' value={namn} onChange={e => setNamn(e.target.value)} />
                <button className='primary-btn' type="button" onClick={onNamnSelected}>Starta</button>
            </div>
        </div>
    </>
    )
}

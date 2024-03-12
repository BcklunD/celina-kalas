import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../utils/supabase';
import PuffLoader from "react-spinners/PuffLoader";

const override = {
    display: "block",
    height: "85px",
    borderColor: "red",
    marginTop: "30px",
};

export default function Tipspromenad() {
    const id = JSON.parse(localStorage.getItem('person')).id;
    const [fragaNummer, setFragaNummer] = useState(1);
    const [svar, setSvar] = useState(1);
    const [fraga, setFraga] = useState(null);
    const [nastaFinns, setNastaFinns] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getFraga() {
            const { data: dataFraga } = await supabase.from('fraga').select(`
            nummer,
            fraga,
            alternativ ( alternativ, text )`).eq('nummer', fragaNummer);
            setFraga(dataFraga[0]);
            const { data: dataFragaNasta } = await supabase.from('fraga').select(`nummer`).eq('nummer', fragaNummer + 1);
            setNastaFinns(dataFragaNasta.length > 0);
            const { data: dataSvar } = await supabase.from('svar').select(`
            person,
            nummer,
            svar`).eq('person', id).eq("nummer", fragaNummer);
            if (dataSvar.length > 0)
                setSvar(dataSvar[0].svar);
            else
                setSvar(1);
            setIsLoading(false);
        }
        setIsLoading(true);
        getFraga()
    }, [fragaNummer, id])

    function onGoBack() {
        setFragaNummer(fragaNummer - 1);
    }
    async function onSubmitSvar() {
        const { error } = await supabase.from('svar').upsert({ person: id, nummer: fragaNummer, svar: svar });
        console.log(error);
        if (nastaFinns)
            setFragaNummer(fragaNummer + 1);
        else
            navigate("/topp");
    }

    if (fraga === null)
        return null;
    return (
        <div className='tipspromenad-div'>
            <h2>Fråga {fragaNummer}</h2>
            {/* <legend>{fraga.fraga}</legend> */}
            {isLoading ? <PuffLoader
                color={"#000000"}
                loading={isLoading}
                cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> : 
            <div className='alternativ'>
                {fraga.alternativ.map(alternativ => {
                    return (
                        <div key={`${fragaNummer}-${alternativ.alternativ}`}>
                            <input
                                type="radio"
                                id={`alternativ-${alternativ.alternativ}`}
                                name="alternativ"
                                value={alternativ.alternativ}
                                checked={alternativ.alternativ === parseInt(svar)}
                                onChange={e => { setSvar(e.target.value); }}
                            />
                            <label htmlFor={`alternativ-${alternativ.alternativ}`}>{alternativ.text}</label>
                        </div>
                    )
                })}
            </div>}
            <div className="button-row">
                <button className={fragaNummer === 1 ? "hidden" : ""} onClick={onGoBack}>Gå tillbaka</button>
                <button className='primary-btn' onClick={onSubmitSvar}>{nastaFinns ? "Nästa" : "Spara och avsluta"}</button>
            </div>
        </div>
    )
}

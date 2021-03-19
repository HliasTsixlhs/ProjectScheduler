import { useState, useEffect} from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            // setError(null);
            if(data.err){
                setError(data.err)
            }else{
                setError(null);
            }
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })

        // abort fetch
        return () => abortCont.abort();

    },[url])


    return { data, isPending, error };

}

export default useFetch;
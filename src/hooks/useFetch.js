import {useState,useEffect} from 'react';


const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState(null);

    const postData = (dataToPost) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(dataToPost)
        })
    }

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async(fetchOptions) => {
            setIsPending(true);
            try {
                const response = await fetch(url,
                     {
                         ...fetchOptions,
                    signal: controller.signal
                });

                if(!response.ok) {
                    throw new Error(response.statusText)
                }

                const json = await response.json();

                setIsPending(false);
                setData(json);
                setError(null); 
            } catch(error) {
                if(error.name === "AbortError") {
                    console.log("Fetch Request Aborted");
                } else {
                    setIsPending(false);
                    setError("Couldn't fetch the data");
                }
                
            } 
        }
        
        if(method === "GET") {
            fetchData();
        }

        if(method === "POST" && options) {
            fetchData(options);
        }


        //Cleanup function
        return () => {
            controller.abort();
        }

    }, [url, method, options])

    return { data, isPending, error, postData}

}

export default useFetch;

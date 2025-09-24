import React , {useState , useEffect} from "react";

export  default function Search({fetchSuggestions}){
    const [query , setquery]=useState("");
    const [suggestions, setSuggestions]=useState([]);

     const [loading, setLoading] = useState(false);

    const handleChange=(e)=>{
        const value=e.target.value;
        setquery(value);
    }

    useEffect(()=>{
        if(!query){
            setSuggestions([]) 
            return;
        }
        const controller = new AbortController();
        setLoading(true);

        const timeout=setTimeout(()=>{
            fetchSuggestions(query,controller.signal)
            .then((results)=>setSuggestions(results))
            .finally(()=>setLoading(false))
        },500)

        return ()=>{
            clearTimeout(timeout);
            controller.abort();
        };
    },[query,fetchSuggestions])

       return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      {loading && <div>Loading...</div>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {suggestions.map((s, i) => (
          <li
            key={i}
            style={{
              padding: "6px 8px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
    
     

import  {Navbar}  from "../components/Navbar"
import  RateLimitedUI  from "../components/RateLimitedUI"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const HomePage = () => {
  const [israteLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
        try {
          const res = await axios.get("http://localhost:5001/api/notes");
          console.log(res.data);
          setNotes(res.data);
          setRateLimited(false);
        } catch (error) {
          console.error("Error fetching notes:", error);
          if(error.response?.status === 429){
            setRateLimited(true);
          }else{
            toast.error("Failed to fetch notes");
        }
    }
    finally{
        setLoading(false);
    }};

    fetchNotes();
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {israteLimited && <RateLimitedUI />}

    </div>
  )
}
export default HomePage
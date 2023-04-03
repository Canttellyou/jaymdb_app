import { useEffect, useState } from "react";
import axios from 'axios';
import { apiKey } from "../API";


export const useTrailerData = (id) => {
    const [loading, setLoading] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)
                    .then((resp) => {
                        const dataMap = resp.data.results.map(data => data)
                        setVideoData(dataMap);
                    })
                    .catch((error) => {
                        console.debug(error);
                        setError(error + "\nPull down to refresh")
                    });




                setLoading(false);

            } catch (error) {
                console.debug(error);
                setError(error + "\nPull down to refresh")
                setLoading(false);
            }
        }
        fetchData()
    }, [])


    return { loading, videoData, error };
};


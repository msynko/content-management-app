
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const ActiveResource = () => {
    const [activeResource, setActiveResource] = useState([]);
    const [seconds, setSeconds] = useState();

    useEffect(() => {
        async function fetchResource() {
            const axiosRes = await axios.get("/api/activeresource");
            const response = axiosRes.data;

            const timeToFinish = parseInt(response.timeToFinish, 10);
            const elapsedTime = moment().diff(moment(response.activationTime), "seconds");
            const updatedTimeToFinish = (timeToFinish * 60) - elapsedTime;

            if (updatedTimeToFinish >= 0) {
                response.timeToFinish = updatedTimeToFinish;
                setSeconds(updatedTimeToFinish)
            }

            setActiveResource(response); 
        } 
        fetchResource()
    }, [])
    
    useEffect(() => {
        const interval = setInterval(() => {
               setSeconds(seconds - 1) 
        }, 1000)
        
        if (seconds < 0) {
           clearInterval(interval)
        }
        
        return () => clearInterval(interval);
    }, [seconds]);

    const hasResource = activeResource && activeResource.id;

    const completeResource = () => {
        axios.patch("/api/resources", {...activeResource, status: "complete"}).then(_ => location.reload())
        .catch(_ => alert("Cannot complete the resource!"))
    }
    
    return (
        <div className="active-resource">
            <h1 className="resource-name">{ hasResource? activeResource.title : "No resource Active"}</h1>
            <div className="time-wrapper">
                { hasResource && (
                    seconds > 0 ? <h2 className="elapsed-time">
                        { seconds}
                      </h2> : <h2 className="elapsed-time">
                            <button className="button is-success"
                            onClick={completeResource}>Click and Done!</button> </h2>
                )}</div>
            {
                hasResource ?
                <Link href={`/resources/${activeResource.id}`}>
                    <a className="button">
                    Go to resource
                    </a>
                </Link> :
                <Link href="/">
                    <a className="button">
                    Go to resources
                    </a>
                </Link>
            }

      </div>
    )
}
export default ActiveResource;

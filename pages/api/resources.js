import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {

    if (req.method === "GET") {
        const dataRes = await fetch(`${process.env.API_URL}/resources`);
        const data = await dataRes.json();
        
        return res.send(data)
    }

    if (req.method === "POST" || req.method === "PATCH") {
        const { id, title, description, link, timeToFinish, priority } = req.body;
        let url = `${process.env.API_URL}/resources`;

        if (!title || !description || !link || !timeToFinish || !priority) {
            return res.status(422).send("Data are missing!");
        }

            if (req.method === "PATCH") {
                url += `/${id}`;
            }


        try {
            const response = await axios[req.method.toLowerCase()](url, req.body);

            return res.send(response.data);

        } catch {
            
            return res.status(422).send("Data can't be saved")
        }
    }
    

}

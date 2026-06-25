let statusDrone = 0;

export default function handler(req, res) {

    // ESP envia o status
    if (req.query.status !== undefined) {

        statusDrone = Number(req.query.status);

        console.log("Status recebido:", statusDrone);

        return res.send("OK");
    }

    // Página consulta o status
    return res.json({
        status: statusDrone
    });

}
let comando = "NORMAL";

export default function handler(req, res) {

    // Define comando pelo site
    if (req.query.set) {
        comando = req.query.set;
        return res.status(200).send("OK");
    }

    // ESP consulta comando
    const resposta = comando;

    // Limpa após leitura
    comando = "NORMAL";

    res.status(200).send(resposta);
}
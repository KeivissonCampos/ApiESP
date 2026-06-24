let ultimoValor = "0";

export default function handler(req, res) {

    if (req.method === "GET") {

        if (req.query.valor) {

            ultimoValor = req.query.valor;

            return res.status(200).send("OK");
        }

        return res.status(200).send(ultimoValor);
    }

    res.status(405).send("Metodo nao permitido");
}
let ultimoValor = "0";
let comando = "NORMAL";

export default function handler(req, res) {

    // Botão do site enviando comando
    if(req.query.set){
        comando = req.query.set;
        return res.status(200).send("OK");
    }

    // ESP enviando valor
    if(req.query.valor){

        ultimoValor = req.query.valor;

        const resposta = comando;

        comando = "NORMAL";

        return res.status(200).send(resposta);
    }

    // Site consultando valor
    return res.status(200).send(ultimoValor);
}
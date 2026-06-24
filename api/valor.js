let ultimoValor = "0";
let comando = "NORMAL";

export default function handler(req, res) {

    console.log("Comando atual:", comando);

    if(req.query.set){
        comando = req.query.set;
        console.log("Novo comando:", comando);
        return res.send("OK");
    }

    if(req.query.valor){

        ultimoValor = req.query.valor;

        const resposta = comando;

        comando = "NORMAL";

        console.log("Respondendo:", resposta);

        return res.send(resposta);
    }

    return res.send(ultimoValor);
}
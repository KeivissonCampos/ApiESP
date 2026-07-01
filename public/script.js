// ------------------------------
// CLIMA REAL (OPEN-METEO)
// ------------------------------

document.getElementById("btnReset").addEventListener("click", async () => {
    try {
        const resposta = await fetch("https://api-esp-brown.vercel.app/api/valor?status=0");

        if (resposta.ok) {
            console.log("Status enviado com sucesso!");
        } else {
            console.log("Erro ao enviar status.");
        }
    } catch (erro) {
        console.error("Erro:", erro);
    }
});

async function carregarClimaSenges() {

    const lat = -24.11;
    const lon = -49.46;

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    try {

        const resposta = await fetch(url);

        const dados = await resposta.json();

        console.log(dados);

        console.log("temp-atual:", document.getElementById('temp-atual'));
        console.log("umidade-atual:", document.getElementById('umidade-atual'));
        console.log("vento-atual:", document.getElementById('vento-atual'));
        console.log("clima-avaliacao:", document.getElementById('clima-avaliacao'));

        const temperatura =
            dados.current.temperature_2m;

        const umidade =
            dados.current.relative_humidity_2m;

        const vento =
            dados.current.wind_speed_10m;

        document.getElementById('temp-atual')
            .innerText = temperatura + "°C";

        document.getElementById('umidade-atual')
            .innerText = umidade + "%";

        document.getElementById('vento-atual')
            .innerText = vento + " km/h";

        const avaliacao =
            document.getElementById('clima-avaliacao');

        if (vento > 20 || temperatura > 38)
        {
            avaliacao.innerText =
                "Alerta: Vento Forte/Calor Extremo";

            avaliacao.className =
                "status-alerta";
        }
        else
        {
            avaliacao.innerText =
                "Ideal para Voo e Irrigação";

            avaliacao.className =
                "status-bom";
        }

    }
    catch (erro)
    {
        console.error("Erro ao buscar clima:", erro);

        document.getElementById('temp-atual')
            .innerText = "Erro";

        document.getElementById('umidade-atual')
            .innerText = "Erro";

        document.getElementById('vento-atual')
            .innerText = "Erro";
    }
}

// ------------------------------
// STATUS VINDO DO ESP32
// ------------------------------

async function atualizarDrone()
{
    try
    {
        let resposta =
            await fetch('/api/valor');

        let dados =
            await resposta.json();

        const container =
            document.getElementById('alerta-container');

        const titulo =
            document.getElementById('alerta-titulo');

        const desc =
            document.getElementById('alerta-desc');

        switch(dados.status)
        {
            case 1:

                titulo.innerText =
                    "🔥 FOCO DE INCÊNDIO DETECTADO!";

                desc.innerText =
                    "Anomalia térmica identificada no talhão.";

                container.className =
                    "alerta-box alerta-fogo";

                break;

            case 2:

                titulo.innerText =
                    "⚠️ EROSÃO DETECTADA";

                desc.innerText =
                    "Desgaste de solo encontrado.";

                container.className =
                    "alerta-box alerta-erosao";

                break;

            case 3:

                titulo.innerText =
                    "🌊 INUNDAÇÃO DETECTADA";

                desc.innerText =
                    "Acúmulo excessivo de água.";

                container.className =
                    "alerta-box alerta-inundacao";

                break;

            case 4:

                titulo.innerText =
                    "🌱 SOLO SAUDÁVEL";

                desc.innerText =
                    "Condições ideais encontradas.";

                container.className =
                    "alerta-box alerta-normal";

                break;

            case 5:

                titulo.innerText =
                    "✅ VARREDURA CONCLUÍDA";

                desc.innerText =
                    "Nenhuma irregularidade encontrada.";

                container.className =
                    "alerta-box alerta-normal";

                break;

            default:

                titulo.innerText =
                    "Aguardando Drone...";

                desc.innerText =
                    "Aguardando informações da varredura.";

                container.className =
                    "alerta-box";

                break;
        }

    }
    catch(err)
    {
        console.log(err);
    }
}

// ------------------------------
// INICIALIZAÇÃO
// ------------------------------

window.onload = () => {

    carregarClimaSenges();

    atualizarDrone();

    // Atualiza clima a cada 5 minutos
    setInterval(carregarClimaSenges, 300000);

    // Atualiza status do ESP a cada 1 segundo
    setInterval(atualizarDrone, 1000);
};
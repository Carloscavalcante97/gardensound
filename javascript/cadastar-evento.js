const BASE_URL = "https://soundgarden-api.vercel.app/events";
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

form.onsubmit = async (evento) => {
  evento.preventDefault();

  const novoEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value.slice(0, 16),
    number_tickets: inputLotacao.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(novoEvento),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const resposta = await fetch(`${BASE_URL}`, options );
  const conteudoResposta = await resposta.json();
  console.log(conteudoResposta);

  if (resposta.status == 201) {
    alert("Evento cadastrado com sucesso!");
    window.location.href = "admin.html";

    inputNome.value = "";
    inputBanner.value = "";
    inputAtracoes.value = "";
    inputDescricao.value = "";
    inputData.value = "";
    inputLotacao.value = "";
  }
};

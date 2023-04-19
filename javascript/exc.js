const BASE_URL = "https://soundgarden-api.vercel.app/events/";


const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

const id = new URLSearchParams(window.location.search).get("id");

async function listarEvento() {
  const options = {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  };
  const resposta = await fetch(`${BASE_URL}${id}`, options);
  const conteudoResposta = await resposta.json();
  inputNome.value = conteudoResposta.name;
  inputBanner.value = conteudoResposta.poster;
  inputAtracoes.value = conteudoResposta.attractions;
  inputDescricao.value = conteudoResposta.description;
  inputData.value = conteudoResposta.scheduled.slice(0, 16);
  inputLotacao.value = conteudoResposta.number_tickets;
}
listarEvento();

form.onsubmit = async (evento) => {
  evento.preventDefault();

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const resposta = await fetch(`${BASE_URL}${id}`, options);
  if (resposta.status == 204) {
    alert("Evento excluido com sucesso!!");
    window.location.href = window.location.pathname == "excluir-evento.html"
    ? `${window.location.origin}/admin.html`
    : `${window.location.origin}//gardensound/admin.html`;

  }
};

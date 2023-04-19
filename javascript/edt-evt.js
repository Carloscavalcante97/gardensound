const BASE_URL = "https://soundgarden-api.vercel.app/events";
const form = document.querySelector("form");
const id = new URLSearchParams(window.location.search).get("id");
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");

async function listarEvento() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };
  const response = await fetch(`${BASE_URL}/${id}`, options);
  const evento = await response.json();

  inputNome.value = evento.name;
  inputBanner.value = evento.poster;
  inputAtracoes.value = evento.attractions.join(",");
  inputDescricao.value = evento.description;
  inputData.value = evento.scheduled.slice(0, 16);
  inputLotacao.value = evento.number_tickets;
}
listarEvento();

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const atualizarEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value,
    number_tickets: inputLotacao.value,
  };
  const options = {
    method: "PUT",
    body: JSON.stringify(atualizarEvento),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };
  const response = await fetch(`${BASE_URL}/${id}`, options);
  if (response.ok) {
    alert("Evento atualizado com sucesso!");
    window.location.href = window.location.pathname == "editar-evento.html"
    ? `${window.location.origin}/admin.html`
    : `${window.location.origin}//gardensound/admin.html`;
  }
});

const BASE_URL = "https://soundgarden-api.vercel.app/bookings";

const tabela = document.querySelector("tbody");
const titulo = document.querySelector("#h1eventos");

// const id = new URLSearchParams(window.location.search).get("id");

async function listasReservas() {
  try {
    const resposta = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    });

    if (resposta.ok) {
      try {
        const conteudoResposta = await resposta.json();
        console.log(conteudoResposta);
        if (conteudoResposta && conteudoResposta.length > 0) {
          titulo.innerHTML = conteudoResposta[0].event.name;

          conteudoResposta.forEach((item) => {
            tabela.innerHTML += `<tr>
              <th scope="row">${conteudoResposta.indexOf(item) + 1}</th>
              <td>${item.owner_name}</td>
              <td>${item.owner_email}</td>
              <td>${item.number_tickets}</td>
              <td>
                <button class="btn btn-danger" onclick="deletaReserva('${
                  item._id
                }')">excluir</button>
              </td>
            </tr>`;
          });
        }
      } catch (error) {
        console.error("Erro ao analisar a resposta da API como JSON:", error);
      }
    } else {
      console.error(`Erro na resposta do servidor: ${resposta.status} ${resposta.statusText}`);
    }
  } catch (erro) {
    console.error(`Erro na requisição: ${erro}`);
    // Exiba uma mensagem de erro na tela aqui, se necessário
  }
}

listasReservas();

async function deletaReserva(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });

  if (resposta.status == 204) {
    alert("Reserva deletada!");
    window.location.reload();
  } else {
    console.error(`Erro ao excluir reserva: ${resposta.status} ${resposta.statusText}`);
  }
}






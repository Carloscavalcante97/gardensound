const BASE_URL = "https://soundgarden-api.vercel.app/events"


async function listarEventos() {
    const tabel = document.querySelector("tbody");
    const resposta = await fetch(`${BASE_URL}`, {
      method: "GET",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
    });
    console.log(resposta);
    const dataCorreta = (date) => {
      let data = date.split("");
      let dataArrumada =
        data.slice(8, 10).join("") +
        "/" +
        data.slice(5, 7).join("") +
        "/" +
        data.slice(0, 4).join("");
      return dataArrumada;
    };
  
    const conteudoResposta = await resposta.json();
    conteudoResposta.forEach((item) => {
      tabel.innerHTML += `<tr>
      <th scope="row">${conteudoResposta.indexOf(item) + 1}</th>
      <td>${dataCorreta(item.scheduled)}
        </td>
      <td>${item.name}</td>
      <td>${item.attractions}</td>
      <td>
          <a href="reservas.html?id=${
            item._id
          }" class="btn btn-dark">ver reservas</a>
          <a href="editar-evento.html?id=${
            item._id
          }" class="btn btn-secondary">editar</a>
          <a href="excluir-evento.html?id=${
            item._id
          }" class="btn btn-danger2">excluir</a>
      </td>
  </tr>`;
    });
  }
  
  listarEventos();

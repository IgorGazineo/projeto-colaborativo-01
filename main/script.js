const collaboratorsUl = document.querySelector(".colaboradores");
const inputEl = document.getElementById("input-pesquisa");

const collaboratorsInfo = [
  {
    name: "Igor Gazineo",
    isMale: true,
    hasBackButton: true,
    path: "../igor-000/igor.html",
    picture:
      "https://media.licdn.com/dms/image/v2/D4D03AQEQsxrzUhbVkg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705305900860?e=1749686400&v=beta&t=rhNEWW401j4BCNHxM5ir0y7l_vE9UC3qnPYY1yIZjdY",
    devSpecialization: "full stack",
  },
  {
    name: "Leticia Leme",
    isMale: false,
    hasBackButton: true,
    path: "../LeticiaLemeHub/index.html",
    picture: "https://avatars.githubusercontent.com/u/194449582?v=4",
    devSpecialization: "frontend",
  },
  {
    name: "Andre Krykhtine",
    isMale: true,
    hasBackButton: true,
    path: "../andreKrykhtine/andre.html",
    picture: "https://avatars.githubusercontent.com/u/185527961?v=4",
    devSpecialization: "frontend",
  },
  {
    name: "Rodrigo Marques Tavares",
    isMale: true,
    hasBackButton: false,
    path: "../rodrigo-274/rodrigo.html",
    picture: "https://avatars.githubusercontent.com/u/157378101?v=4",
    devSpecialization: "frontend",
  },
  {
    name: "Victor Ponce Ferandes",
    isMale: true,
    hasBackButton: false,
    path: "../victor-22/victor.html",
    picture:
      "https://media.licdn.com/dms/image/v2/D4D03AQF1LhFxdd4qcQ/profile-displayphoto-shrink_800_800/B4DZYiSs7MGwAg-/0/1744332050695?e=1750291200&v=beta&t=79llcLSEuUCBMTzH5AzPVthNT2O4cbRoqWiWHa4MR0A",
    devSpecialization: "frontend",
  },
  {
    name: "Felipe Melo Gomes",
    isMale: true,
    hasBackButton: false,
    path: "https://portfoliofmg.netlify.app/",
    picture:
      "https://avatars.githubusercontent.com/u/85581543?s=400&u=a2231acbdce15a9430e760d715910d7411067bc4&v=4",
    devSpecialization: "full stack",
  },
  {
    name: "Diogenes Leonardo",
    isMale: true,
    hasBackButton: true,
    path: "../diogenes-09/diogenes.html",
    picture:
      "https://media.licdn.com/dms/image/v2/D4D03AQF_gfhiWGoBrQ/profile-displayphoto-shrink_800_800/B4DZQGFUIjGkAg-/0/1735268845149?e=1750291200&v=beta&t=Ih11IQ8FVnKR8dn2ED3kNNbypMnsp29sR_Z3s9rl3ic",
    devSpecialization: "full stack",
  },
  {
    name: "Rafael Thomaz",
    isMale: true,
    hasBackButton: true,
    path: "../Rafael_Thomaz-001/rafael.html",
    picture:
      "https://avatars.githubusercontent.com/u/114960583?s=400&u=02a7cd678769fa7d4b078971439761aced4658d0&v=4",
    devSpecialization: "frontend",
  },
  {
    name: "Gabriel Henrique",
    isMale: true,
    hasBackButton: false,
    path: "../gabriel-204/gabriel.html",
    picture: "https://avatars.githubusercontent.com/u/173842653?v=4",
    devSpecialization: "full stack",
  },
  {
    name: "Márcio Freitas",
    isMale: true,
    hasBackButton: true,
    path: "../AlexFreitas-000/alexfreitas.html",
    picture:
      "https://media.licdn.com/dms/image/v2/D4D03AQF6TwWOIWANJw/profile-displayphoto-shrink_800_800/B4DZV4RmJjHYAc-/0/1741479634363?e=1750291200&v=beta&t=JvUdukmS6rV7n9zkzxo8leEa7y48N60Hpu9bi9FfyA0",
    devSpecialization: "full stack",
  },
  {
    name: "Mariana Santos",
    isMale: false,
    hasBackButton: true,
    path: "../MarianaSantos-000/mariana.html",
    picture: "../MarianaSantos-000/imagens/fotoperfil.jpg",
    devSpecialization: "full stack",
  },
  {
    name: "Igor Lira",
    isMale: true,
    hasBackButton: true,
    path: "../igor_lira/igor.html",
    picture: "../igor_lira/assets/foto-perfil.jpeg",
    devSpecialization: "full stack",
  },
];

const makeAListOfColaborators = ({
  name,
  isMale,
  hasBackButton,
  path,
  picture,
  devSpecialization,
}) => {
  collaboratorsUl.innerHTML += `
    <li class="colaborador">
    <img class='img-perfil' src="${picture}" alt="Foto de ${name}" />
          
            <div class='colaborador-info'>
              
              <h3 class='colaborador-title'>${
                isMale ? "Colaborador" : "Colaboradora"
              }</h3>
              <div class='colaborador-name'>${name}</div>
              <div class='colaborador-area'><b>Área:</b> ${
                devSpecialization ? devSpecialization : "Não informada"
              }</div>
              <a href="${path}" class='colaborador-btn' target="${
    hasBackButton ? "_self" : "_blank"
  }">Página pessoal</a>
            </div>
          
        </li>
  `;
};

collaboratorsInfo.forEach(makeAListOfColaborators);

inputEl.addEventListener("keyup", () => {
  collaboratorsUl.innerHTML = "";
  const inputValue = inputEl.value.toLowerCase();
  const collaboratorsInfoFiltered = collaboratorsInfo.filter(({ name }) =>
    name.toLowerCase().includes(inputValue)
  );
  collaboratorsInfoFiltered.forEach(makeAListOfColaborators);

  if (!collaboratorsInfoFiltered.length) {
    collaboratorsUl.innerHTML =
      "<li class='not-found'>Colaborador(a) não encontrado(a).</li>";
  }
});

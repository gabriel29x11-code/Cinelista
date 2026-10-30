const filmes = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "ação",
        nota: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        descricao: "Um ladrão especializado em invadir sonhos recebe uma missão quase impossível."
    },
    {
        id: 2,
        titulo: "Interestelar",
        ano: 2014,
        genero: "suspense",
        nota: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        descricao: "Um grupo de astronautas viaja pelo espaço em busca de um novo lar para a humanidade."
    },
    {
        id: 3,
        titulo: "O Cavaleiro das Trevas",
        ano: 2008,
        genero: "ação",
        nota: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        descricao: "Batman enfrenta um criminoso que ameaça mergulhar Gotham City no caos."
    },
    {
        id: 4,
        titulo: "Invocação do Mal",
        ano: 2013,
        genero: "terror",
        nota: 7.5,
        poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
        descricao: "Um casal de investigadores paranormais ajuda uma família aterrorizada por uma presença misteriosa."
    },
    {
        id: 5,
        titulo: "Titanic",
        ano: 1997,
        genero: "romance",
        nota: 7.9,
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        descricao: "Dois jovens de classes sociais diferentes se apaixonam durante uma viagem no Titanic."
    },
    {
        id: 6,
        titulo: "Ilha do Medo",
        ano: 2010,
        genero: "suspense",
        nota: 8.2,
        poster: "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
        descricao: "Um investigador viaja até uma ilha para descobrir o desaparecimento de uma paciente."
    },
    {
        id: 7,
        titulo: "Corra!",
        ano: 2017,
        genero: "terror",
        nota: 7.8,
        poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
        descricao: "Um jovem visita a família de sua namorada e descobre situações cada vez mais estranhas."
    },
    {
        id: 8,
        titulo: "Como Eu Era Antes de Você",
        ano: 2016,
        genero: "romance",
        nota: 7.4,
        poster: "https://image.tmdb.org/t/p/w500/Ia3dzj5LnCj1ZBdlVeJrbKJQxG.jpg",
        descricao: "Uma jovem começa a trabalhar como cuidadora de um homem que teve sua vida transformada por um acidente."
    }
];

const listaFilmes = document.getElementById("lista-filmes");
const listaFavoritos = document.getElementById("lista-favoritos");
const pesquisa = document.getElementById("pesquisa");

let favoritos = JSON.parse(localStorage.getItem("cinelista-favoritos")) || [];
let generoAtual = "todos";

function criarCartao(filme) {
    return `
        <article class="filme">
            <img src="${filme.poster}" alt="Pôster do filme ${filme.titulo}" onerror="this.src='https://placehold.co/500x750/202025/ffffff?text=Sem+Poster'">
            <div class="filme-info">
                <h3>${filme.titulo}</h3>
                <p>${filme.ano} | ${filme.genero}</p>
                <p class="nota">★ ${filme.nota}</p>
                <div class="acoes">
                    <button onclick="alternarFavorito(${filme.id})">
                        ${favoritos.includes(filme.id) ? "Remover" : "Favoritar"}
                    </button>
                    <button onclick="verDetalhes(${filme.id})">Detalhes</button>
                </div>
            </div>
        </article>
    `;
}

function mostrarFilmes() {
    const termo = pesquisa.value.toLowerCase();

    const resultado = filmes.filter(filme => {
        const nomeCombina = filme.titulo.toLowerCase().includes(termo);
        const generoCombina = generoAtual === "todos" || filme.genero === generoAtual;

        return nomeCombina && generoCombina;
    });

    if (resultado.length === 0) {
        listaFilmes.innerHTML = '<p class="mensagem-vazia">Nenhum filme encontrado.</p>';
        return;
    }

    listaFilmes.innerHTML = resultado.map(criarCartao).join("");
}

function mostrarFavoritos() {
    const filmesFavoritos = filmes.filter(filme => favoritos.includes(filme.id));

    if (filmesFavoritos.length === 0) {
        listaFavoritos.innerHTML = '<p class="mensagem-vazia">Você ainda não adicionou favoritos.</p>';
        return;
    }

    listaFavoritos.innerHTML = filmesFavoritos.map(criarCartao).join("");
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem("cinelista-favoritos", JSON.stringify(favoritos));

    mostrarFilmes();
    mostrarFavoritos();
}

function verDetalhes(id) {
    const filme = filmes.find(item => item.id === id);

    alert(
        filme.titulo + "\n\n" +
        "Ano: " + filme.ano + "\n" +
        "Gênero: " + filme.genero + "\n" +
        "Nota: " + filme.nota + "\n\n" +
        filme.descricao
    );
}

pesquisa.addEventListener("input", mostrarFilmes);

const botoesCategoria = document.querySelectorAll(".categoria");

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesCategoria.forEach(item => item.classList.remove("ativa"));

        botao.classList.add("ativa");
        generoAtual = botao.dataset.genero;

        mostrarFilmes();
    });
});

function desenharGrafico() {
    const canvas = document.getElementById("grafico");
    const ctx = canvas.getContext("2d");

    const dados = filmes.slice(0, 5);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Arial";
    ctx.fillText("Notas dos filmes", 20, 25);

    dados.forEach((filme, index) => {
        const altura = filme.nota * 20;
        const x = 35 + index * 130;
        const y = 250 - altura;

        ctx.fillStyle = "#e50914";
        ctx.fillRect(x, y, 65, altura);

        ctx.fillStyle = "#ffffff";
        ctx.font = "12px Arial";
        ctx.fillText(filme.nota.toString(), x + 15, y - 8);

        ctx.save();
        ctx.translate(x + 30, 265);
        ctx.rotate(-0.4);
        ctx.fillText(filme.titulo, 0, 0);
        ctx.restore();
    });
}

mostrarFilmes();
mostrarFavoritos();
desenharGrafico();
let todosProdutos = [];
let produtosFiltrados = [];
let indiceCarrossel = 0;
const ITENS_POR_PAGINA = 3;

async function carregarProdutos() {
  const resposta = await fetch('http://localhost:3000/products');
  todosProdutos = await resposta.json();
  mostrarEstatisticas();
  aplicarFiltrosEOrdenacao();
}

function mostrarEstatisticas() {
  const totalItens = todosProdutos.length;
  const categoriasUnicas = new Set(todosProdutos.map((p) => p.category.id));
  const totalCategorias = categoriasUnicas.size;
  const totalMoedas = todosProdutos.reduce((soma, p) => soma + p.price, 0);

  document.getElementById('estatisticas').innerHTML = `
    <div class="stat">
      <span class="numero">${totalItens}</span>
      <span class="rotulo">itens catalogados</span>
    </div>
    <div class="stat">
      <span class="numero">${totalCategorias}</span>
      <span class="rotulo">categorias</span>
    </div>
    <div class="stat">
      <span class="numero">🪙${totalMoedas}</span>
      <span class="rotulo">em moedas de ouro</span>
    </div>
  `;
}

document.querySelectorAll('.atalho').forEach((atalho) => {
  atalho.addEventListener('click', () => {
    const categoria = atalho.dataset.categoria;
    document.getElementById('filtro-tipo').value = categoria;
    aplicarFiltrosEOrdenacao();
  });
});
function renderizarProdutos(lista) {
  const classesCategoria = { 1: 'card-ataque', 2: 'card-defesa', 3: 'card-consumivel' };
  const divProdutos = document.getElementById('lista-produtos');
  divProdutos.innerHTML = '';

  lista.forEach((produto) => {
    divProdutos.innerHTML += `
      <a href="produto.html?id=${produto.id}" class="card ${classesCategoria[produto.category.id]}">
        <div class="selo">${produto.category.name.substring(0, 3).toUpperCase()}</div>
        <div class="card-imagem-area">
          <img src="${produto.imageUrl}" alt="${produto.name}">
        </div>
        <h3>${produto.name}</h3>
        <p class="preco">🪙 ${produto.price}</p>
      </a>
    `;
  });
}

function renderizarCarrossel() {
  const divProdutos = document.getElementById('lista-produtos');
  divProdutos.style.opacity = 0;

  setTimeout(() => {
    const fatia = produtosFiltrados.slice(indiceCarrossel, indiceCarrossel + ITENS_POR_PAGINA);
    renderizarProdutos(fatia);
    divProdutos.style.opacity = 1;
  }, 200);

  const setaEsquerda = document.getElementById('seta-esquerda');
  const setaDireita = document.getElementById('seta-direita');

  setaEsquerda.disabled = indiceCarrossel === 0;
  setaDireita.disabled = indiceCarrossel + ITENS_POR_PAGINA >= produtosFiltrados.length;
}

function aplicarFiltrosEOrdenacao() {
  const categoriaEscolhida = document.getElementById('filtro-tipo').value;
  const ordenacaoEscolhida = document.getElementById('ordenarcao').value;

  let resultado = todosProdutos;

  if (categoriaEscolhida) {
    resultado = resultado.filter(
      (produto) => produto.category.id === +categoriaEscolhida
    );
  }

  if (ordenacaoEscolhida === 'alfabetica-maior') {
    resultado = [...resultado].sort((a, b) => a.name.localeCompare(b.name));
  } else if (ordenacaoEscolhida === 'alfabetica-menor') {
    resultado = [...resultado].sort((a, b) => b.name.localeCompare(a.name));
  } else if (ordenacaoEscolhida === 'valor-min') {
    resultado = [...resultado].sort((a, b) => a.price - b.price);
  } else if (ordenacaoEscolhida === 'valor-max') {
    resultado = [...resultado].sort((a, b) => b.price - a.price);
  }

  produtosFiltrados = resultado;
  indiceCarrossel = 0;
  renderizarCarrossel();
}

document.getElementById('filtro-tipo').addEventListener('change', aplicarFiltrosEOrdenacao);
document.getElementById('ordenarcao').addEventListener('change', aplicarFiltrosEOrdenacao);

document.getElementById('seta-direita').addEventListener('click', () => {
  indiceCarrossel += ITENS_POR_PAGINA;
  renderizarCarrossel();
});

document.getElementById('seta-esquerda').addEventListener('click', () => {
  indiceCarrossel -= ITENS_POR_PAGINA;
  renderizarCarrossel();
});

carregarProdutos();
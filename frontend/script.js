let todosProdutos = [];

async function carregarProdutos() {
  const resposta = await fetch('http://localhost:3000/products');
  todosProdutos = await resposta.json();
  aplicarFiltrosEOrdenacao();
}

function renderizarProdutos(lista) {
  const divProdutos = document.getElementById('lista-produtos');
  divProdutos.innerHTML = '';

  lista.forEach((produto) => {
    divProdutos.innerHTML += `
      <div class="card">
        <img src="${produto.imageUrl}" alt="${produto.name}">
        <h3>${produto.name}</h3>
        <p>Preço: 🪙${produto.price}</p>
        <p>Peças disponíveis: ${produto.stock}</p>
      </div>
    `;
  });
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

  renderizarProdutos(resultado);
}

document.getElementById('filtro-tipo').addEventListener('change', aplicarFiltrosEOrdenacao);
document.getElementById('ordenarcao').addEventListener('change', aplicarFiltrosEOrdenacao);

carregarProdutos();
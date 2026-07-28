const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function desenharProduto() {
  const resposta = await fetch(`http://localhost:3000/products/${id}`);
  const produto = await resposta.json();

  const classesCategoria = { 1: 'card-ataque', 2: 'card-defesa', 3: 'card-consumivel' };
  const classeCategoria = classesCategoria[produto.category.id];
  const siglaCategoria = produto.category.name.substring(0, 3).toUpperCase();
  const semEstoque = produto.stock === 0;

  const breadcrumb = document.getElementById('breadcrumb');
  breadcrumb.innerHTML = `
    <a href="index.html">Vitrine</a>
    <span>›</span>
    <a href="index.html?categoria=${produto.category.id}">${produto.category.name}</a>
    <span>›</span>
    <span>${produto.name}</span>
  `;

  const produtoTela = document.getElementById('detalhes-produto');
  produtoTela.innerHTML = `
    <div class="produto-detalhe">
      <div class="produto-imagem ${classeCategoria}">
        <div class="selo">${siglaCategoria}</div>
        <img src="${produto.imageUrl}" alt="${produto.name}">
      </div>
      <div class="produto-info">
        <h1>${produto.name}</h1>
        <p>${produto.description}</p>
        <p>Preço: 🪙${produto.price}</p>
        <p>Peças disponíveis: ${produto.stock}</p>
        <button id="btn-comprar" ${semEstoque ? 'disabled' : ''}>
          ${semEstoque ? 'Esgotado' : 'Comprar'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-comprar').addEventListener('click', () => {
    if (produto.stock === 0) {
      alert('Este item está esgotado no momento.');
      return;
    }
    adicionarAoCarrinho(produto.id);
    alert(`${produto.name} foi adicionado ao carrinho!`);
  });

  carregarRelacionados(produto);
}

async function carregarRelacionados(produtoAtual) {
  const resposta = await fetch('http://localhost:3000/products');
  const todosProdutos = await resposta.json();

  let relacionados = todosProdutos.filter(
    (item) => item.category.id === produtoAtual.category.id && item.id !== produtoAtual.id
  );

  relacionados = relacionados.sort(() => Math.random() - 0.5).slice(0, 3);

  const classesCategoria = { 1: 'card-ataque', 2: 'card-defesa', 3: 'card-consumivel' };
  const divRelacionados = document.getElementById('produtos-relacionados');

  if (relacionados.length === 0) {
    divRelacionados.innerHTML = '';
    document.getElementById('titulo-relacionados').style.display = 'none';
    return;
  }

  divRelacionados.innerHTML = '';
  relacionados.forEach((item) => {
    divRelacionados.innerHTML += `
      <a href="produto.html?id=${item.id}" class="card ${classesCategoria[item.category.id]}">
        <div class="selo">${item.category.name.substring(0, 3).toUpperCase()}</div>
        <div class="card-imagem-area">
          <img src="${item.imageUrl}" alt="${item.name}">
        </div>
        <h3>${item.name}</h3>
        <p class="preco">🪙 ${item.price}</p>
      </a>
    `;
  });
}

desenharProduto();
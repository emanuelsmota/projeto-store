const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function desenharProduto() {
  const resposta = await fetch(`http://localhost:3000/products/${id}`);
  const produto = await resposta.json();

  const classesCategoria = { 1: 'card-ataque', 2: 'card-defesa', 3: 'card-consumivel' };
  const classeCategoria = classesCategoria[produto.category.id];
  const siglaCategoria = produto.category.name.substring(0, 3).toUpperCase();

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
        <button>Comprar</button>
      </div>
    </div>
  `;
}

desenharProduto();
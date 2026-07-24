async function carregarProdutos() {
  const resposta = await fetch('http://localhost:3000/products');
  const produtos = await resposta.json();

  const divProdutos = document.getElementById('lista-produtos');

  produtos.forEach((produto) => {
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

carregarProdutos();
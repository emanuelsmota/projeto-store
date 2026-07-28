async function carregarCarrinho() {
    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        document.getElementById('itens-carrinho').innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('resumo-carrinho').innerHTML = '';
        return;
    }

    const resposta = await fetch('http://localhost:3000/products');
    const todosProdutos = await resposta.json();

    const itensCompletos = carrinho.map((itemCarrinho) => {
        const produto = todosProdutos.find((p) => p.id === itemCarrinho.produtoId);
        return {
            ...produto,
            quantidade: itemCarrinho.quantidade,
        };
    });

    renderizarCarrinho(itensCompletos);
}

function renderizarCarrinho(itens) {
    const divItens = document.getElementById('itens-carrinho');
    divItens.innerHTML = '';

    itens.forEach((item) => {
        divItens.innerHTML += `
  <div class="item-carrinho">
    <img src="${item.imageUrl}" alt="${item.name}">
    <div class="item-info">
      <h3>${item.name}</h3>
      <p>🪙 ${item.price} x ${item.quantidade}</p>
    </div>
    <div class="controles-quantidade">
      <button onclick="diminuir(${item.id})">-</button>
      <span>${item.quantidade}</span>
      <button onclick="aumentar(${item.id})">+</button>
    </div>
    <button onclick="removerItem(${item.id})">Remover</button>
  </div>
`;
    });

    const total = itens.reduce((soma, item) => soma + item.price * item.quantidade, 0);
    document.getElementById('resumo-carrinho').innerHTML = `
    <p class="total-carrinho">Total: 🪙 ${total}</p>
    <button id="btn-finalizar">Finalizar Compra</button>
  `;

    document.getElementById('btn-finalizar').addEventListener('click', async () => {
        const carrinho = obterCarrinho();

        try {
            const resposta = await fetch('http://localhost:3000/products/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carrinho),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.message);
                return;
            }

            alert('Compra realizada com sucesso! Obrigado por escolher a Guilda dos Mercadores.');
            limparCarrinho();
            carregarCarrinho();
        } catch (erro) {
            alert('Erro ao processar a compra. Tente novamente.');
        }
    });
}

function removerItem(produtoId) {
    removerDoCarrinho(produtoId);
    carregarCarrinho();
}

carregarCarrinho();

function diminuirQuantidade(produtoId) {
    let carrinho = obterCarrinho();
    const item = carrinho.find((item) => item.produtoId === produtoId);

    if (!item) {
        return;
    }

    item.quantidade -= 1;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter((item) => item.produtoId !== produtoId);
    }

    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
}

function diminuir(produtoId) {
    diminuirQuantidade(produtoId);
    carregarCarrinho();
}

function aumentar(produtoId) {
    adicionarAoCarrinho(produtoId);
    carregarCarrinho();
}
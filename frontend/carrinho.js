function obterCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (!carrinhoSalvo) {
    return [];
  }
  return JSON.parse(carrinhoSalvo);
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produtoId) {
  const carrinho = obterCarrinho();
  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ produtoId: produtoId, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();
}

function removerDoCarrinho(produtoId) {
  let carrinho = obterCarrinho();
  carrinho = carrinho.filter((item) => item.produtoId !== produtoId);
  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const carrinho = obterCarrinho();
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  const contador = document.getElementById('contador-carrinho');
  if (contador) {
    contador.textContent = totalItens;
  }
}

atualizarContadorCarrinho();

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  atualizarContadorCarrinho();
}
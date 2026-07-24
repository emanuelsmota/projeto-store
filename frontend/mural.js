const form = document.getElementById('form-produto');

form.addEventListener('submit', async function (evento) {
    evento.preventDefault();

    const novoProduto = {
        name: document.getElementById('input-name').value,
        price: +document.getElementById('input-price').value,
        description: document.getElementById('input-description').value,
        stock: +document.getElementById('input-stock').value,
        imageUrl: document.getElementById('input-imageUrl').value,
    };


    if (!novoProduto.name || !novoProduto.description) {
        alert('Nome e descrição são obrigatórios!');
        return;
    }

    if (isNaN(novoProduto.price) || isNaN(novoProduto.stock)) {
        alert('Preço e estoque precisam ser números válidos!');
        return;
    }

    await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
    });

    alert('Produto cadastrado com sucesso!');
});
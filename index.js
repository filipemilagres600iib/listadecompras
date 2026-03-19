const inputItem = document.getElementById('input-item');
const inputQuantidade = document.getElementById('input-item-quantidade');

const listaDeCompras = document.getElementById('lista-de-compras');

const botaoAdicionar = document.getElementById('adicionar-item');

let contador = 0;

inputItem.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        botaoAdicionar.click();
        inputItem.value = '';
    }
});

inputQuantidade.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        botaoAdicionar.click();
        inputQuantidade.value = '';
    }
});

botaoAdicionar.addEventListener('click', (evento) => {
    evento.preventDefault();

    if (inputItem.value === '' || inputQuantidade.value === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const itemDaLista = document.createElement('li');

    const containerItemDaLista = document.createElement('div');
    containerItemDaLista.classList.add('lista-item-container');

    const nomeDoItem = document.createElement('p');
    const quantidadeDoItem = document.createElement('p');
    nomeDoItem.textContent = `${inputItem.value} (qtd: ${inputQuantidade.value})`;

    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('button-delete');

    const img = document.createElement('img');
    img.src = 'icon-trash.svg';
    img.alt = 'Remover item';
    botaoRemover.appendChild(img);

    botaoRemover.addEventListener('click', function() {
        itemDaLista.remove();
        atualizarMensagemListaVazia();
    });

    const textoContainer = document.createElement('div');

    textoContainer.appendChild(nomeDoItem);
    textoContainer.appendChild(quantidadeDoItem);

    containerItemDaLista.appendChild(textoContainer);
    containerItemDaLista.appendChild(botaoRemover);

    itemDaLista.appendChild(containerItemDaLista);

    const dataCompleta = document.createElement('p');
    dataCompleta.classList.add('texto-data');

    const diaDaSemana = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long'
    });

    const data = new Date().toLocaleDateString('pt-BR');

    const hora = new Date().toLocaleTimeString('pt-BR', {
        hour: 'numeric', minute: 'numeric'
    });

    dataCompleta.textContent = `${diaDaSemana[0].toUpperCase() + diaDaSemana.slice(1)} (${data}), às ${hora}.`;

    itemDaLista.appendChild(dataCompleta);
    listaDeCompras.appendChild(itemDaLista);

    inputItem.value = '';
    inputQuantidade.value = '';

    atualizarMensagemListaVazia();
});

function atualizarMensagemListaVazia() {
    const mensagemListaVazia = document.querySelector('.mensagem-lista-vazia');
    if (listaDeCompras.children.length > 0) {
        mensagemListaVazia.style.display = 'none';
    } else {
        mensagemListaVazia.style.display = 'block';
    }
}

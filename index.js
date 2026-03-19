const inputItem = document.getElementById('input-item'); 
const inputQuantidade = document.getElementById('input-item-quantidade');
const listaDeCompras = document.getElementById('lista-de-compras');
const botaoAdicionar = document.getElementById('adicionar-item');
//recuperando elementos usando o id.

let contador = 0;
//contador que cria um id único pra cada item da lista.

inputItem.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        botaoAdicionar.click();
    }
});
inputQuantidade.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        botaoAdicionar.click();
    }
});
//addEventListeners pra clicar Enter e salvar o item.


//addEventListener pro botão de adicionar item à lista.
botaoAdicionar.addEventListener('click', () => {

    if (inputItem.value === '' || inputQuantidade.value === '') {//verificando se os inputs estão vazios.
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const itemDaLista = document.createElement('li');
    const containerItemDaLista = document.createElement('div');
    containerItemDaLista.classList.add('lista-item-container');
    const nomeDoItem = document.createElement('p');
    const quantidadeDoItem = document.createElement('p');
    nomeDoItem.textContent = `${inputItem.value} (qtd: ${inputQuantidade.value})`;
    //cria os elementos necessários para adicionar o item à lista (<li>, <div>, <p>), adiciona as devidas classes para estilização e põe o nome e quantidade do item como o valor do input.

    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('button-delete');
    const img = document.createElement('img');
    img.src = 'icon-trash.svg';
    img.alt = 'Remover item';
    //cria o botão de remover item, põe a classe para estilização e cria a imagem do lixo.
    
    botaoRemover.appendChild(img);//adiciona a imagem de lixo ao botão de remover item.

    botaoRemover.addEventListener('click', function() {
        itemDaLista.remove();
        atualizarMensagemListaVazia();
        localStorage.setItem('listaDeCompras', listaDeCompras.innerHTML);
    });
    //função de click pro botão de remover item, que remove o elemento itemDaLista, atualiza a mensagem de lista vazia e salva a lista atualizada no localStorage.

    const textoContainer = document.createElement('div');
    //cria a <div> onde vão estar o nome e a quantidade do item, pra organizar melhor o layout.

    textoContainer.appendChild(nomeDoItem);
    textoContainer.appendChild(quantidadeDoItem);
    //põe o nome e a quantidade do item dentro da <div>.

    containerItemDaLista.appendChild(textoContainer);
    containerItemDaLista.appendChild(botaoRemover);
    //põe a <div> texto container com os elementos de texto e o botão de remover dentro da <div> containerItemDaLista, que é a <div> que vai organizar o layout do item da lista.

    itemDaLista.appendChild(containerItemDaLista);
    //põe a <div> containerItemDaLista dentro do itemDaLista, que é o <li> que vai ser adicionado à lista de compras.

    const dataCompleta = document.createElement('p');//cria o <p> onde vai ficar escrita a data e hora em que o item foi adicionado à lista.
    dataCompleta.classList.add('texto-data');//adiciona a classe para estilização.
    const diaDaSemana = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long'
    });
    const data = new Date().toLocaleDateString('pt-BR');//newDate configurado pra pegar a data, NO BRASIL, em que o item foi adicionado à lista.
    const hora = new Date().toLocaleTimeString('pt-BR', {//mesma coisa, só que com a hora e minuto.
        hour: 'numeric', minute: 'numeric'
    });
    dataCompleta.textContent = `${diaDaSemana[0].toUpperCase() + diaDaSemana.slice(1)} (${data}), às ${hora}.`;
    //escreve no <p> dataCompleta a data e hora em que o item foi adicionado à lista, com a formatação "Dia da semana (data), às hora:minuto".

    itemDaLista.appendChild(dataCompleta);//coloca o <p> dataCompleta dentro de itemDaLista.
    listaDeCompras.appendChild(itemDaLista);//coloca o <li> itemDaLista dentro da lista de compras (<ul>).

    inputItem.value = '';
    inputQuantidade.value = '';
    //limpa os inputs depois de adicionar o item à lista.

    localStorage.setItem('listaDeCompras', listaDeCompras.innerHTML);
    //salva tudo no localStorage, usando o innerHTML da lista de compras pra salvar a estrutura completa da lista.

    atualizarMensagemListaVazia();
    ativarBotoesRemover();
    //chama as duas funções que atualizam a tela toda vez que um item é adicionado à lista.
});

//função que atualiza a mensagem de lista vazia. se não tiver itens, mostra a mensagem, se tiver, apaga.
function atualizarMensagemListaVazia() {
    const mensagemListaVazia = document.querySelector('.mensagem-lista-vazia');
    if (listaDeCompras.children.length > 0) {
        mensagemListaVazia.style.display = 'none';
    } else {
        mensagemListaVazia.style.display = 'block';
    }
}

//addEventListener que carrega a lista salva no localStorage quando a página é carregada, atualiza a mensagem de lista vazia e ativa os botões de remover item.
window.addEventListener('load', () => {
    const listaSalva = localStorage.getItem('listaDeCompras');
    if (listaSalva) {
        listaDeCompras.innerHTML = listaSalva;
    }
    atualizarMensagemListaVazia();
    ativarBotoesRemover();
});

/*função que ativa os botões de remover item, adicionando a função de click pra cada um deles. precisa ser chamada toda vez que um item é adicionado à lista porque,
como eu tô usando o innerHTML pra salvar a lista no localStorage, os eventListeners são perdidos.*/
function ativarBotoesRemover() {
    const botoes = document.querySelectorAll('.button-delete');
    botoes.forEach((botao) => {
        botao.onclick = function () {
            botao.closest('li').remove();
            atualizarMensagemListaVazia();
            localStorage.setItem('lista', listaDeCompras.innerHTML);
            localStorage.setItem('listaDeCompras', listaDeCompras.innerHTML);
        };
    });
}
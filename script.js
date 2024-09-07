// Função para adicionar um novo contato
function adicionarContato() {
  const novoNome = document.getElementById('novoNome').value.trim();
  const novoTelefone = document.getElementById('novoTelefone').value.trim();

  // Verificar se os campos estão vazios
  if (!novoNome || !novoTelefone) {
    alert('Os campos Nome e Telefone são obrigatórios!');
    return;
  }

  // Verificar se o contato já existe (baseado no nome ou telefone)
  const contatoExistente = contatos.find(contato =>
    contato.nome.toLowerCase() === novoNome.toLowerCase() ||
    contato.telefone === novoTelefone
  );

  if (contatoExistente) {
    alert('Este contato já foi adicionado!');
    return;
  }

  const novoContato = { nome: novoNome, telefone: novoTelefone };
  contatos.push(novoContato);

  renderizarTabela(contatos);

  // Limpar campos após adicionar
  document.getElementById('novoNome').value = '';
  document.getElementById('novoTelefone').value = '';
}

// Função para renderizar a tabela de contatos
function renderizarTabela(listaContatos) {
  const tabelaBody = document.querySelector('tbody');
  tabelaBody.innerHTML = '';

  listaContatos.forEach((contato, index) => {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.telefone}</td>
      <td>
      <button class="btn editar" onclick="editarContato(${index})">Editar</button>
      <button class="btn excluir" onclick="excluirContato(${index})">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(novaLinha);
  });
}


// Função para pesquisar um contato por nome ou telefone
function pesquisarContato() {
  const termoPesquisa = document.getElementById('pesquisa').value.trim().toLowerCase();

  if (!termoPesquisa) {
    alert('Digite um termo para pesquisar!');
    return;
  }

  const resultados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(termoPesquisa) ||
    contato.telefone.includes(termoPesquisa)
  );

  if (resultados.length === 0) {
    alert('Nenhum contato encontrado.');
  }

  renderizarTabela(resultados);
}

// Função para listar todos os contatos
function listarTodos() {
  document.getElementById('pesquisa').value = '';
  renderizarTabela(contatos);
}

// Função para excluir um contato
function excluirContato(index) {
  contatos.splice(index, 1);
  renderizarTabela(contatos);
}

// Função para editar um contato (Exemplo simples)
function editarContato(index) {
  const novoNome = prompt('Digite o novo nome:', contatos[index].nome);
  const novoTelefone = prompt('Digite o novo telefone:', contatos[index].telefone);

  if (novoNome && novoTelefone) {
    contatos[index].nome = novoNome;
    contatos[index].telefone = novoTelefone;
    renderizarTabela(contatos);
  }
}

// Função para aplicar máscara ao telefone
function mascaraTelefone(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

  if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita o valor a 11 dígitos
  }

  // Formata o telefone conforme os dígitos são inseridos
  if (valor.length > 6) {
    input.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    input.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
  } else {
    input.value = valor;
  }
}

// Renderizar a tabela inicialmente com todos os contatos
renderizarTabela(contatos);

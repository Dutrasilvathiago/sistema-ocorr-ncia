async function cadastrarAluno() {
  const nome = document.getElementById('nome').value;
  const cgm = document.getElementById('cgm').value;
  const rua = document.getElementById('ed1').value;
  const bairro = document.getElementById('ed2').value;  
  const num = document.getElementById('ed3').value;  

  await fetch('/cadastrar-aluno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cgm, rua, bairro, num })
  });

  alert('Aluno cadastrado com sucesso!');
};

async function consultarAlunos() {
    const nome = document.getElementById('nome').value;
    const cgm = document.getElementById('cgm').value;
    const rua= document.getElementById('ed1').value;
    const bairro = document.getElementById('ed2').value;
    const numero = document.getElementById('ed3').value;

    const queryParams = new URLSearchParams();
    if (nome) queryParams.append('nome', nome);
    if (cgm) queryParams.append('cgm', cgm);
    if (rua) queryParams.append('rua', rua);
    if (bairro) queryParams.append('bairro', bairro);
    if (numero) queryParams.append('numero', numero);

    // Faz a requisição para a rota de consulta
    const response = await fetch(`/consultar-alunos?${queryParams.toString()}`);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
        console.error('Erro ao consultar alunos:', response.statusText);
        return;
    }

    const aluno = await response.json();
    console.log('Alunos retornados:', aluno); // Adiciona log para verificar dados retornados
    const tabelaResultados = document.getElementById('resultadoConsulta');
    const tbody = tabelaResultados.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar resultados

    if (aluno.length > 0) {
        tabelaResultados.style.display = 'table';
        aluno.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.cgm}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.endereco_r}</td>
                <td>${aluno.endereco_b}</td>
                <td>${aluno.endereco_n}</td>
            `;
            tbody.appendChild(row);
        });
      alert("ok");
    } else {
        tabelaResultados.style.display = 'none';
        alert('Nenhum aluno encontrado com os critérios informados.');
    }
}

//
//consulter resposavel
//
async function consultarResponsavel() {
    const nome_resp = document.getElementById('nome_resp').value;
    const cgm_al = document.getElementById('buscaAluno').value;
    const rua_resp= document.getElementById('ed1_resp').value;
    const bairro_resp = document.getElementById('ed2_resp').value;
    const numero_resp = document.getElementById('ed3_resp').value;

    const queryParams = new URLSearchParams();
    if (nome_resp) queryParams.append('nome_resp', nome_resp);
    if (cgm_al) queryParams.append('buscaAluno', cgm_al);
    if (rua_resp) queryParams.append('rua_resp', rua_resp);
    if (bairro_resp) queryParams.append('bairro_resp', bairro_resp);
    if (numero_resp) queryParams.append('numero_resp', numero_resp);

    // Faz a requisição para a rota de consulta
    const response = await fetch(`/consultar-responsavel?${queryParams.toString()}`);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
        console.error('Erro ao consultar responsavel:', response.statusText);
        return;
    }

    const resp = await response.json();
    console.log('responsaveis retornados:', resp); // Adiciona log para verificar dados retornados
    const tabelaResultados = document.getElementById('resultadoConsulta');
    const tbody = tabelaResultados.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar resultados

    if (resp.length > 0) {
        tabelaResultados.style.display = 'table';
        resp.forEach(resp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${resp.cgm_al}</td>
                <td>${resp.nome_resp}</td>
                <td>${resp.rua_resp}</td>
                <td>${resp.bairro_resp}</td>
                <td>${resp.numero_resp}</td>
            `;
            tbody.appendChild(row);
        });
      alert("ok");
    } else {
        tabelaResultados.style.display = 'none';
        alert('Nenhum responsavel encontrado com os critérios informados.');
    }
}
//
//
//

//
//consultar ocorrencia
//
async function consultarOcorrencia(){
    const cgm_a = document.getElementById('buscaAluno').value;
    const profSelecionado = document.getElementById('buscaprof').value;
    const turma = document.getElementById('turma').value;
    const ocorrencia = document.getElementById('ocor').value;

    const queryParams = new URLSearchParams();
    if (cgm_a) queryParams.append('buscaAluno', cgm_a);
    if (profSelecionado) queryParams.append('buscaprof', profSelecionado);
    if (turma) queryParams.append('turma', turma);
    if (ocorrencia) queryParams.append('ocor', ocor);
    
    // Faz a requisição para a rota de consulta
    const response = await fetch(`/consultar-ocorrencia?${queryParams.toString()}`);

    // Verifica se a resposta foi bem sucedida
    if (!response.ok) {
        console.error('Erro ao consultar ocorrencia:', response.statusText);
        return;
    }

    const ocor = await response.json();
    console.log('ocorrencia retornados:', ocor); // Adiciona log para verificar dados retornados

const tabelaResultados = document.getElementById('resultadoConsulta');
const tbody = tabelaResultados.querySelector('tbody');
tbody.innerHTML = ''; // Limpa a tabela antes de adicionar resultados
if (ocor.length > 0){
    tabelaResultados.style.display = 'table';
    ocor.forEach(ocor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ocor.cgm_aluno}</td>
            <td>${ocor.func_cpf}</td>
            <td>${ocor.turma}</td>
            <td>${ocor.ocorrencia}</td>
        `;
        tbody.appendChild(row);
    });
    alert("ok");
    } else {
        tabelaResultados.style.display = 'none';
        alert('Nenhuma ocorrencia encontrada com os critérios informados.');
    }
}
//
//
//

async function buscarProfessor() {
  const buscaprof = document.getElementById('buscaprof').value;

  // Se o campo de busca estiver vazio, não faz nada
  if (buscaprof === '') return;

  // Faz a busca no servidor
  const response = await fetch(`/buscar-professor?query=${buscaprof}`);

  // Verifica se a resposta foi bem-sucedida
  if (response.ok) {
      const professor = await response.json();

      // Seleciona o dropdown de professor
      const profSelecionado = document.getElementById('profSelecionado');
      profSelecionado.innerHTML = '<option value="">Selecione um professor</option>';

      // Preenche o dropdown com os resultados da busca
      professor.forEach(professor => {
          const option = document.createElement('option');
          option.value = professor.cpf_prof;
          option.textContent = `${professor.nome_prof} (CPF: ${professor.cpf_prof})`;
          profSelecionado.appendChild(option);
      });

  } else {
      alert('Erro ao buscar professor. Tente novamente.');
  }
}






async function buscarAluno() {
  const buscaAluno = document.getElementById('buscaAluno').value;

  // Se o campo de busca estiver vazio, não faz nada
  if (buscaAluno === '') return;

  // Faz a busca no servidor
  const response = await fetch(`/buscar-aluno?query=${buscaAluno}`);

  // Verifica se a resposta foi bem-sucedida
  if (response.ok) {
      const alunos = await response.json();

      // Seleciona o dropdown de alunos
      const alunoSelecionado = document.getElementById('alunoSelecionado');
      alunoSelecionado.innerHTML = '<option value="">Selecione um aluno</option>';

      // Preenche o dropdown com os resultados da busca
      alunos.forEach(aluno => {
          const option = document.createElement('option');
          option.value = aluno.cgm;
          option.textContent = `${aluno.nome} (CGM: ${aluno.cgm})`;
          alunoSelecionado.appendChild(option);
      });

  } else {
      alert('Erro ao buscar alunos. Tente novamente.');
  }
}




async function cadastroprof(){
    const nome_prof = document.getElementById('prof').value;
    const cpf_prof = document.getElementById('cpf').value;
    const rua_prof = document.getElementById('prof_ed1').value;
    const bairro_prof = document.getElementById('prof_ed2').value;
    const num_prof = document.getElementById('prof_ed3').value;

await fetch('/cadastro-prof', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_prof, cpf_prof, rua_prof, bairro_prof, num_prof})
});

  alert('Funcionario cadastrado com sucesso!');
};

async function cadastroOcorrencia(){
    const nome_aluno = document.getElementById('buscaAluno').value;
    const nome_professor = document.getElementById('profSelecionado').value;
    const turma = document.getElementById('turma').value;
    const ocorrencia = document.getElementById('ocor').value;

await fetch('/cadastro-ocorrencia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_aluno, nome_professor, turma, ocorrencia})
});

  alert('ocorrencia cadastrada com sucesso!');
};

async function cadastroResponsavel(){
    const nome_resp = document.getElementById('nome_resp').value;
    const cgm_al = document.getElementById('buscaAluno').value;
    const rua_resp = document.getElementById('ed1_resp').value;
    const bairro_resp = document.getElementById('ed2_resp').value;
    const numero_resp = document.getElementById('ed3_resp').value;

await fetch('/cadastro-responsavel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_resp, cgm_al, rua_resp, bairro_resp, numero_resp})
});

  alert('responsavel cadastrado com sucesso!');
};
function cadastro(){
    const nome = document.getElementById('nome').value;
    const cgm = document.getElementById('cgm').value;
    const email = document.getElementById('em').value;
    const password = document.getElementById('senha').value;
    alert(nome);
    alert(email);
    alert(cgm);
    alert(password);
}

function cadastro_ocorrencia(){
    const nome_aluno = document.getElementById('al').value;
    const nome_prof = document.getElementById('nome-professor').value;
    const ocorre = document.getElementById('ocor').value;
    const turma = document.getElementById('turma').value;
    alert(nome_aluno);
    alert(nome_prof);
    alert(ocorre);
    alert(turma);
}

function cadastro_prof(){
    const nome_p = document.getElementById('prof').value;
    const cpf = document.getElementById('cpf').value;
    const email_prof = document.getElementById('em_prof').value;
    const senha_prof = document.getElementById('sen').value;
    alert(nome_p);
    alert(cpf);
    alert(email_prof);
    alert(senha_prof);
}

function cadastro_responsavel(){
    const nome_res = document.getElementById('nome_resp').value;
    const cpf_res = document.getElementById('cpf_resp').value;
    const num_resp= document.getElementById('num_resp').value;
    const cgm_aluno= document.getElementById('cgm_aluno').value;
    const rua = document.getElementById('rua').value;
    const bairro= document.getElementById('bairro').value;
    const uf= document.getElementById('uf').value;
    alert(nome_res);
    alert(cpf_res);
    alert(num_resp);
    alert(cgm_aluno);
    alert(rua);
    alert(bairro);
    alert(uf);

}
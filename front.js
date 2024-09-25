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
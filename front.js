function cadastro(){
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('em').value;
    const cgm = document.getElementById('cgm').value;
    const password = document.getElementById('senha').value;
    
    document.getElementById('omen').innerText=nome;
    document.getElementById('mgc').innerText=cgm;
    document.getElementById('liame').innerHTML= email;
    document.getElementById('ahnes').innerText= password;
    
}
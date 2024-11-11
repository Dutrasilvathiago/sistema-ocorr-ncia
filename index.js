const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;


// Serve os arquivos estáticos (HTML, CSS, JS) da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('ocorrencia.db');

// Criar as tabelas se não existirem
db.serialize(() => {
    // Criar a tabela alunos
    db.run(`
        CREATE TABLE IF NOT EXISTS aluno(
	        id integer PRIMARY KEY AUTOINCREMENT,
            nome varchar(100) not NULL,
            cgm varchar(20) unique NOT NULL,
            endereco_b text NOT NULL,
            endereco_r text NOT NULL,
            endereco_n text NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela alunos:', err);
        } else {
            console.log('Tabela alunos criada com sucesso (ou já existe).');
        }
    });

    // Criar a tabela funcionario
    db.run(`
        CREATE TABLE IF NOT EXISTS funcionario(
            id integer PRIMARY KEY AUTOINCREMENT,
            nome_prof varchar(100) NOT NULL,
            cpf_prof varchar(11) UNIQUE NOT NULL,
            rua_prof text NOT NULL,       
            bairro_prof text NOT NULL,
            num_prof text NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela funcionario:', err);
        } else {
            console.log('Tabela funcionario criada com sucesso (ou já existe).');
        }
    });
});

    //criar a tabela ocorrencia
    db.run(`
        CREATE TABLE IF NOT EXISTS ocorrencia(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cgm_aluno VARCHAR(20) UNIQUE NOT NULL,
            func_cpf VARCHAR(20) UNIQUE NOT NULL,
            turma TEXT NOT NULL,
            ocorrencia VARCHAR(200), 
            FOREIGN KEY (cgm_aluno) REFERENCES aluno(cgm),
            FOREIGN KEY (func_cpf) REFERENCES funcionario(cpf_prof)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela ocorrencia:', err);
            } else {
                console.log('Tabela ocorrencia criada com sucesso (ou já existe).');
            }
        });

    //cria tabela responsavel
    db.run(`
        CREATE TABLE IF NOT EXISTS responsavel(
          id_resp INTEGER PRIMARY KEY AUTOINCREMENT,
          nome_resp VARCHAR(40) NOT NULL,
          cgm_al VARCHAR(20) UNIQUE not NULL,
          rua_resp TEXT NOT NULL,
          bairro_resp TEXT NOT NULL,
          numero_resp TEXT NOT NULL,
          FOREIGN KEY (cgm_al) REFERENCES aluno(cgm)
          )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela responsavel:', err);
            } else {
                console.log('Tabela responsavel criada com sucesso (ou já existe).');
            }
        });

// Rota para cadastrar um aluno
app.post('/cadastrar-aluno', (req, res) => {
    const { nome, cgm, rua, bairro, num } = req.body;  
    db.run("INSERT INTO aluno (nome, cgm, endereco_r, endereco_b, endereco_n) VALUES (?, ?, ?, ?, ?)", [nome, cgm, rua, bairro, num], function(err) {
        if (err) {
            console.error('Erro ao cadastrar aluno:', err);
            res.status(500).send('Erro ao cadastrar aluno');
        } else {
            res.send('Aluno cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar um funcionario
app.post('/cadastro-prof', (req, res) => {
    const { nome_prof, cpf_prof, rua_prof, bairro_prof, num_prof } = req.body;
    db.run("INSERT INTO funcionario (nome_prof, cpf_prof, rua_prof, bairro_prof, num_prof) VALUES (?, ?, ?, ?, ?)", [nome_prof, cpf_prof, rua_prof, bairro_prof, num_prof], function(err) {
        if (err) {
            console.error('Erro ao cadastrar funcionario:', err);
            res.status(500).send('Erro ao cadastrar funcionario');
        } else {
            res.send('funcionario cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar uma ocorrencia
app.post('/cadastro-ocorrencia', (req, res) => {
    const { nome_aluno, nome_professor, turma, ocorrencia } = req.body;
    db.run("INSERT INTO ocorrencia ( cgm_aluno, func_cpf, turma ,ocorrencia) VALUES (?, ?, ?, ?)", [ nome_aluno, nome_professor, turma, ocorrencia], function(err) {
        if (err) {
            console.error('Erro ao cadastrar ocorrencia:', err);
            res.status(500).send('Erro ao cadastrar ocorrencia');
        } else {
            res.send('ocorrencia cadastrada com sucesso!');
        }
    });
});

// Rota para cadastrar um responsavel
app.post('/cadastro-responsavel', (req, res) => {
    const { nome_resp, cgm_al, rua_resp, bairro_resp, numero_resp } = req.body;
    db.run("INSERT INTO responsavel ( nome_resp,  cgm_al, rua_resp, bairro_resp, numero_resp) VALUES (?, ?, ?, ?, ?)", [ nome_resp, cgm_al, rua_resp, bairro_resp, numero_resp], function(err) {
        if (err) {
            console.error('Erro ao cadastrar responsavel:', err);
            res.status(500).send('Erro ao cadastrar responsavel');
        } else {
            res.send('responsavel cadastrado com sucesso!');
        }
    });
});
// Rota para buscar alunos (autocomplete no front-end)
app.get('/buscar-aluno', (req, res) => {
    const query = req.query.query;

    // Busca no banco de dados com base no CGM ou Nome
    db.all("SELECT cgm, nome FROM aluno WHERE cgm LIKE ? OR nome LIKE ?", [`%${query}%`, `%${query}%`], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar alunos:', err);
            res.status(500).send('Erro ao buscar alunos');
        } else {
            res.json(rows);  // Retorna os alunos encontrados
        }
    });
});

// Rota para buscar alunos (autocomplete no front-end)
app.get('/buscar-professor', (req, res) => {
    const query = req.query.query;

    // Busca no banco de dados com base no CGM ou Nome
    db.all("SELECT cpf_prof, nome_prof FROM funcionario WHERE cpf_prof LIKE ? OR nome_prof LIKE ?", [`%${query}%`, `%${query}%`], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar professor:', err);
            res.status(500).send('Erro ao buscar professor');
        } else {
            res.json(rows);  // Retorna os professor encontrados
        }
    });
});






// Teste para ver se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor no Replit está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});





app.get('/consultar-alunos', (req, res) => {
    const { nome, cgm, rua, bairro, numero } = req.query;

    let sql = "SELECT cgm, nome, endereco_r, endereco_b, endereco_n FROM aluno WHERE 1=1"; // 1=1 para facilitar a construção da query
    let params = [];

    if (nome) {
        sql += " AND nome LIKE ?";
        params.push(`%${nome}%`); // Adiciona o parâmetro da busca
    }

    if (cgm) {
        sql += " AND cgm LIKE ?";
        params.push(`%${cgm}%`); // Adiciona o parâmetro da busca
    }

    if (rua) {
        sql += " AND endereco_r LIKE ?";
        params.push(`%${rua}%`); // Adiciona o parâmetro da busca
    }

    if (bairro) {
        sql += " AND endereco_b LIKE ?";
        params.push(`%${bairro}%`); // Adiciona o parâmetro da busca
    }

    if (numero) {
        sql += " AND endereco_n LIKE ?";
        params.push(`%${numero}%`); // Adiciona o parâmetro da busca
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Erro ao consultar alunos:', err);
            return res.status(500).send('Erro ao consultar alunos.');
        }
        res.json(rows); // Retorna os alunos encontrados
    });
});

///////////////
app.get('/consultar-responsavel', (req, res) => {
    const { nome_resp, cgm_al, rua_resp, bairro_resp, numero_resp } = req.query;

    let sql = "SELECT cgm_al, nome_resp, rua_resp, bairro_resp, numero_resp FROM responsavel WHERE 1=1"; // 1=1 para facilitar a construção da query
    let params = [];

    if (nome_resp) {
        sql += " AND nome_resp LIKE ?";
        params.push(`%${nome_resp}%`); // Adiciona o parâmetro da busca
    }

    if (cgm_al) {
        sql += " AND cgm_al LIKE ?";
        params.push(`%${cgm_al}%`); // Adiciona o parâmetro da busca
    }

    if (rua_resp) {
        sql += " AND rua_resp LIKE ?";
        params.push(`%${rua_resp}%`); // Adiciona o parâmetro da busca
    }

    if (bairro_resp) {
        sql += " AND bairro_resp LIKE ?";
        params.push(`%${bairro_resp}%`); // Adiciona o parâmetro da busca
    }

    if (numero_resp) {
        sql += " AND numero_resp LIKE ?";
        params.push(`%${numero_resp}%`); // Adiciona o parâmetro da busca
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Erro ao consultar alunos:', err);
            return res.status(500).send('Erro ao consultar alunos.');
        }
        res.json(rows); // Retorna os alunos encontrados
    });
});
///////////

app.get('/consultar-ocorrencia', (req, res) => {
    const { cgm_a, prof_selecionado, turma, ocorrencia } = req.query;

    let sql = "SELECT cgm_aluno, func_cpf, turma, ocorrencia FROM ocorrencia WHERE 1=1"; // 1=1 para facilitar a construção da query
    let params = [];

    if (cgm_a) {
        sql += " AND cgm_aluno LIKE ?";
        params.push(`%${cgm_a}%`); // Adiciona o parâmetro da busca
    }

    if (prof_selecionado) {
        sql += " AND func_cpf LIKE ?";
        params.push(`%${prof_selecionado}%`); // Adiciona o parâmetro da busca
    }

    if (turma) {
        sql += " AND turma LIKE ?";
        params.push(`%${turma}%`); // Adiciona o parâmetro da busca
    }

    if (ocorrencia) {
        sql += " AND ocorrencia LIKE ?";
        params.push(`%${ocorrencia}%`); // Adiciona o parâmetro da busca
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Erro ao consultar alunos:', err);
            return res.status(500).send('Erro ao consultar alunos.');
        }
        res.json(rows); // Retorna os alunos encontrados
    });
});
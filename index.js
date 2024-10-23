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
            nome varchar(100) NOT NULL,
            cpf varchar(11) UNIQUE NOT NULL,
            endereco_b text NOT NULL,
            endereco_r text NOT NULL,
            endereco_n text NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela notas:', err);
        } else {
            console.log('Tabela notas criada com sucesso (ou já existe).');
        }
    });
});

    //criar a tabela ocorrencia
    db.run(`
        CREATE TABLE IF NOT EXISTS ocorencia(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cmg_aluno VARCHAR(20) UNIQUE NOT NULL,
            func_cpf VARCHAR(20) UNIQUE NOT NULL,
            ocorrencia VARCHAR(200),
            ocor_data TEXT, 
            FOREIGN KEY (cmg_aluno) REFERENCES aluno(cmg)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela notas:', err);
            } else {
                console.log('Tabela notas criada com sucesso (ou já existe).');
            }
        });
    });

    //cria tabela responsavel
    db.run(`
        CREATE TABLE IF NOT EXISTS renponsavel(
          id_resp INTEGER PRIMARY KEY AUTOINCREMENT,
          nome VARCHAR(40) NOT NULL,
          telefone TEXT NOT NULL,
          cgm_al VARCHAR(20) UNIQUE not NULL,
          FOREIGN KEY (cgm_al) REFERENCES aluno(cgm)
            )
        `, (err) => {
            if (err) {
                console.error('Erro ao criar tabela notas:', err);
            } else {
                console.log('Tabela notas criada com sucesso (ou já existe).');
            }
        });
    });

// Rota para cadastrar um aluno
app.post('/cadastrar-aluno', (req, res) => {
    const { nome, cgm, endereco_b, endereco_r, endereco_n } = req.body;  
    db.run("INSERT INTO aluno (nome, cgm, endereco_b, endereco_r, endereco_n) VALUES (?, ?, ?)", [nome, cgm, endereco_b, endereco_r, endereco_n], function(err) {
        if (err) {
            console.error('Erro ao cadastrar aluno:', err);
            res.status(500).send('Erro ao cadastrar aluno');
        } else {
            res.send('Aluno cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar um funionario
app.post('/cadastrar-funcionario', (req, res) => {
    const { nome, cpf, endereco_b, endereco_r, endereco_n } = req.body;
    db.run("INSERT INTO funcionario (nome, cpf, endereco_b, endereco_r, endereco_n) VALUES (?, ?, ?)", [nome, cpf, endereco_b, endereco_r, endereco_n], function(err) {
        if (err) {
            console.error('Erro ao cadastrar funcionario:', err);
            res.status(500).send('Erro ao cadastrar funcionario');
        } else {
            res.send('funcionario cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar uma ocorrencia
app.post('/cadastrar-ocorrencia', (req, res) => {
    const { cgm_aluno, func_cpf, ocorrencia, ocor_data } = req.body;
    db.run("INSERT INTO ocorrencia ( cgm_aluno, func_cpf, ocorrencia, ocor_data) VALUES (?, ?, ?)", [ cgm_aluno, func_cpf, ocorrencia, ocor_data], function(err) {
        if (err) {
            console.error('Erro ao cadastrar ocorrencia:', err);
            res.status(500).send('Erro ao cadastrar ocorrencia');
        } else {
            res.send('ocorrencia cadastrada com sucesso!');
        }
    });
});

// Rota para cadastrar um responsavel
app.post('/cadastrar-responsavel', (req, res) => {
    const { nome, telefone, cgm_al } = req.body;
    db.run("INSERT INTO responsavel ( nome, telefone, cgm_al) VALUES (?, ?, ?)", [ nome, telefone, cgm_al], function(err) {
        if (err) {
            console.error('Erro ao cadastrar responsavel:', err);
            res.status(500).send('Erro ao cadastrar responsavel');
        } else {
            res.send('responsavel cadastrado com sucesso!');
        }
    });
}
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

app.get('/consultar-aluno', (req, res) => {
    const { nome, cgm, materia, notaMin, notaMax } = req.query;

    let sql = "SELECT alunos.cgm, alunos.nome, notas.disciplina AS materia, notas.nota FROM alunos LEFT JOIN notas ON alunos.cgm = notas.cgm_aluno WHERE 1=1"; // 1=1 para facilitar a construção da query
    let params = [];

    if (nome) {
        sql += " AND aluno.nome LIKE ?";
        params.push(`%${nome}%`); // Adiciona o parâmetro da busca
    }

    if (cgm) {
        sql += " AND aluno.cgm LIKE ?";
        params.push(`%${cgm}%`); // Adiciona o parâmetro da busca
    }

    if (materia) {
        sql += " AND notas.disciplina LIKE ?";
        params.push(`%${materia}%`); // Adiciona o parâmetro da busca
    }

    if (notaMin) {
        sql += " AND notas.nota >= ?";
        params.push(notaMin); // Adiciona o parâmetro da busca
    }

    if (notaMax) {
        sql += " AND notas.nota <= ?";
        params.push(notaMax); // Adiciona o parâmetro da busca
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Erro ao consultar alunos:', err);
            return res.status(500).send('Erro ao consultar alunos.');
        }
        res.json(rows); // Retorna os alunos encontrados
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


const low = require('lowdb')
const _ = require('lodash')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('./m2db.json'))

db.defaults({
    terms: [       
    ],
    configsIncrements: {
        terms: 0
    }
}).write()

/**
-------------------------------------------------
- DB -
-------------------------------------------------
**/
const db_mod = {
    //pegando o index para geração de ids em sequencia
    auto_increment: (table) => {
        //pegando o id para mandar para o registro
        let id = db.get('configsIncrements.' + table).value()

        // incrementando o id para o proximo registro pegar como valor unico
        db.set('configsIncrements.' + table, ++id).write()

        return id
    },
    //criando tabelas dado o nome da tabela
    createTable: (table) => {        
        if (!db.has(table).value()) {
            // criando a tabela de para serem inserido no futuro informações
            db.set(table, []).write()

            // criando propriedade para auto incremento especiffico dessa tabela
            db.set('configsIncrements.' + table, 0).write()
        }


    },
    //listando todas as tables para informação
    info: () => {
        console.log(db.getState())
    },
    //inserindo dados no banco dados table e json
    insert: (table, json) => {        

        //Criando table caso não exista
        if (!db.has(table).value()) {
            db_mod.createTable(table)
        }

        // adicionando o novo id automatico
        json.id = db_mod.auto_increment(table)
        
        //se já existe u id ele não adiciona        
        if (!_.isUndefined(db_mod.search(table, json))) return undefined;
        
        // inserindo no banco de dados
        db.get(table).push(json).write()
        
        return json.id
        
    },
    //atualiza todo o objeto dado a table, id e json que sera a nova versão do objeto
    update: (table, id, json) => {
        db.get(table).find({
            id: id
        }).assign(json).write()
    },
    //deleta item por id
    delete: (table, id) => {
        db.get(table).remove({
            'id': id
        }).write()
    },
    //busca por alguma coisa pelo id
    find: (table, id) => {
        return db.get(table).find({
            'id': id
        }).value()
    },
    //busca especifica por alguma coisa  {key: val}
    search: (table, json) => {
        return db.get(table).find(json).value()
    },
    all: (table) => {

        return { ...db.get(table).value()
        }
    }
}

module.exports = db_mod; 
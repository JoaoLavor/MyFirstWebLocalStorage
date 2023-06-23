class Gastos {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
           if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
           }

        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(g) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(g))

        localStorage.setItem('id', id)

    }
}

let bd = new Bd()

function cadastrarGastos() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let gastos = new Gastos(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (gastos.validarDados()) {
        bd.gravar(gastos)
        //dialog de sucesso
        $('#sucessoGravacao').modal('show')
    }else{
        //dialog de erro
        $('#erroGravacao').modal('show')
    }
}

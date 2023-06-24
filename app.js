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
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
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

    recuperarTodosRegistros() {
        //array de gastos

        let gastos = Array()

        let id = localStorage.getItem('id')

        //Recuperar todos os gastos cadastrados em localStorage
        for (let i = 1; i <= id; i++) {

            //Recuperar o gasto

            let gasto = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver índices que foram pulados ou removidos!
            //nestes casos nós vamos pular esses índices.

            if (gastos === null) {
                continue
            }

            gastos.push(gasto)

        }

        return gastos

    }

    pesquisar(gasto) {
        let filtrandoGastos = Array()

        filtrandoGastos = this.recuperarTodosRegistros()

        //ano
        if (gasto.ano != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.ano == gasto.ano)
        }

        //mes
        if (gasto.mes != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.mes == gasto.mes)
        }

        //dia
        if (gasto.dia != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.mes == gasto.dia)
        }

        //tipo
        if (gasto.tipo != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.tipo == gasto.tipo)
        }

        //descricao
        if (gasto.descricao != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.descricao == gasto.descricao)
        }

        //valor
        if (gasto.valor != '') {
            filtrandoGastos = filtrandoGastos.filter(g => g.valor == gasto.valor)
        }

        return filtrandoGastos
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
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Gasto foi cadastrado com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = "btn btn-success"
        //dialog de sucesso
        $('#modalRegistrarGastos').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = ' modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchido corretamente!'
        document.getElementById('modal_btn').innerHTML = 'Voltar para o cadastro'
        document.getElementById('modal_btn').className = "btn btn-danger"
        //dialog de erro
        $('#modalRegistrarGastos').modal('show')
    }
}

function carregaListaGastos(gastos = Array(), filtro = false) {

    if(gastos.length == 0 && filtro == false){
    gastos = bd.recuperarTodosRegistros()
}
    //selecionando o elemento tbody da tabela, no arquivo consultas.
    let listaGastos = document.getElementById('listaGastos')
    listaGastos.innerHTML = ''

    /*
     <tr>
       td>23/06/2023</td>
       <td>Alimentação</td>
       <td>Compras do mês</td>
       <td>900.00</td>
     </tr>
   */

    //percorrendo o Array gastos,listando cada gasto de forma dinâmica.
    gastos.forEach(function (g) {

        //criando as linhas (tr)
        let linha = listaGastos.insertRow()

        switch (g.mes) {
            case '1': g.mes = '01'
                break
            case '2': g.mes = '02'
                break
            case '3': g.mes = '03'
                break
            case '4': g.mes = '04'
                break
            case '5': g.mes = '05'
                break
            case '6': g.mes = '06'
                break
            case '7': g.mes = '07'
                break
            case '8': g.mes = '08'
                break
            case '9': g.mes = '09'
                break
        }
        //criando as colunas (td)
        linha.insertCell(0).innerHTML = `${g.dia}/${g.mes}/${g.ano}`

        //ajustando o tipo
        switch (g.tipo) {
            case '1': g.tipo = 'Alimentação'
                break
            case '2': g.tipo = 'Educação'
                break
            case '3': g.tipo = 'Lazer'
                break
            case '4': g.tipo = 'Saúde'
                break
            case '5': g.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = g.tipo
        linha.insertCell(2).innerHTML = g.descricao
        linha.insertCell(3).innerHTML = g.valor

    })
}

function pesquisarGastos() {

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let gasto = new Gastos(ano, mes, dia, tipo, descricao, valor)

    let gastos = bd.pesquisar(gasto)

    this.carregaListaGastos(gastos, true)
}
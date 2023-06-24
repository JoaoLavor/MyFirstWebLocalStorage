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
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de Gastos
		let gastos = Array()

		let id = localStorage.getItem('id')

		//recuperar todas os Gastos cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar o gasto
			let gasto = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if(gasto === null) {
				continue
			}
			gasto.id = i
			gastos.push(gasto)
		}

		return gastos
	}

	pesquisar(gasto){

		let gastosFiltradas = Array()
		gastosFiltradas = this.recuperarTodosRegistros()
		console.log(gastosFiltradas);
		console.log(gasto)

		//ano
		if(gasto.ano != ''){
			console.log("filtro de ano");
			gastosFiltradas = gastosFiltradas.filter(d => d.ano == gasto.ano)
		}
			
		//mes
		if(gasto.mes != ''){
			console.log("filtro de mes");
			gastosFiltradas = gastosFiltradas.filter(d => d.mes == gasto.mes)
		}

		//dia
		if(gasto.dia != ''){
			console.log("filtro de dia");
			gastosFiltradas = gastosFiltradas.filter(d => d.dia == gasto.dia)
		}

		//tipo
		if(gasto.tipo != ''){
			console.log("filtro de tipo");
			gastosFiltradas = gastosFiltradas.filter(d => d.tipo == gasto.tipo)
		}

		//descricao
		if(gasto.descricao != ''){
			console.log("filtro de descricao");
			gastosFiltradas = gastosFiltradas.filter(d => d.descricao == gasto.descricao)
		}

		//valor
		if(gasto.valor != ''){
			console.log("filtro de valor");
			gastosFiltradas = gastosFiltradas.filter(d => d.valor == gasto.valor)
		}

		
		return gastosFiltradas

	}

	remover(id){
		localStorage.removeItem(id)
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

	let gasto = new Gastos(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)


	if(gasto.validarDados()) {
		bd.gravar(gasto)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Gastos foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistrarGasto').modal('show') 

		ano.value = '' 
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistrarGasto').modal('show') 
	}
}

function carregaListaGastos(gastos = Array(), filtro = false) {

    if(gastos.length == 0 && filtro == false){
		gastos = bd.recuperarTodosRegistros() 
	}
	

	/*

	<tr>
		<td>15/03/2018</td>
		<td>Alimentação</td>
		<td>Compras do mês</td>
		<td>444.75</td>
	</tr>

	*/

	let listaGastos = document.getElementById("listaGastos")
    listaGastos.innerHTML = ''
	gastos.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaGastos.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

		//Ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
			
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_gasto_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_gasto_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(4).append(btn)
		console.log(d)
	})

 }

 
 function pesquisarGastos(){
	 
	let ano  = document.getElementById("ano").value
	let mes = document.getElementById("mes").value
	let dia = document.getElementById("dia").value
	let tipo = document.getElementById("tipo").value
	let descricao = document.getElementById("descricao").value
	let valor = document.getElementById("valor").value

	let gasto = new Gastos(ano, mes, dia, tipo, descricao, valor)

	let gastos = bd.pesquisar(gasto)
	 
	this.carregaListaGastos(gastos, true)

 }

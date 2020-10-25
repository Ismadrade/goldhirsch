<template>
  <div>
    <h1 class="mt-4">Lançamento</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Cadastro</li>
    </ol>
    <div class="container-fluid">
      <form @submit.prevent="cadastrar">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>ID:</label>
              <input type="text" class="form-control" disabled="true" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Descrição:</label>
              <input type="text" class="form-control" v-model="lancamento.descricao" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Mês:</label>
              <select class="form-control" v-model="lancamento.mes" >
                <option v-for="meses in calendario" v-bind:value="meses.value"  v-bind:key="meses.value">
                  {{ meses.mes}}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Ano:</label>
              <input type="text" class="form-control" v-model="lancamento.ano" minlength="4" maxlength="4" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Valor:</label>
              <input class="form-control" v-model.lazy="lancamento.valor" v-money="lancamento.money" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Tipo:</label>
              <select v-model="lancamento.tipo" class="form-control">
                <option disabled value="">Escolha um item</option>
                <option value="RECEITA">Receita</option>
                <option value="DESPESA">Despesa</option>
              </select>              
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <button type="submit" class="btn btn-success">
              <i class="fa fa-save"></i> Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {VMoney} from 'v-money'
export default {
  data(){ 
    const usuario = JSON.parse(localStorage.getItem("usuario"));       
    return{
      lancamento: {
        descricao: '',
        mes: '',
        ano: '',        
        usuario: usuario.id,
        valor: '0.00',
        money: {
          decimal: ',',
          thousands: '.',          
          precision: 2,
          masked: false
      },
        tipo: ''
      }
      
    }      
  },
  methods: {
    cadastrar(){ 
      let dotValor = this.lancamento.valor.replace(',', '.');
      this.lancamento.valor = dotValor;     
      this.$store.dispatch("inserirLancamento", this.lancamento)
        .then( () => {
          this.$toastr.s("Lançamento cadastrado com sucesso!");
          this.limparForm();          
        })
        .catch(err => {
          this.$toastr.e(err, "Ocorreu um erro:");
        })
    },
    limparForm() {
      this.lancamento.descricao = ''
      this.lancamento.mes = ''
      this.lancamento.ano = ''
      this.lancamento.valor = '0'
      this.lancamento.tipo = ''
    }
  },
  computed: {
    calendario(){
      return [
        {'mes': 'Janeiro', 'value': 1},
        {'mes': 'Fevereiro', 'value': 2},
        {'mes': 'Março', 'value': 3},
        {'mes': 'Abril', 'value': 4},
        {'mes': 'Maio', 'value': 5},
        {'mes': 'Junho', 'value': 6},
        {'mes': 'Julho', 'value': 7},
        {'mes': 'Agosto', 'value': 8},
        {'mes': 'Setembro', 'value': 9},
        {'mes': 'Outubro', 'value': 10},
        {'mes': 'Novembro', 'value': 11},
        {'mes': 'Dezembro', 'value': 12},
      ]
    }
  },
  directives: {money: VMoney}  
}

</script>

<style>

</style>
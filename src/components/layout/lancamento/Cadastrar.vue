<template>
  <div>
    <h1 class="mt-4">Lançamento</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Cadastro</li>
    </ol>
    <div class="p-fluid">
      <form @submit.prevent="cadastrar">
        <div class="row">
          <div class="col-sm-6">
            <div class="p-field">
              <label for="id">ID:</label>
              <InputText id="id" type="text"  placeholder="ID" disabled="true" />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-field">
              <label for="descricao">Descrição:</label>
              <InputText id="descricao" type="text" placeholder="Descrição"  v-model="lancamento.descricao" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="p-field">
              <label for="mes">Mês:</label>
              <Dropdown id="mes"  v-model="lancamento.mes" :options="calendario" optionLabel="mes" optionValue="code" placeholder="Selecione um mês" />                
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-field">
              <label for="ano">Ano:</label>
              <InputText id="ano" type="text" v-model="lancamento.ano" minlength="4" maxlength="4" placeholder="Ano" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="p-field">
              <label for="valor">Valor:</label>
              <InputNumber id="valor" mode="currency" currency="BRL" locale="pt-BR" placeholder="Valor"  v-model="lancamento.valor" />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="tipo">Tipo:</label>
              <Dropdown id="tipo" v-model="lancamento.tipo" :options = "tipo" optionLabel="descricao" optionValue="code" placeholder="Selecione o tipo" />                
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2">
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
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
export default {
  components:{
    InputNumber,
    InputText,
    Dropdown

  },
  data(){ 
    const usuario = JSON.parse(localStorage.getItem("usuario"));       
    return{
      lancamento: {
        descricao: '',
        mes: '',
        ano: '',        
        usuario: usuario.id,
        valor: 0,
        tipo: ''
      }
      
    }      
  },
  methods: {
    cadastrar(){  
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
      this.lancamento.valor = 0
      this.lancamento.tipo = ''
    }
  },
  computed: {
    calendario(){
      return [
        {'mes': 'Janeiro', code: 1},
        {'mes': 'Fevereiro', code: 2},
        {'mes': 'Março', code: 3},
        {'mes': 'Abril', code: 4},
        {'mes': 'Maio', code: 5},
        {'mes': 'Junho', code: 6},
        {'mes': 'Julho', code: 7},
        {'mes': 'Agosto', code: 8},
        {'mes': 'Setembro', code: 9},
        {'mes': 'Outubro', code: 10},
        {'mes': 'Novembro', code: 11},
        {'mes': 'Dezembro', code: 12},
      ]
    },
    tipo(){
      return[
        {'descricao': 'Receita', code: 'RECEITA'},
        {'descricao': 'Despesa', code: 'DESPESA'},
      ]
    }
  }
}

</script>

<style>
</style>
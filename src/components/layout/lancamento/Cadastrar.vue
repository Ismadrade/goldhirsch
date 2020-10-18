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
              <input type="text" class="form-control" v-model="lancamento.mes" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Ano:</label>
              <input type="text" class="form-control" v-model="lancamento.ano" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Valor:</label>
              <input type="text" class="form-control" v-model="lancamento.valor" />
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
const usuario = JSON.parse(localStorage.getItem("usuario")); 
export default {
  data(){       
    return{
      lancamento: {
        descricao: '',
        mes: '',
        ano: '',
        usuario: usuario.id,
        valor: '',
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
      this.lancamento.valor = ''
      this.lancamento.tipo = ''
    }
  }  
}

</script>

<style>

</style>
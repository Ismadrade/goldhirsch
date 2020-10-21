<template>
  <div>
    <h1 class="mt-4">Lançamento</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Consulta</li>
    </ol>

    <DataTable :value="cars">
      <Column field="descricao" header="Descrição"></Column>
      <Column field="dataCadastro" header="Data do Cadastro"></Column>
      <Column field="mes" header="Mês"></Column>
      <Column field="ano" header="Ano"></Column>
      <Column field="tipo" header="Tipo"></Column>
      <Column field="valor" header="Valor"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
//import ColumnGroup from 'primevue/columngroup';
const usuario = JSON.parse(localStorage.getItem("usuario"));
let data = [];  

export default {
  components:{
    DataTable,
    Column
  },
    
  data() {
    return {
        cars: null
    }
  },
   mounted() {
     this.$store.dispatch("buscarLancamentos", usuario.id)
      .then( (resp) => {
        console.log(resp);
          data = resp.data;  
          this.cars = data;                 
        })
        .catch(err => {
          this.$toastr.e(err, "Ocorreu um erro:");
        })
         
    }
}
</script>

<style>

</style>
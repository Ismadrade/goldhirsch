<template>
  <div>
    <h1 class="mt-4">Lançamento</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Consulta</li>
    </ol>
    <DataTable :value="lancamentos">
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

export default {
  components:{
    DataTable,
    Column
  },
   mounted() {
     const usuario = JSON.parse(localStorage.getItem("usuario"));
     this.$store.dispatch("buscarLancamentos", usuario.id)
                  
    },
    computed: {
      lancamentos() {
        let data = this.$store.state.lanc.lancamentos;
        return data
        }
    }
}
</script>
<style>
</style>
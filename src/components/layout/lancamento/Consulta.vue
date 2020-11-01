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
      <Column :exportable="false" header="Editar">
        <template #body="slotProps">
            <Button class="btn btn-warning" @click="editarLancamento(slotProps.data)" ><i class="fa fa-pencil"></i></Button>
        </template>
      </Column>
      <Column :exportable="false" header="Excluir">
        <template #body="slotProps">
            <Button class="btn btn-danger" @click="confirmexcluir(slotProps.data)" ><i class="fa fa-trash"></i></Button>
        </template>
      </Column>
    </DataTable>

    <Dialog  header="Confirm" :modal="true" :visible.sync="deletarLancamento" :closable="true" >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem;"> </i>
        <span>Are you sure you want to delete </span> 
      </div>
    <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text"  @click="deletarLancamento = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text"  @click="excluirLancamento()" />
    </template>
    </Dialog>

  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

export default {
  components:{
    DataTable,
    Column,
    Dialog,
    Button
  },
   mounted() {
     const usuario = JSON.parse(localStorage.getItem("usuario"));
     this.$store.dispatch("buscarLancamentos", usuario.id)     
    },
    data() {
        return {
          deletarLancamento: false,
          lancamento: null
      }
    },
    computed: {
      lancamentos() {
        let data = this.$store.state.lanc.lancamentos;
        return data
        }
    },
    methods: {
      editarLancamento(data){
        console.log(data);
      },
      confirmexcluir(data) {
          this.lancamento = data;
          return this.deletarLancamento = true;
        },
      excluirLancamento(){
        this.$store.dispatch("excluirLancamento", this.lancamento);
        this.deletarLancamento = false;
        this.$toastr.s("Lançamento deletado com sucesso!");
      }
    }
}
</script>
<style>
</style>
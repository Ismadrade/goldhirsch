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
      <Column field="valor" header="Valor">
        <template #body="slotProps">
            {{formatCurrency(slotProps.data.valor)}}
        </template>
      </Column>
      <Column :exportable="false" header="Editar">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-warning" @click="modalEditLancamento(slotProps.data)" />
        </template>
      </Column>
      <Column :exportable="false" header="Excluir">
        <template #body="slotProps">
            <Button icon="pi pi-trash" class="p-button-danger" @click="confirmexcluir(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog  header="Confirm" :modal="true" :visible.sync="deletarLancamento" :closable="true" :style="{width: '450px'}" >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-2" style="font-size: 2rem" />
        <span>Você realmente quer excluir este lançamento? </span> 
      </div>
    <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text"  @click="deletarLancamento = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text"  @click="excluirLancamento()" />
    </template>
    </Dialog>

    <!-- Modal Editar -->
    <Dialog  header="Editar Lançamento" :modal="true" :visible.sync="editarLancamento" :closable="true" :style="{width: '750px'}" class="p-fluid" >
      <form @submit.prevent="">
        <div class="row">
          <div class="col-sm-6">  
            <div class="p-field">
              <label for="id">ID</label>
              <InputNumber id="id" v-model.trim="lancamento.id" disabled="true" />        
            </div>
          </div>
            <div class="col-sm-6">   
              <div class="p-field">
                <label for="descricao">Descrição</label>
                <InputText id="descricao" v-model.trim="lancamento.descricao" required="true" autofocus />        
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
      </form>  
    <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text"  @click="editarLancamento = false" />
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
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
  components:{
    DataTable,
    Column,
    Dialog,
    Button,
    InputText,
    InputNumber,
    Dropdown
  },
   mounted() {
     const usuario = JSON.parse(localStorage.getItem("usuario"));
     this.$store.dispatch("buscarLancamentos", usuario.id)     
    },
    data() {
        return {
          deletarLancamento: false,
          editarLancamento: false,
          lancamento: {
            descricao: '',
            mes: '',
            ano: '',        
            usuario: 0,
            valor: 0,
            tipo: ''
          }
      }
    },
    computed: {
      lancamentos() {
        let data = this.$store.state.lanc.lancamentos;
        return data
        },
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
    },
    methods: {
      confirmexcluir(data) {
          this.lancamento = data;
          return this.deletarLancamento = true;
        },
      excluirLancamento(){
        this.$store.dispatch("excluirLancamento", this.lancamento);
        this.deletarLancamento = false;
        this.$toastr.s("Lançamento deletado com sucesso!");
      },
      formatCurrency(value) {
          return value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      },
      modalEditLancamento(data){
        this.lancamento = data;
        return this.editarLancamento = true;
      }

    }
}
</script>
<style>
.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
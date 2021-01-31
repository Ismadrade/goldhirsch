<template>
  <v-container>        
    <span class="h1 titulo">Lançamentos</span>    
    <br />
    <v-dialog
          v-model="dialog"
          max-width="500px"
          persistent
        >
      <template v-slot:[`activator`]="{ on, attrs }">
        <v-btn color="#495050" dark class="my-5" v-bind="attrs" v-on="on">
          Inserir Lançamento
        </v-btn>
      </template>
      <v-card>
            <v-card-title>
              <span class="headline">{{ lancamento.id == null ? titulo = "Salvar Lançamento" : titulo = "Editar Lançamento" }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="lancamento.id"                                            
                      disabled
                      v-show="false"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="lancamento.descricao"
                      label="Descrição"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="lancamento.calendario"                      
                      :items="calendario"
                      item-text="mes"
                      item-value="codigo"
                      label="Mês"
                      return-object
                      data-vv-name="select"                      
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="lancamento.ano"
                      label="Ano"
                      maxlength = "4"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <vuetify-money
                      v-model="lancamento.valor"
                      label="Valor"
                      v-bind:options="options"
                    ></vuetify-money>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <v-select
                      v-model="lancamento.tipo"
                      :items="tipo"
                      item-text="descricao"
                      item-value="code"
                      label="Descrição"
                      data-vv-name="select"                      
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false, reset()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="editLancamento"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px" persistent >
          <v-card>
            <v-card-text class="pt-10 text-center"> <i class="fa fa-exclamation-triangle mr-2" style="font-size: 2rem" />Você deseja realmente deletar este Lançamento?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false, reset()">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="excluirLancamento">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <!-- Data Table-->
    <v-card>      
      <template>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          style="width: 200px; margin: 0 0 0.5vh 2vh"
        ></v-text-field>
      </template>
      <v-data-table :headers="headers" :items="lancamentos" :search="search">
        <template v-slot:[`item.mes`]="{ item }">
          {{ item.calendario.mes}}
        </template>
        <template v-slot:[`item.dataCadastro`]="{ item }">
          {{ new Date(item.dataCadastro).toLocaleDateString()}}
        </template>
        <template v-slot:[`item.valor`]="{ item }">
          R$ {{ item.valor.toString().replace('.', ',')}}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="modalEditLancamento(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="confirmexcluir(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

   
  </v-container>
</template>

<script>
export default {
  mounted() {
    const usuario = this.$store.getters.loggedIn;
    this.$store
      .dispatch("buscarLancamentos", usuario.idUsuario)
      .catch((error) => this.$toastr.e(error));
  },
  data() {
    const usuario = this.$store.getters.loggedIn;
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Descrição",
          align: "start",
          value: "descricao",
        },
        { text: "Data do Cadastro", value: "dataCadastro" },
        { text: "Mês", value: "calendario.mes" },
        { text: "Ano", value: "ano" },
        { text: "Tipo", value: "tipo" },
        { text: "Valor", value: "valor" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      deletarLancamento: false,
      editarLancamento: false,
      titulo: "",
      lancamento: {
        descricao: "",
        calendario: {
          codigo: "",
          mes: ""
        },
        ano: "",
        usuario: usuario.idUsuario,
        valor: 0,
        tipo: "",
      },
      options: {
        locale: "pt-BR",
        prefix: "R$",
        suffix: "",
        length: 11,
        precision: 2
    },
    };
  },
  computed: {
    lancamentos() {
      let data = this.$store.state.lanc.lancamentos;
      return data;
    },
    calendario() {
      return [
        { mes: "Janeiro", codigo: 0 },
        { mes: "Fevereiro", codigo: 1 },
        { mes: "Março", codigo: 2 },
        { mes: "Abril", codigo: 3},
        { mes: "Maio", codigo: 4},
        { mes: "Junho", codigo: 5 },
        { mes: "Julho", codigo: 6 },
        { mes: "Agosto", codigo: 7 },
        { mes: "Setembro", codigo: 8 },
        { mes: "Outubro", codigo: 9 },
        { mes: "Novembro", codigo: 10 },
        { mes: "Dezembro", codigo: 11 },
      ];
    },
    tipo() {
      return [
        { descricao: "Receita", code: "RECEITA" },
        { descricao: "Despesa", code: "DESPESA" },
      ];
    },
  },
  methods: {
    salvar() {
      this.titulo = "Salvar Lançamento";
      return (this.editarLancamento = true);
    },
    confirmexcluir(data) {
      this.lancamento = data;
      return (this.dialogDelete = true);
    },
    excluirLancamento() {
      this.$store.dispatch("excluirLancamento", this.lancamento);
      this.dialogDelete = false;
      this.lancamento = {};
      this.$toastr.s("Lançamento deletado com sucesso!");
    },    
    modalEditLancamento(data) {
      console.log(data);
      this.lancamento = data;      
      return (this.dialog = true);
    },
    editLancamento() {
      console.log(this.lancamento);
      if (this.lancamento.id) {
        this.$store.dispatch("editarLancamento", this.lancamento);
        this.dialog = false;
        this.lancamento = {};
        this.$toastr.s("Lançamento editado com sucesso!");
      } else {
        const usuario = this.$store.getters.loggedIn;
        this.lancamento.usuario = usuario.idUsuario;
        this.$store
          .dispatch("inserirLancamento", this.lancamento)
          .then(() => {
            this.$toastr.s("Lançamento cadastrado com sucesso!");
            this.lancamento = {};
            this.dialog = false;

            this.$store.dispatch("buscarLancamentos", usuario.idUsuario);
          })
          .catch((err) => {
            this.$toastr.e(err, "Ocorreu um erro:");
          });
      }
    },

    reset() {
      this.editarLancamento = false;
      this.lancamento = {};
      const usuario = this.$store.getters.loggedIn;      
      this.$store.dispatch("buscarLancamentos", usuario.idUsuario);
    },
  },
};
</script>
<style>
.titulo{
  border-top: 3px solid #495050;
  border-bottom: 3px solid #495050;
  color: #495050;
}
</style>
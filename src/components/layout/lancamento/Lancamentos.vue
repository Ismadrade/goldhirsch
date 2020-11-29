<template>
  <div>
    <h1 class="mt-4">Lançamento</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Consulta</li>
    </ol>
    <br />
    <v-dialog
          v-model="dialog"
          max-width="500px"
          persistent
        >
      <template v-slot:[`activator`]="{ on, attrs }">
        <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
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
                      v-model="lancamento.mes"
                      :items="calendario"
                      item-text="mes"
                      item-value="code"
                      label="Mês"
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="modalEditLancamento(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="confirmexcluir(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>

   
  </div>
</template>

<script>
export default {
  mounted() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    this.$store
      .dispatch("buscarLancamentos", usuario.id)
      .catch((error) => this.$toastr.e(error));
  },
  data() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
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
        { text: "Mês", value: "mes" },
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
        mes: "",
        ano: "",
        usuario: usuario.id,
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
        { mes: "Janeiro", code: 1 },
        { mes: "Fevereiro", code: 2 },
        { mes: "Março", code: 3 },
        { mes: "Abril", code: 4 },
        { mes: "Maio", code: 5 },
        { mes: "Junho", code: 6 },
        { mes: "Julho", code: 7 },
        { mes: "Agosto", code: 8 },
        { mes: "Setembro", code: 9 },
        { mes: "Outubro", code: 10 },
        { mes: "Novembro", code: 11 },
        { mes: "Dezembro", code: 12 },
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
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        this.lancamento.usuario = usuario.id;
        this.$store
          .dispatch("inserirLancamento", this.lancamento)
          .then(() => {
            this.$toastr.s("Lançamento cadastrado com sucesso!");
            this.lancamento = {};
            this.dialog = false;

            this.$store.dispatch("buscarLancamentos", usuario.id);
          })
          .catch((err) => {
            this.$toastr.e(err, "Ocorreu um erro:");
          });
      }
    },

    reset() {
      this.editarLancamento = false;
      this.lancamento = {};
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      this.$store.dispatch("buscarLancamentos", usuario.id);
    },
  },
};
</script>
<style>
</style>
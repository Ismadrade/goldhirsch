<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-piggy-bank-outline</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Em sua conta</v-content><br>
              <v-content style="font-size: 30px;">R$ {{valorConta}}</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-cash-minus</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Em {{new Date().toLocaleString('pt-br', { month: 'long' })}} você gastou</v-content><br>
              <v-content style="font-size: 30px;">R$ {{gastoMensal}}</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-cash-plus</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Em {{new Date().toLocaleString('pt-br', { month: 'long' })}} você adquiriu</v-content><br>
              <v-content style="font-size: 30px;">R$ {{lucroMensal}}</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>      
    </v-row>
    <v-row>
      <v-col sm="11" lg="8">
        <v-card
          class="mt-16 mx-auto"
          max-width="1200"
        >
          <v-sheet
            class="v-sheet--offset mx-auto pb-5"
            color="white"
            elevation="12"
            max-width="calc(100% - 32px)"
            max-height="400"
          >
          <v-sparkline
            :labels="labels"
            :value="value"
            
            color="rgba(0,0,0,.6)"
            line-width="2"
            padding="16"
          ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
              Média Semestral
            </div>
            <div class="subheading font-weight-light grey--text">
              Seus gastos nos ultimos {{labels.length}} meses
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">Atualizado a 36 min atrás</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col offset="1" offset-lg="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({     
    labels: [
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
     ],
    value: [
      250,
      240,
      300,
      500,
      650,
      700
    ],
    options: {
      locale: "pt-BR",
      prefix: "R$",
      suffix: "",
      length: 11,
      precision: 2
    }, 
  }),
  beforeMount() {
    this.$store.dispatch("buscarLancamentos");
  },
  computed: {
    ...mapGetters(["lucroMensal", "gastoMensal", "valorConta"])
  }

}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
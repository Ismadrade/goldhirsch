<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-currency-usd-circle-outline</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Valor Total</v-content><br>
              <v-content style="font-size: 30px;">R$ 200,00</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-cash-plus</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Valor Mensal</v-content><br>
              <v-content style="font-size: 30px;">R$ 102,00</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-currency-usd-off</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Gasto Total</v-content><br>
              <v-content style="font-size: 30px;">R$ 100,00</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card max-width="375">
          <v-card-text class="d-flex justify-space-between">
            <v-icon size="80">mdi-cash-minus</v-icon> 
            <div>
              <v-content style="text-align: right; font-size: 18px">Gasto Mensal</v-content><br>
              <v-content style="font-size: 30px;">R$ 100,00</v-content>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
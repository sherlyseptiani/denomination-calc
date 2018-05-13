<template>
<div class="ui text container">
    <div class="ui one column grid middle aligned center aligned">
        <div class="column">
            <div class="ui basic segment left aligned">

                <h2 class="ui inverted header">
                    <i class="calculator icon"></i>
                    <div class="content uppercase">Denomination Calculator</div>
                </h2>

                <form class="ui huge form" @submit.prevent :class="error.cls">
                    <div class="field" :class="error.cls">
                        <input type="text" autocomplete="off" id="inputAmount" 
                                placeholder="Amount e.g. Rp12.300,00, 12300, etc." 
                                maxlength="15"
                                :data-content="amountInfo" 
                                data-position="bottom left"
                                data-variation="very wide"
                                v-model="amount"
                                @keyup.enter="validateAndCalculate"
                                @blur="validateAndCalculate"
                        >
                    </div>
                    <div class="ui error small message">
                        <div class="header">{{ error.header }}</div>
                        <p>{{ error.message }}</p>
                    </div>
                </form>

                <transition
                    enter-active-class="animated bounceIn"
                    leave-active-class="animated bounceOut"
                >
                    <app-result v-if="resultNotEmpty" :result="result" @resetForm="reset">
                        <tr v-for="(item, key) in result" :key="key"> 
                            <template v-if="key == 'Left'">
                                <td class="positive grey header">{{ key }}</td>
                                <td class="positive grey header">{{ item }}</td>
                            </template>
                            <template v-else>
                                <td>{{ item }}x</td>
                                <td>{{ key }}</td>
                            </template>
                        </tr>
                    </app-result>
                </transition>

            </div><!--segment-->
        </div><!--column-->
    </div><!--grid-->
</div>
</template>


<script>
import Result from './Result'
import _ from 'lodash'
import { required } from 'vuelidate/lib/validators'

export default {
  data(){
      return{
          amount: '',
          amountInfo: 'Rp12.300,00, Rp12300, Rp 12.300, 12.300, 12300, 00123, 005.000, and equivalents',
          amountRegex: /^(?:Rp)? ?(\d{1,3}(?:\.|\d{3})*)(?:,[0][0])?$/,
          denomination:[100000,50000,20000,10000,5000,2000,1000,500,100,50],
          result:{},
          error: {
              cls:'',
              header:'',
              message:''
          }
      }
  },
  mounted() {
      this.$nextTick(() => {
        $('#inputAmount').popup()
      })
  },
  validations: {
      amount: {
          required,
          notZero(val){
              return val !== '0'
          },
          idrFormat(val) {
              if (val === '') return true
              return this.amountRegex.test(val)
          }
      }
  },
  computed: {
      resultNotEmpty(){
          return !_.isEmpty(this.result)
      }
  },
  methods: {
      validateAndCalculate() {
          this.hidePopup()
          this.result = {}
          let amount = this.validate()
          if (amount) this.result = this.calculate(amount)
      },
      setError(cls, header, message){
          this.error.cls= cls
          this.error.header = header
          this.error.message = message
      },
      reset(){
          this.amount = ''
          this.result = {}
      },
      hidePopup(){
        // known and open bugs on semantic-ui github: https://github.com/Semantic-Org/Semantic-UI-React/issues/2319
        // popup won't hide in mobile devices, needs to be hidden manually
        this.$nextTick(() => {
          $('#inputAmount')
            .popup('hide')
        })
      },
      validate() {
          this.$v.$touch()
          if(this.$v.$invalid){
              if (!this.$v.amount.required || !this.$v.amount.notZero) this.setError("error", "Empty input", "Amount cannot be empty")
              else if (!this.$v.amount.idrFormat) this.setError("error", "Invalid format", "Please input with supported amount format")
              return false
          }
          
          this.setError('','','')
          let amount = this.amountRegex.exec(this.amount)[1].replace(/\D/g,'') //strip non numeric characters
          return amount
      },
      calculate(amount) {
          let result = {}
          this.denomination.forEach(note => {
              if(amount >= note) {
                result[note] = parseInt (amount / note)
                amount %= note
              }
              else return
          })
          if(amount) result["Left"] = amount
          return result
      },
  },
  components: {
      appResult : Result
  }
}
</script>


<style scoped>
    .grid {  min-height:85vh }
    .uppercase { text-transform: uppercase }
</style>

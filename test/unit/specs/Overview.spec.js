import Vue from 'vue'
import Home from '@/components/Home'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

const input= {
    valid: 'Rp 15.000,00',
    invalid: '15 000'
}


describe('Overview', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()

    it('should produce result on valid input', () => {
        vm.amount = input.valid
        vm.validateAndCalculate()
        expect(vm.result).to.be.an('object').that.is.not.empty
        expect(vm.resultNotEmpty).to.be.true
    })

    it('should not produce result on invalid input', () => {
        vm.amount = input.invalid
        vm.validateAndCalculate()
        expect(vm.result).to.be.an('object').that.is.empty
        expect(vm.resultNotEmpty).to.be.false
    })

    it('should empty result on reset', () => {
        vm.amount = input.valid
        vm.validateAndCalculate()
        vm.reset()
        expect(vm.result).to.be.an('object').that.is.empty
        expect(vm.resultNotEmpty).to.be.false
    })

})

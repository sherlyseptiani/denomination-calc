import Vue from 'vue'
import Home from '@/components/Home'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

const validInputs = {
    withRp : ['Rp 17.500', 'Rp 15000', 'Rp12.300', 'Rp12300', 'Rp00500', 'Rp 00500', 'Rp001.000', 'Rp 03.000'],
    withRpAndCents : ['Rp 17.500,00', 'Rp 15000,00', 'Rp12.300,00', 'Rp12300,00', 'Rp00500,00','Rp 00500,00', 'Rp001.000,00', 'Rp 03.000,00'],
    withoutRp : ['17.500,00', '15000,00', '12.300,00', '12300,00', '00500,00', '00500,00', '001.000,00', '03.000,00'],
    withoutRpAndCents : ['17.500', '15000', '12.300', '12300', '00500', '00500', '001.000', '03.000']
}

const invalidInputs = {
    invalidSeparators: ['Rp 15,500,00', 'Rp1.23,00', 'Rp 002,32,00', 'Rp11 500', '12,500', '56 000', '12.78', 'Rp.123'],
    wrongPosition: ['15500 Rp', '15.500,00 Rp'],
    wrongCents: ['23.500,10', '25.900,0', 'Rp 123.500,'],
    missingValue: ['Rp', 'Rp ,00', 'R 15000']
}

describe('Validation', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    
    // ======================= Valid Inputs =======================

    describe('Validate valid inputs', () => {

        it('should accept valid input formats with Rp or Rp<space>', () => {
            validInputs.withRp.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.not.false
                expect(vm.validate()).to.be.a('string').that.is.numeric
            })
        })

        it('should accept valid input formats with Rp or Rp<space> and ,00', () => {
            validInputs.withRpAndCents.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.not.false
                expect(vm.validate()).to.be.a('string').that.is.numeric
            })
        })

        it('should accept valid input formats without Rp', () => {
            validInputs.withoutRp.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.not.false
                expect(vm.validate()).to.be.a('string').that.is.numeric
            })
        })

        it('should accept valid input formats without Rp and cents', () => {
            validInputs.withoutRpAndCents.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.not.false
                expect(vm.validate()).to.be.a('string').that.is.numeric
            })
        })

    })

    // ======================= Invalid Inputs =======================

    describe('Validate invalid inputs', () => {

        it('should reject input with invalid separators', () => {
            invalidInputs.invalidSeparators.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.false
            })
        })

        it('should reject input with wrong position', () => {
            invalidInputs.wrongPosition.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.false
            })
        })

        it('should reject input with wrong cents', () => {
            invalidInputs.wrongCents.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.false
            })
        })

        it('should reject input with missing value', () => {
            invalidInputs.missingValue.every(amount => {
                vm.amount = amount
                expect(vm.validate()).is.false
            })
        })
    })

})
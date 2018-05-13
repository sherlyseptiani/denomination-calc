import Vue from 'vue'
import Home from '@/components/Home'

const amount = {
    withoutRemainder : [300, 4700, 17500, 157200, 1922550, 78929700],
    withRemainder: [ 327, 4701, 17520, 157233, 1922556, 78929705]
}


describe('Calculation', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()


    describe('Calculate amount without remainder', () => {

        it('should produce the same total as inputted amount', () => {
            amount.withoutRemainder.every(amount => {
                let total = 0
                let result = vm.calculate(amount)
                expect(result).to.be.an('object').that.is.not.empty
                for (var key in result) {
                    total += parseInt(key*result[key])
                }
                expect(total).to.equal(amount)
            })
        })

        it('should not have any remainder', () => {
            amount.withoutRemainder.every(amount => {
                let result = vm.calculate(amount)
                expect(result).to.be.an('object').that.is.not.empty
                expect(result).to.not.have.property('Left')
            })
        })
        
    })

    describe('Calculate amount with remainder', () => {

        it('should produce the same total as inputted amount', () => {
            amount.withRemainder.every(amount => {
                let total = 0
                let result = vm.calculate(amount)
                expect(result).to.be.an('object').that.is.not.empty
                for (var key in result) {
                    if(key !== 'Left') total += parseInt(key*result[key])
                    else total += parseInt(result[key])
                }
                expect(total).to.equal(amount)
            })
        })

        it('should have remainder', () => {
            amount.withRemainder.every(amount => {
                let result = vm.calculate(amount)
                expect(result).to.be.an('object').that.is.not.empty
                expect(result).to.have.property('Left')
            })
        })
        
    })
})

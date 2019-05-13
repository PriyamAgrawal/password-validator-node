const expect = require('chai').expect
const passwordValidator = require('./functions')

describe('passwordValidator()', () => {
	it('should return not acceptable for a string that does not meet the requirements', () => {
		let pass = "wiinq"
		let result1 = 0
		let result2
		if(passwordValidator(pass)) {
			result2 = 1
		} else {
			result2 = 0
		}
		expect(result2).to.be.equal(result1)
	})
	it('should return acceptable for a string that meets the requirements', () => {
		let pass = "houctuh"
		let result1 = 1
		let result2
		if(passwordValidator(pass)) {
			result2 = 1
		} else {
			result2 = 0
		}
		expect(result2).to.be.equal(result1)
	})
})
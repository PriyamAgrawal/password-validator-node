const checkVowel = (ch) => { // function to check whether the character ch is a vowel or not
	const vowels = 'aeiou'
	if(vowels.indexOf(ch)!=-1) {
		return 1
	}
	return 0
}

const vowelCount = (pass) => { // function to find the presence of vowel in password
	for(let i = 0; i < pass.length; i++) {
		if(checkVowel(pass[i])) {
			return 1
		}
	}
	return 0
}

const consecutiveCheck = (pass) => { // function to check whether 3 consecutive vowels or consonants are present or not
	let vowel = 0, consonant = 0 // to keep track of consecutive count of vowels and consonants
	let prev = false //false for consonant, true for vowel
	for(let i = 0; i < pass.length; i++) {
		if(checkVowel(pass[i])) {
			if (prev == false) {
				vowel = 1
				prev = true
			} else {
				vowel++
			}
		} else {
			if(prev	== true) {
				consonant = 1
				prev = false
			} else {
				consonant++
			}
		}
		if(vowel == 3 || consonant == 3) {
			return 1
		}
	}
	return 0
}

const consecutiveSame = (pass) => { // function to check presence of 2 consecutive occurence of same letter
	let a, b
	if(pass.length < 2) {
		return 0
	}
	for(let i = 0; i < pass.length-1; i++) {
		a = pass[i]
		b = pass[i+1]
		if(a == b) {
			if(a == 'e' || a == 'o') { // exception rule to check ee or oo
				continue
			} else {
				return 1
			}
		}
	}
	return 0
}

const passwordValidator = (pass) => { // function to validate password
	if(vowelCount(pass) && !consecutiveCheck(pass) && !consecutiveSame(pass)) {
		return 1
	} else {
		return 0
	}
}

module.exports = passwordValidator
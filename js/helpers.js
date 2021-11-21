function lcg(startseed) {
	let x = BigInt(startseed)
	return function() {
		x = ((BigInt(0xadb4a92d) * x) + BigInt(9999999)) & BigInt(0xFFFFFFFF)
		return Number(x) / 2**32
	}
}

const seed = 2 // Date.now() //seed
const rand = lcg(seed)
export const randint = (max) => Math.ceil(max * rand())
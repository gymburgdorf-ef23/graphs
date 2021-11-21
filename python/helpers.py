from math import ceil
import time

def lcg(seed):
	x = seed
	#print(x)
	def ran():
		nonlocal x
		x = ((0xadb4a92d * x) + 9999999) & 0xFFFFFFFF
		return x / 2**32
	return ran

seed = 2 # round(time.time() * 1000) # seed
rand = lcg(seed)

def randint(max):
	return ceil(max * rand())


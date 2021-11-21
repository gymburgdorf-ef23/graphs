from Graph import *
from helpers import *

def buildGraph(side = 10):
	V = side ** 2
	alphabet =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	getId = (lambda i: i) if V > 25 else (lambda i: alphabet[i])
	edges = []
	for i in range(V):
		for j in range(V):
			if j == i + 1 and i % side < side - 1 or j == i + side:
				edges.append({"source": getId(i), "target": getId(j), "weight": randint(6)})
			if j == i + side + 1 and i % side <  side - 1:
				edges.append({"source": getId(i), "target": getId(j), "weight": randint(9)})

	g = Graph(False)
	for i in range(V):
		g.addNode(getId(i))

	for edge in edges:
		g.addEdge(edge["source"], edge["target"], edge["weight"])

	return g
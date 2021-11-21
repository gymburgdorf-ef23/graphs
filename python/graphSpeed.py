from GraphAdjMatrix import Graph
from helpers import randint
import time

N = 2000
g = Graph(False)

t0 = 1000 * time.time()

for i in range(N):
	g.addNode(i)

t1 = 1000 * time.time()

for i in range(N):
	for j in range(N):
		if randint(1000) < 10:
			g.addEdge(i, j, randint(10))

t2 = 1000 * time.time()

for i in range(N):
	g.getNeighbours(i)

t3 = 1000 * time.time()

print("Graph size:", N)
print("addNodes", round(t1 - t0))
print("addEdges", round(t2 - t1))
print("getNeighbours", round(t3 - t2))

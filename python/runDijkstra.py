from buildGraph import buildGraph
from dijkstra import findShortestPath
import time

Nroot = 100

t0 = time.time()

g = buildGraph(Nroot)

t1 = time.time()
print(f"build Graph {Nroot} x {Nroot}", str(t1 - t0))

shortestPath = findShortestPath(g, 0, Nroot**2 - 1)

t2 = time.time()

print(f"dijkstra", str(t2 - t1))

print(shortestPath)
from Graph import Graph

g = Graph(directed = False)

g.addNode("A")
g.addNode("B")
g.addNode("C")
g.addNode("D")
g.addNode("E")

g.addEdge("A", "B", 2)
g.addEdge("B", "C", 2)
g.addEdge("C", "D", 2)
g.addEdge("D", "A", 2)
g.addEdge("C", "A", 3)
g.addEdge("D", "B", 3)
g.addEdge("B", "E", 2)
g.addEdge("C", "E", 2)

n = g.getNeighbours("B")

print(n)
class Graph:

	def __init__(self, directed = True):
		self.directed = directed
		self.matrix = []
		self.nodes = []

	def addNode(self, id):
		self.nodes.append(id)
		for line in self.matrix:
			line.append(None)

		self.matrix.append([None] * len(self.nodes))

	def addEdge(self, source, target, weight=1):
		sourceIndex = self.nodes.index(source)
		targetIndex = self.nodes.index(target)
		self.matrix[sourceIndex][targetIndex] = weight
		if(not self.directed):
			self.matrix[targetIndex][sourceIndex] = weight

	def totalNodes(self):
		return len(self.nodes)


	def getNeighbours(self, id):
		neighbours = []
		index = self.nodes.index(id)
		for i in range(len(self.matrix[index])): 
			weight = self.matrix[index][i]
			if(weight != None):
				neighbours.append({"id": self.nodes[i], "weight": weight})

		return neighbours

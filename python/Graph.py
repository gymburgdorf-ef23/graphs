class Graph:

	def __init__(self, directed = True):
		self.directed = directed
		self.nodes = []
		self.edges = []


	def addNode(self, id):
		self.nodes.append(id)


	def addEdge(self, source, target, weight=1):
		self.edges.append({
			"source": source,
			"target": target,
			"weight": weight
		})

	def totalNodes(self):
		return len(self.nodes)


	def getNeighbours(self, id):
		neighbours = []
		for edge in self.edges:
			if edge["source"] == id:
				neighbours.append({
					"id": edge["target"],
					"weight": edge["weight"]
				})
			
			if(not self.directed and edge["target"] == id):
				neighbours.append({
					"id": edge["source"],
					"weight": edge["weight"]
				})


		return neighbours
	

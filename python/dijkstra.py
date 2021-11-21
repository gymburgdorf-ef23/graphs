def findShortestPath(graph, source, target):
	done = {}     # {"a": 0, "b": 8: "c": 9}
	pending = {}  # {"d": 17, "e": 15}
	prev = {}     # {"a": None, "b": "a", "c": "a", "d": "b", "e": "c"}
	prev[source] = None
	done[source] = 0
	current = source
	while(not current == None):
		neighbours = graph.getNeighbours(current)
		for neighbour in neighbours:
			nodeid = neighbour["id"]
			weight = neighbour["weight"]
			if nodeid in done:
				continue
			distViaCurrent = done[current] + weight
			isNew = not (nodeid in pending)
			isShorter = not(isNew) and distViaCurrent < pending[nodeid]
			if isNew or isShorter:
				pending[nodeid] = distViaCurrent
				prev[nodeid] = current
		nextnode = findMinimum(pending)
		if nextnode:
			done[nextnode] = pending[nextnode]
			del pending[nextnode]
		current = nextnode
	if target in done:
		route = joinRoute(target, prev)
		return {"distance": done[target], "route": route}
	return "not reachable"

def findMinimum(pending):
	nextnode = None
	minDist = float("inf")
	for id in pending:
		if(pending[id] < minDist):
			minDist = pending[id]
			nextnode = id
	return nextnode


def joinRoute(target, prev):
	previous = prev[target]
	route = str(target)
	while(previous != None):
		route = str(previous) + "->" + route
		previous = prev[previous]
	return route

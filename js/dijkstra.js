export function findShortestPath(graph, source, target) {
	const done = {}     // {a: 0, b: 8: c: 9}
	const pending = {}  // {d: 17, e: 15}
	const prev = {}     // {a: null, b: "a", c: "a", d: "b", e: "c"}
	prev[source] = null
	done[source] = 0
	let current = source
	while(current !== null && current !== target) {
		const neighbours = graph.getNeighbours(+current)
		for(let {id, weight} of neighbours) {
			if(id in done) continue
			const distViaCurrent = done[current] + weight
			const isNew = !(id in pending)
			const isShorter = !isNew && distViaCurrent < pending[id]
			if(isNew || isShorter) {
				pending[id] = distViaCurrent
				prev[id] = current
			}
		}
		let next = findMinimum(pending)
		if(next) {
			done[next] = pending[next]
			delete pending[next]
		}
		current = next
	}
	if(target in done) {
		const route = joinRoute(target, prev)
		return {distance: done[target], route}
	}
	return "not reachable"
}

function findMinimum(pending) {
	let next = null
	let minDist = Infinity
	for(let id in pending) {
		if(pending[id] < minDist) {
			minDist = pending[id]
			next = id
		}
	}
	return next
}

function joinRoute(target, prev) {
	let previous = prev[target]
	let route = target
	while(previous !== null) {
		route = previous + "->" + route
		previous = prev[previous]
	}
	return route
}
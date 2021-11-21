
function mulberry32(a) {
	return function() {
		var t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
}

const seed = Date.now() % 10000 // 2117
const rand = mulberry32(seed)
const randint = (max) => Math.ceil(max * rand())
console.log(seed);

class Graph {
	constructor(directed = true) {
		this.directed = directed
		this.type = "basic"
		this.nodes = []
		this.edges = []
	}
	addNode(id) {
		this.nodes.push(id)
	}
	addEdge(source, target, weight=1) {
		this.edges.push({source, target, weight})
	}
	totalNodes() {
		return this.nodes.length
	}
	removeNode(id) {
		const index = this.nodes.indexOf(id)
		this.nodes.splice(index, 1)
	}
	removeEdge(source, target) {
		const index = this._getIndexOfConnection(source, target)
		this.edges.splice(index, 1)
	}
	_getIndexOfConnection(source, target) {
		return this.nodes.findIndex(edge => edge.source == source && edge.target == target)
	}
	getNeighbours(id) {
		const neighbours = []
		for(let edge of this.edges) {
			if(edge.source == id) {
				neighbours.push({id: edge.target, weight: edge.weight})
			}
			if(!this.directed && edge.target === id) {
				neighbours.push({id: edge.source, weight: edge.weight})
			}
		}
		return neighbours
	}
}

//diagonalGraph
const side = 10
const V = side ** 2
const alphabet =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const getId = V > 25 ? (i=>i) : (i=>alphabet[i])
const p = 0.3
const edges = []
for(let i = 0; i < V; i++) {
	for(let j = 0; j < V; j++) {
		if((j === i + 1 && i % side < side - 1) || j == i + side) {
			edges.push({source: getId(i), target: getId(j), weight: randint(6)})
		}
		if(j == i + side + 1 && i % side <  side - 1) {
			edges.push({source: getId(i), target: getId(j), weight: randint(9)})
		}
	}
}

const g = new Graph(false)
for(let i = 0; i < V; i++) {
	g.addNode(getId(i))
}
for(let edge of edges) {
	g.addEdge(edge.source, edge.target, edge.weight)
}

const renderer = render(g)

//Dijkstra
function shortestPath(graph, source, target) {
	const visited = {}
	const pending = {}
	const bestRoute = {[source]: null}
	visited[source] = 0
	let current = source
	let visitedCount = 1
	while(visitedCount < graph.totalNodes()) {
		const neighbours = graph.getNeighbours(current)
		for(let {id, weight} of neighbours) {
			if(id in visited) continue
			if(id in pending) {
				if(visited[current] + weight < pending[id]) {
					pending[id] = visited[current] + weight
					bestRoute[id] = current
				}
			} else {
				pending[id] = visited[current] + weight
				bestRoute[id] = current
			}
		}
		let next
		let minDist = Infinity
		for(let id in pending) {
			if(pending[id] < minDist) {
				minDist = pending[id]
				next = id
			}
		}
		if(!next) break
		delete pending[next]
		visited[next] = minDist
		current = next
		visitedCount += 1
	}
	if(visited[target]) {
		let prev = bestRoute[target]
		let route = target
		while(prev !== null) {
			route = prev + "->" + route
			prev = bestRoute[prev]
		}
		return {distance: visited[target], route}
	}
	return "not reachable"
}

function dijkstra2(graph, source, target) {
	const pending = {}
	const done = {}
	const prev = {}
	prev[source] = null
	done[source] = 0
	let current = source
	while(true) {
		const neighbours = graph.getNeighbours(current)
		console.log(neighbours);
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
		let next
		let minDist = Infinity
		for(let id in pending) {
			if(pending[id] < minDist) {
				minDist = pending[id]
				next = id
			}
		}
		if(!next) break
		delete pending[next]
		done[next] = minDist
		current = next
	}
	if(done[target]) {
		let previous = prev[target]
		let route = target
		while(previous !== null) {
			route = previous + "->" + route
			previous = prev[previous]
		}
		return {distance: done[target], route}
	}
	return "not reachable"
}

//Prim
function findMinSpan(graph, source) {
	const pickedIds = [source]
	const pickedEdges = []
	while(pickedIds.length < graph.totalNodes()) {
		let cheapestDistance = Infinity
		let cheapestEdge = null
		for(let pickedId of pickedIds) {
			const neighbours = graph.getNeighbours(pickedId)
			for(let {id, weight} of neighbours) {
				if(pickedIds.includes(id)) continue
				if(weight < cheapestDistance) {
					cheapestDistance = weight
					cheapestEdge = [pickedId, id]
				}
			}
		}
		pickedIds.push(cheapestEdge[1])
		pickedEdges.push(cheapestEdge)
	}
	return pickedEdges
}

console.log(g, g.nodes[0], g.nodes[V-1]);
const s = shortestPath(g, g.nodes[0], g.nodes[V-1])
const d = dijkstra2(g, g.nodes[0], g.nodes[V-1])
const t = findMinSpan(g, g.nodes[0])

console.log(s, d, t,  renderer);

if(location.search.includes("dijkstra")) {
	d.route.split("->").forEach(id=>{
		renderer.style().selector('node#'+id).style('background-color', '#800').update()
	})
}

if(location.search.includes("prim")) {
	t.forEach(([source, target])=>{
		renderer.style().selector(`edge#${source}_${target}`).style('line-color', '#000').style("width", 6).update()
		renderer.style().selector(`edge#${target}_${source}`).style('line-color', '#000').style("width", 6).update()
	})
}
import {Graph} from "./Graph.js"
import {randint} from "./helpers.js"

export function buildGraph(side = 10) {
	const V = side ** 2
	// const alphabet =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	// const getId = V > 25 ? (i=>i) : (i=>alphabet[i])
	const getId = i=>i
	const edges = []
	for(let i = 0; i < V; i++) {
		for(let j = 0; j < V; j++) {
			if((j == i + 1 && i % side < side - 1) || j == i + side) {
				edges.push({source: getId(i), target: getId(j), weight: randint(6)})
			}
			if(j == i + side + 1 && i % side < side - 1) {
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

	return g
}


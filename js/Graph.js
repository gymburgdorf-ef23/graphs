export class Graph {

	constructor(directed = true) {
		this.directed = directed
		this.nodes = []
		this.edges = []
	}

	addNode(id) {
		this.nodes.push(id)
	}

	addEdge(source, target, weight=1) {
		this.edges.push({source, target, weight})
	}
	getNeighbours(id) {
		const neighbours = []
		for(let edge of this.edges) {
			if(edge.source == id) {
				neighbours.push({
					id: edge.target,
					weight: edge.weight
				})
			}
			if(!this.directed && edge.target == id) {
				neighbours.push({
					id: edge.source,
					weight: edge.weight
				})
			}
		}
		return neighbours
	}
	totalNodes() {return this.nodes.length}
	getEdges() {return this.edges}
	getNodes() {return this.nodes}
}


// removeNode(id) {
// 	const index = this.nodes.indexOf(id)
// 	this.nodes.splice(index, 1)
// }
// removeEdge(source, target) {
// 	const index = this._getIndexOfConnection(source, target)
// 	this.edges.splice(index, 1)
// }

// _getIndexOfConnection(source, target) {
// 	return this.nodes.findIndex(edge => edge.source == source && edge.target == target)
// }
export class Graph {

	constructor(directed = true) {
		this.directed = directed
		this.matrix = []
		this.nodes = []
	}
	addNode(id) {
		this.nodes.push(id)
		for(let line of this.matrix) {
			line.push(null)
		}
		this.matrix.push(Array(this.nodes.length).fill(null))
	}
	addEdge(source, target, weight=1) {
		const sourceIndex = this.nodes.indexOf(source)
		const targetIndex = this.nodes.indexOf(target)
		this.matrix[sourceIndex][targetIndex] = weight
		if(!this.directed) {
			this.matrix[targetIndex][sourceIndex] = weight
		}
	}
	totalNodes() {return this.nodes.length}
	getNeighbours(id) {
		const neighbours = []
		const index = this.nodes.indexOf(id)
		for(let i = 0; i < this.matrix[index].length; i++) {
			const weight = this.matrix[index][i]
			if(weight !== null) {
				neighbours.push({id: this.nodes[i], weight})
			}
		}
		return neighbours
	}
	totalNodes() {return this.nodes.length}
	getEdges() {
		const edges = []
		for(let i = 0; i < this.matrix.length; i++) {
			for(let j = 0; j < this.matrix[i].length; j++) {
				const weight = this.matrix[i][j]
				if(weight !== null) {
					edges.push({source: this.nodes[i], target: this.nodes[j], weight})
				}
			}
		}
		return this.edges
	}
	getNodes() {return this.nodes}
}
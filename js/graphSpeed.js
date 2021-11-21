import {Graph} from "./GraphAdjMatrix.js"
import {randint} from "./helpers.js"

const N = 2000
const g = new Graph(false)

console.log("Graph size: ", N);

const t0 = Date.now()

for(let i = 0; i < N; i++) {
	g.addNode(i)
}

const t1 = Date.now()
console.log("addNodes: ", t1 - t0);

for(let i = 0; i < N; i++) {
	for(let j = 0; j < N; j++) {
		if(randint(1000) < 10)
			g.addEdge(i, j, randint(10))
	}
}

const t2 = Date.now()
console.log("addEdges: ", t2 - t1);

for(let i = 0; i < N; i++) {
	g.getNeighbours(i)
}

const t3 = Date.now()
console.log("getNeighbours: ", t3 - t2);
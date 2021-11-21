import {buildGraph} from "./buildGraph.js"
import {findShortestPath} from "./dijkstra.js"

const Nroot = 300

console.time(`build Graph ${Nroot} * ${Nroot}`)
const g = buildGraph(Nroot)
console.timeEnd(`build Graph ${Nroot} * ${Nroot}`)

console.time("dijkstra")
const s = findShortestPath(g, "0", String(Nroot**2 - 1))
console.timeEnd("dijkstra")

console.log(s);
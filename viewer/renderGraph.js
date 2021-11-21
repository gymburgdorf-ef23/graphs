const container = document.querySelector('.cyto')

const basicStyle = [ // the stylesheet for the graph
	{
		selector: 'node',
		style: {
			'background-color': '#cde',
			'label': 'data(id)',
			'width': (ele) => 20 + String(ele.data('id')).length * 10,
			'shape': 'round-rectangle',
			'text-halign': 'center',
			'text-valign': 'center'
			// width: 10,
			// height: 10,
			// shape: "circle"
		}
	},
	{
		selector: 'edge',
		style: {
			'width': 2,
			'label': 'data(weight)',
			'line-color': '#ccc',
			'curve-style': 'bezier'
		}
	}
]

const directedStyle = [
	{
		selector: 'edge',
		style: {
			'target-arrow-color': '#ccc',
			'target-arrow-shape': 'triangle',
		}
	}
]

function render(graph) {

	const style = graph.directed ? basicStyle.concat(directedStyle) : basicStyle

	const elements = [
		...graph.nodes.map(n=>({data: {id: n}})),
		...graph.edges.map(e=>({data: {id: `${e.source}_${e.target}`, source: e.source, target: e.target, weight: e.weight}})), // list of graph elements to start with
	]

	const layout = {
		name: 'grid',
		rows: Math.sqrt(g.nodes.length)
	}

	// const layout = {
	// 	name: 'cose',
	// }

	var cy = cytoscape({container, style, layout, elements})
	// cy.on('tap', 'node', function(evt){
	// 	var node = evt.target;
	// 	node.remove()
	// });
	return cy
}

function $my_lom_dom_render(
	node : Element | DocumentFragment ,
	children: NodeList | Array< Node | string | null >
) {
	const node_set = new Set< Node | string | null >( children )
	let next = node.firstChild

	for (const view of children) {
		if (view === null) continue

		if (view instanceof Node) {

			while(true) {
				if (!next) {
					node.append(view)
					break
				}
				if (next === view) {
					next = next.nextSibling
					break;
				} else {
					if (node_set.has(next)) {
						next.before(view)
						break;
					} else {
						const nn = next.nextSibling
						next.remove()
						next = nn
					}
				}
			}

		} else {

			if( next && next.nodeName === '#text' ) {
				const str = String( view )
				if( next.nodeValue !== str ) next.nodeValue = str
				next = next.nextSibling
			} else {
				const text = $my_lom_dom_context.document.createTextNode( String( view ) )
				node.insertBefore( text, next )
			}

		}
	}

	while( next ) {
		const curr = next 
		next = curr.nextSibling
		curr.remove()
	}
}

class $my_lom_view {
	dom_name() {
		return 'div'
	}

	attr(): { [key: string]: string|number|boolean|null } {
		return {}
	}

	event(): { [key: string]: (e: Event) => any } {
		return {}
	}

	field(): { [key: string]: any } {
		return {}
	}
	
	sub(): Array<$my_lom_view | Node | string | number | boolean> {
        return []
    }

	_dom_node = null as unknown as Element
	dom_node() {
		if ( this._dom_node ) return this._dom_node

		const node = document.createElement( this.dom_name() )
		Object.entries(this.event()).forEach( ([name , fn])=> node.addEventListener(name, fn) )

		return this._dom_node = node
	}

	dom_node_actual() {
		const node = this.dom_node()

		Object.entries(this.attr()).forEach( ([name, val])=> node.setAttribute(name, String(val)) )
		Object.entries(this.field()).forEach( ([name, val])=> node[name] = val )

		node.setAttribute('view', this.constructor.name)

		return node
	}

	dom_tree() {
		const node = this.dom_node_actual()

		const node_list = this.sub().map( node => {
			if ( node === null ) return null
			return node instanceof $my_lom_view ? node.dom_tree() : String(node)
		} )

		this.render( node , node_list )

		return node
	}

	render( node: Element, children: Array<Node | string | null> ) {
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
					const text = document.createTextNode( String( view ) )
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
}

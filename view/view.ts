class $my_lom_view {

	static root: ()=> typeof $my_lom_view
	static mount() {
		const node = $my_lom_dom_context.document.querySelector( '#root' )
		if ( !node ) return

		const View = this.root()
		const obj = new View

		node.replaceWith( obj.dom_tree() )
		setInterval( ()=> obj.dom_tree() , 100 )
	}

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
	} // 123
	
	sub(): Array<$my_lom_view | Node | string | number | boolean> {
        return []
    }

	_dom_node = null as unknown as Element
	dom_node() {
		if ( this._dom_node ) return this._dom_node

		const node = $my_lom_dom_context.document.createElement( this.dom_name() )
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

		$my_lom_dom_render( node, node_list )

		return node
	}

}

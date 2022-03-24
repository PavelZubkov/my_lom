class $my_lom_storage {

	static value<Value>( key: string, next?: Value ) {
		if ( next === undefined ) return JSON.parse( localStorage.getItem( key ) ?? 'null' )

		if ( next === null ) localStorage.removeItem( key )
		else localStorage.setItem( key, JSON.stringify( next ) )

		return next
	}

}

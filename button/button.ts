class $my_lom_button extends $my_lom_view {

	dom_name() { return 'button' }

	title() { return '' }

	click( e: Event ) {}

	sub() {
		return [ this.title() ]
	}

	event() {
		return {
			click: (e: Event) => this.click(e)
		}
	}

}

class $my_lom_button_minor extends $my_lom_button {

	attr() {
		return {
			'$my_lom_button_minor': true,
		}
	}

}

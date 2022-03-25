setInterval( ()=> {
	$my_lom_dom_context.document.documentElement.setAttribute(
		'my_lom_theme' ,
		new Date().getSeconds() < 30 ? 'light' : 'dark' ,
	)
} , 1_000 )

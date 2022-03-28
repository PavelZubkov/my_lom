"use strict";
function require( path ){ return $node[ path ] };
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var globalThis = globalThis || ( typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this )
var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict";
let $my_lom_dom_context;
//my/lom/dom/context/context.ts
;
"use strict";
$my_lom_dom_context = self;
//my/lom/dom/context/context.web.ts
;
"use strict";
function $my_lom_dom_render(node, children) {
    const node_set = new Set(children);
    let next = node.firstChild;
    for (const view of children) {
        if (view === null)
            continue;
        if (view instanceof Node) {
            while (true) {
                if (!next) {
                    node.append(view);
                    break;
                }
                if (next === view) {
                    next = next.nextSibling;
                    break;
                }
                else {
                    if (node_set.has(next)) {
                        next.before(view);
                        break;
                    }
                    else {
                        const nn = next.nextSibling;
                        next.remove();
                        next = nn;
                    }
                }
            }
        }
        else {
            if (next && next.nodeName === '#text') {
                const str = String(view);
                if (next.nodeValue !== str)
                    next.nodeValue = str;
                next = next.nextSibling;
            }
            else {
                const text = $my_lom_dom_context.document.createTextNode(String(view));
                node.insertBefore(text, next);
            }
        }
    }
    while (next) {
        const curr = next;
        next = curr.nextSibling;
        curr.remove();
    }
}
//my/lom/dom/render/render.ts
;
"use strict";
class $my_lom_view {
    static root;
    static mount() {
        const node = $my_lom_dom_context.document.querySelector('#root');
        if (!node)
            return;
        const View = this.root();
        const obj = new View;
        node.replaceWith(obj.dom_tree());
        setInterval(() => obj.dom_tree(), 100);
    }
    dom_name() {
        return 'div';
    }
    attr() {
        return {};
    }
    event() {
        return {};
    }
    field() {
        return {};
    }
    sub() {
        return [];
    }
    _dom_node = null;
    dom_node() {
        if (this._dom_node)
            return this._dom_node;
        const node = $my_lom_dom_context.document.createElement(this.dom_name());
        Object.entries(this.event()).forEach(([name, fn]) => node.addEventListener(name, fn));
        return this._dom_node = node;
    }
    dom_node_actual() {
        const node = this.dom_node();
        Object.entries(this.attr()).forEach(([name, val]) => node.setAttribute(name, String(val)));
        Object.entries(this.field()).forEach(([name, val]) => node[name] = val);
        node.setAttribute('view', this.constructor.name);
        return node;
    }
    dom_tree() {
        const node = this.dom_node_actual();
        const node_list = this.sub().map(node => {
            if (node === null)
                return null;
            return node instanceof $my_lom_view ? node.dom_tree() : String(node);
        });
        $my_lom_dom_render(node, node_list);
        return node;
    }
}
//my/lom/view/view.ts
;
"use strict";
setTimeout(() => $my_lom_view.mount());
//my/lom/view/view.web.ts
;
"use strict";
class $my_lom_button extends $my_lom_view {
    dom_name() { return 'button'; }
    title() { return ''; }
    click(e) { }
    sub() {
        return [this.title()];
    }
    event() {
        return {
            click: (e) => this.click(e)
        };
    }
}
class $my_lom_button_minor extends $my_lom_button {
    attr() {
        return {
            '$my_lom_button_minor': true,
        };
    }
}
//my/lom/button/button.ts
;
"use strict";
class $my_lom_input extends $my_lom_view {
    dom_name() { return 'input'; }
    type() { return 'text'; }
    _value = '';
    value(next = this._value) {
        return this._value = next;
    }
    event_change(e) {
        this.value(e.target.value);
    }
    field() {
        return {
            value: this.value(),
        };
    }
    attr() {
        return {
            type: this.type(),
        };
    }
    event() {
        return {
            input: (e) => this.event_change(e),
        };
    }
}
//my/lom/input/input.ts
;
"use strict";
class $my_lom_storage {
    static value(key, next) {
        if (next === undefined)
            return JSON.parse(localStorage.getItem(key) ?? 'null');
        if (next === null)
            localStorage.removeItem(key);
        else
            localStorage.setItem(key, JSON.stringify(next));
        return next;
    }
}
//my/lom/storage/storage.ts
;
"use strict";
setInterval(() => {
    $my_lom_dom_context.document.documentElement.setAttribute('my_lom_theme', new Date().getSeconds() < 30 ? 'light' : 'dark');
}, 1_000);
//my/lom/theme/theme.ts

//# sourceMappingURL=web.js.map

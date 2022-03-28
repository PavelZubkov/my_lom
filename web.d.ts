declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare let $my_lom_dom_context: typeof globalThis;

declare function $my_lom_dom_render(node: Element | DocumentFragment, children: NodeList | Array<Node | string | null>): void;

declare class $my_lom_view {
    static root: () => typeof $my_lom_view;
    static mount(): void;
    dom_name(): string;
    attr(): {
        [key: string]: string | number | boolean | null;
    };
    event(): {
        [key: string]: (e: Event) => any;
    };
    field(): {
        [key: string]: any;
    };
    sub(): Array<$my_lom_view | Node | string | number | boolean>;
    _dom_node: Element;
    dom_node(): Element;
    dom_node_actual(): Element;
    dom_tree(): Element;
}

declare class $my_lom_button extends $my_lom_view {
    dom_name(): string;
    title(): string;
    click(e: Event): void;
    sub(): string[];
    event(): {
        click: (e: Event) => void;
    };
}
declare class $my_lom_button_minor extends $my_lom_button {
    attr(): {
        $my_lom_button_minor: boolean;
    };
}

declare class $my_lom_input extends $my_lom_view {
    dom_name(): string;
    type(): string;
    _value: string;
    value(next?: string): string;
    event_change(e: Event): void;
    field(): {
        value: string;
    };
    attr(): {
        type: string;
    };
    event(): {
        input: (e: Event) => void;
    };
}

declare class $my_lom_storage {
    static value<Value>(key: string, next?: Value): any;
}

export = $;
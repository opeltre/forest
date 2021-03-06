/*** mirror an input element ***/

vv('div.example')
    .branch([
        vv('h2')
            .html('input example'),
        vv('input')
            .on(
                'input', 
                vv.emit('type', input => input.value)
            ),
        vv('div')
            .up(
                'type', 
                (data, Model) => ({txt: data})
            )
            .branch([
                vv('span')
                    .html(
                        Model => { 
                            let n=Model.txt.length;
                            return `${n} letter${n <= 1 ? '' : 's'}: `;
                        }
                    ),
                vv('span')
                    .html(
                        Model => Model.txt.fontcolor('#b8a')
                    )
            ])
            
    ])
    .plant('#examples')
    .start('dom', {txt: ''});

/*

vnode.branch : 
    (Array [vnode]) -> link children nodes

vnode.plant : 
    (selector) -> select the destination DOM parent node. 

vnode.start : 
    (name, [Model={}, append=true]) -> plan DOM action
        + name: string
            - 'now', 'dom' 
            - name of a `vv.emit` event
        + Model: object <{}>
            - passed as argument to most methods
        + append: bool <true>
            è whether to append the constructed documentFragment

vnode.up : 
    (name, update, [redraw=true]) -> update the model &&? the view
        + name: string
            - name of a `vv.emit` event
        + update: (data, Model) -> object
            - model properties to updated, w/ respect to event data.
        + redraw: bool <true>
            - whether to replace the DOM node with a new one.

vv.emit : 
    (name, [data]) -> eventListener emitting a CustomEvent on the whole document.
        + name: string
            - the created CustomEvent will bear the full name 'vv#name'
        + data: object || eventTarget => object
            - detail of the CustomEvent to generate
*/

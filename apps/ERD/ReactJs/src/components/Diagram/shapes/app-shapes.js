/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2022 client IO

 2023-03-13 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import * as joint from '@clientio/rappid';

export var app;

const cache = new Map();
(function(app) {

    class CircularModel extends joint.shapes.standard.Ellipse {
        constructor() {
            super(...arguments);

            this.portLabelMarkup = [{
                tagName: 'text',
                selector: 'portLabel'
            }];
        }

        defaults() {

            return joint.util.defaultsDeep({
                type: 'app.CircularModel',
                attrs: {
                    root: {
                        magnet: false
                    }
                },
                ports: {
                    groups: {
                        'in': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 10
                                }
                            }],
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    fill: '#61549c',
                                    strokeWidth: 0
                                },
                                portLabel: {
                                    fontSize: 11,
                                    fill: '#61549c',
                                    fontWeight: 800
                                }
                            },
                            position: {
                                name: 'ellipse',
                                args: {
                                    startAngle: 0,
                                    step: 30
                                }
                            },
                            label: {
                                position: {
                                    name: 'radial',
                                    args: null
                                }
                            }
                        },
                        'out': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 10
                                }
                            }],
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    fill: '#61549c',
                                    strokeWidth: 0
                                },
                                portLabel: {
                                    fontSize: 11,
                                    fill: '#61549c',
                                    fontWeight: 800
                                }
                            },
                            position: {
                                name: 'ellipse',
                                args: {
                                    startAngle: 180,
                                    step: 30
                                }
                            },
                            label: {
                                position: {
                                    name: 'radial',
                                    args: null
                                }
                            }
                        }
                    }
                }
            }, joint.shapes.standard.Ellipse.prototype.defaults);
        }
    }
    app.CircularModel = CircularModel;

    class RectangularModel extends joint.shapes.standard.Rectangle {
        constructor() {
            super(...arguments);

            this.portLabelMarkup = [{
                tagName: 'text',
                selector: 'portLabel'
            }];
        }

        defaults() {

            return joint.util.defaultsDeep({
                type: 'app.RectangularModel',
                attrs: {
                    root: {
                        magnet: false
                    }
                },
                ports: {
                    groups: {
                        'in': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 10
                                }
                            }],
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    fill: '#61549c',
                                    strokeWidth: 0
                                },
                                portLabel: {
                                    fontSize: 11,
                                    fill: '#61549c',
                                    fontWeight: 800
                                }
                            },
                            position: {
                                name: 'left'
                            },
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 0
                                    }
                                }
                            }
                        },
                        'out': {
                            markup: [{
                                tagName: 'circle',
                                selector: 'portBody',
                                attributes: {
                                    'r': 10
                                }
                            }],
                            position: {
                                name: 'right'
                            },
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    fill: '#61549c',
                                    strokeWidth: 0
                                },
                                portLabel: {
                                    fontSize: 11,
                                    fill: '#61549c',
                                    fontWeight: 800
                                }
                            },
                            label: {
                                position: {
                                    name: 'right',
                                    args: {
                                        y: 0
                                    }
                                }
                            }
                        }
                    }
                }
            }, joint.shapes.standard.Rectangle.prototype.defaults);
        }
    }
    app.RectangularModel = RectangularModel;

    const getDataWidthCached = function(d) {
        if (cache.has(d)) {
            return cache.get(d);
        } else {
            const bbox = (new joint.g.Path(d)).bbox();
            cache.set(d, bbox ? bbox.width : 0);
            return cache.get(d);
        }
    };

    class Link extends joint.shapes.standard.Link {
        constructor() {
            super(...arguments);

            this.defaultLabel = {
                attrs: {
                    rect: {
                        fill: '#ffffff',
                        stroke: '#8f8f8f',
                        strokeWidth: 1,
                        width: 'calc(w + 10)',
                        height: 'calc(h + 10)',
                        x: -5,
                        y: -5
                    }
                }
            };
        }

        static connectionPoint(line, view, magnet, opt, type, linkView) {
            const link = linkView.model;
            const markerWidth = (link.get('type') === 'app.Link') ? link.getMarkerWidth(type) : 0;
            opt = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            const modelType = view.model.get('type');
            if (modelType.indexOf('uml') === 0) {
                opt.selector = 'root';
            }
            // taking the border stroke-width into account
            if (modelType === 'standard.InscribedImage') {
                opt.selector = 'border';
            }
            return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
        }

        defaults() {
            return joint.util.defaultsDeep({
                type: 'app.Link',
                router: {
                    name: 'normal'
                },
                connector: {
                    name: 'rounded'
                },
                labels: [],
                attrs: {
                    line: {
                        stroke: '#8f8f8f',
                        strokeDasharray: '0',
                        strokeWidth: 2,
                        fill: 'none',
                        sourceMarker: {
                            type: 'path',
                            d: 'M 0 0 0 0',
                            stroke: 'none'
                        },
                        targetMarker: {
                            type: 'path',
                            d: 'M 0 -5 -10 0 0 5 z',
                            stroke: 'none'
                        }
                    }
                }
            }, joint.shapes.standard.Link.prototype.defaults);
        }

        getMarkerWidth(type) {
            const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
            return this.getDataWidth(d);
        }

        getDataWidth(d) {
            return getDataWidthCached(d);
        }
    }
    app.Link = Link;
})(app || (app = {}));

export const NavigatorElementView = joint.dia.ElementView.extend({

    body: null,

    markup: [{
        tagName: 'rect',
        selector: 'body',
        attributes: {
            'fill': '#31d0c6'
        }
    }],

    initFlag: ['RENDER', 'UPDATE', 'TRANSFORM'],

    presentationAttributes: {
        size: ['UPDATE'],
        position: ['TRANSFORM'],
        angle: ['TRANSFORM']
    },

    confirmUpdate: function(flags) {

        if (this.hasFlag(flags, 'RENDER')) {
            this.render();
        }
        if (this.hasFlag(flags, 'UPDATE')) {
            this.update();
        }
        if (this.hasFlag(flags, 'TRANSFORM')) {
            this.updateTransformation();
        }
    },

    render: function() {
        const { fragment, selectors: { body }} = joint.util.parseDOMJSON(this.markup);
        this.body = body;
        this.el.appendChild(fragment);
    },

    update: function() {
        const { model, body } = this;
        const { width, height } = model.size();
        body.setAttribute('width', width);
        body.setAttribute('height', height);
    }
});


export const NavigatorLinkView = joint.dia.LinkView.extend({

    initialize: joint.util.noop,

    render: joint.util.noop,

    update: joint.util.noop
});

// re-export build-in shapes from rappid
export const basic = joint.shapes.basic;
export const standard = joint.shapes.standard;
export const fsa = joint.shapes.fsa;
export const pn = joint.shapes.pn;
export const erd = joint.shapes.erd;
export const uml = joint.shapes.uml;
export const org = joint.shapes.org;


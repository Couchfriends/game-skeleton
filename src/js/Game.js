var Game = {

    VERSION: '0.0.1',

    _renderer: {},
    _stage: {},

    init: function () {

        if (typeof PIXI == 'undefined') {
            console.warn('PIXI not found.');
            return false;
        }
        this._renderer = PIXI.autoDetectRenderer();
        this._renderer.autoResize = true;
        this._renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.view);
        this._stage = new PIXI.Container(); // Pixi stage
        this.objects = []; // List of elements
        this.state = 'run';
        this.update();

    },

    update: function (time) {

        requestAnimationFrame(this.update.bind(this));

        this[this.state]();

        this._renderer.render(this._stage);

    },

    run: function (time) {
    }

};
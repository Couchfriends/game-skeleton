var Game = {

    VERSION: '0.0.1',

    _renderer: {},
    _stage: {},

    /**
     * List with all objects
     */
    object: [],

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
        this.state = 'loading';
        PIXI.loader.add('assets/images/ship.png');
        PIXI.loader.load(this.setup.bind(this));
        this.update();

    },

    setup: function() {

        var tower = new Game.TowerSlow();
        this.state = 'run';
        console.log(tower);
        this._stage.addChild(tower);
    },

    update: function (time) {

        requestAnimationFrame(this.update.bind(this));

        this[this.state]();

        this._renderer.render(this._stage);

    },

    loading: function () {
        console.log('Loading... ' + PIXI.loader.progress + '%');
    },

    run: function (time) {
        console.log('Running...');
    }

};
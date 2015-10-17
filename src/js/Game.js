var Game = {

    VERSION: '0.0.1',

    _renderer: {},

    /**
     * @param Array list with different scenes
     */
    scenes: {
        menu: {},
        loading: {},
        game: {}
    },
    state: 'run', // Current stage of the game e.g. 'run'|'pause'

    /**
     * Options for the game
     */
    settings: {
        /**
         * Resolution where the game is original build for. Used to calculate
         * the new resolution on different devices.
         */
        width: 1920,
        height: 1080,
        render: {
            autoResize: true
        }
    },

    /**
     * List with all objects
     */
    object: [],

    init: function () {

        if (typeof PIXI == 'undefined') {
            console.warn('PIXI not found.');
            return false;
        }

        this.settings.centerX = this.settings.width / 2;
        this.settings.centerY = this.settings.height / 2;

        PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
        this._renderer = PIXI.autoDetectRenderer(
            this.settings.width,
            this.settings.height,
            this.settings.render
        );
        document.body.appendChild(this._renderer.view);
        window.addEventListener('resize', Game.resize.bind(this));

        this.scenes.menu = new PIXI.Container(); // Menu
        this.scenes.game = new PIXI.Container(); // In game
        this.scenes.loading = new PIXI.Container(); // Loading scene
        this.scenes.game.visible = this.scenes.loading.visible = this.scenes.menu.visible = true;

        this.Menu.init();

        this.resize();
        this.update();

    },

    /**
     * Callback when screen resolution or orientation changed.
     */
    resize: function () {

        this._renderer.resize(
            this.settings.width,
            this.settings.height
        );
        // Resize to maximum resolution
        var widthToHeight = this.settings.width / this.settings.height;

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            this._renderer.view.style.height = newHeight + 'px';
            this._renderer.view.style.width = newWidth + 'px';
        } else { // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            this._renderer.view.style.width = newWidth + 'px';
            this._renderer.view.style.height = newHeight + 'px';
        }

        this._renderer.view.style.marginTop = -(newHeight / 2) + 'px';
        this._renderer.view.style.marginLeft = -(newWidth / 2) + 'px';

    },

    setup: function () {

        var tower = new Game.TowerSlow();
        this.state = 'run';
        tower.add();
    },

    /**
     * The absolute main render. Requests another animation frame and execture
     * the current this.state() function.
     * @param time
     */
    update: function (time) {

        requestAnimationFrame(this.update.bind(this));
        this[this.state]();

    },

    load: function (assets, callback) {

        this.state = 'loading';
        PIXI.loader.add(assets);
        PIXI.loader.load(function () {
            Game.state = 'run';
            if (typeof callback == 'function') {
                callback();
            }
        });

    },

    loading: function () {
        console.log('Loading... ' + PIXI.loader.progress + '%');
    },

    run: function (time) {

        this._renderer.render(this.scene);

    },

    /**
     * Set the scene to render
     */
    showScene: function (scene) {

        scene = scene || 'game';
        this.scene = this.scenes[scene];

    }

};
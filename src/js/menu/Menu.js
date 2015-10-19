/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Couchfriends
 * www.couchfriends.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Game.Menu = {


    initialized: false,

    /**
     * Window where information can be put
     */
    window: {},

    init: function() {

        if (this.initialized == true) {
            return this.setup();
        }
        var assets = [
            'assets/images/ui/button-normal.png',
            'assets/images/ui/button-active.png',
            'assets/audio/effects/button-hover.ogg',
            'assets/audio/effects/button-activate.ogg',
            'assets/images/ui/button-close.png',
            'assets/images/ui/window-background.png'
        ];
        Game.load(assets, this.setup.bind(this));
    },

    setup: function() {

        Game.clearScene('menu');

        var top = 50;
        var play = new Game.Button({
            label: 'Play'
        });
        play.position.x = Game.settings.center.x;
        play.position.y = top;
        play.add();

        top += 55;

        var credits = new Game.Button({
            label: 'Credits'
        });
        credits.position.x = Game.settings.center.x;
        credits.position.y = top;
        credits.activate = function() {
            Game.Menu.window.show('Credits\n\nMathieu de Ruiter\nwww.couchfriends.com');
        };
        credits.add();

        this.window = new Game.Window('window');
        this.window.add();

        this.show();
    },

    show: function () {

        Game.showScene('menu');

    }
};
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

/**
 * Global Element for all in game objects. Every object should extend from this
 * class.
 * @constructor
 */
Game.Element = function() {

    this.name = '';

};

Game.Element.prototype = {

    /**
     * Render function. Returns false if object is not allowed to update or
     * render.
     * @param time
     */
    update: function (time) {

        return true;

    },

    add: function () {

        this.object.Element = this;
        Game.objects.push(this);
        if (this.object != null) {
            Game.stage.addChild(this.object);
        }
    },

    remove: function() {

        if (this.object != null) {
            Game.stage.removeChild(this.object);
        }
        var indexOf = Game.objects.indexOf(this);
        Game.objects.splice(indexOf, 1);

    }

};
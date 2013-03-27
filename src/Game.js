define(["require", "exports", "core/World", "core/utils/Logger"], function(require, exports, __MWorld__, __MLogger__) {
    var MWorld = __MWorld__;

    var MLogger = __MLogger__;

    
    var Game = (function () {
        function Game() {
            this.delta = 10;
            MLogger.Logger.message("construct a logger");
            this.world = new MWorld.World();
            //this.world.setSystem(new MMovementSystem.MovementSystem());
            //this.world.setSystem(new RotationSystem());
            //this.world.setSystem(new RenderingSystem());
            this.world.initialize();
            //while (true) {
            //    //this.world.setDelta(this.delta);
            //    this.world.process();
            //}
                    }
        return Game;
    })();
    exports.Game = Game;    
})
//@ sourceMappingURL=Game.js.map

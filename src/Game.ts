import MWorld = module("core/World");
import MLogger = module("core/utils/Logger");

import MMovementSystem = module("public/systems/MovementSystem");

export class Game {

        public world: MWorld.World;
        public delta: number = 10;

        constructor() {
            
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

    }

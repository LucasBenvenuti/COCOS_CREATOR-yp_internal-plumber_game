import { _decorator, Component, Node, Collider, ITriggerEvent, ParticleSystemComponent } from 'cc';
import { Pipe_Behavior } from './Pipe_Behavior';
import { PlumberGameController } from './PlumberGameController';
const { ccclass, property } = _decorator;

@ccclass('PipeCollider_Behavior')
export class PipeCollider_Behavior extends Component {
    
    @property(Pipe_Behavior)
    pipeBehavior: Pipe_Behavior = null!;

    @property(Boolean)
    isNormalDirection: Boolean = false;

    @property(Boolean)
    isStartPipe: Boolean = false;

    @property(Boolean)
    isLastPipe: Boolean = false;

    pipe_Collision: PipeCollider_Behavior = null!;

    @property(ParticleSystemComponent)
    particles: ParticleSystemComponent = null!;

    onLoad () {
        var self = this;
        
        if(self.pipeBehavior)
        {
            if(self.isNormalDirection)
            {   
                self.pipeBehavior.normalPipeCollider = self;
            }
            else
            {
                self.pipeBehavior.invertedPipeCollider = self;
            }
        }
        else
        {
            console.log("PIPE_BEHAVIOR NOT SETTED...");
        }

        self.particles = self.node.getComponentInChildren(ParticleSystemComponent);

        console.log(self.particles);

        let collider = self.getComponent(Collider);
        if (collider) {
            collider.on("onTriggerEnter", self.onTriggerEnter, self);
            collider.on("onTriggerStay", self.onTriggerStay, self);
            collider.on("onTriggerExit", self.onTriggerExit, self);
        }
    }

    private onTriggerEnter(event: ITriggerEvent) {
        var self = this;

        let otherPipe = event.otherCollider.getComponent(PipeCollider_Behavior);

        self.pipe_Collision = otherPipe;
    }

    private onTriggerStay(event: ITriggerEvent) {
    }
        
    private onTriggerExit(event: ITriggerEvent) {
        var self = this;

        self.pipe_Collision = null;
    }

    startPipeAnimation() {
        var self = this;

        self.pipeBehavior.canBeTouched = false;

        if(self.pipeBehavior.pathID == 0)
        {
            PlumberGameController.instance.currentPipeCollision = self;
        }
        else if(self.pipeBehavior.pathID == 1)
        {
            PlumberGameController.instance.currentPipeCollision_2 = self;
        }

        self.changeAnimSpeed();

        if(self.isNormalDirection)
        {
            console.log("Started NormalDirection animation");

            //START HERE NORMAL ANIMATION
            if(self.pipeBehavior.pipeIsCurved)
            {
                self.pipeBehavior.anim.play("CurvedPiece_Flux_Normal");
            }
            else
            {
                self.pipeBehavior.anim.play("StraightPiece_Flux_Normal");
            }
        }
        else
        {
            console.log("Started InvertedDirection animation");

            //START HERE INVERTED ANIMATION
            if(self.pipeBehavior.pipeIsCurved)
            {
                self.pipeBehavior.anim.play("CurvedPiece_Flux_Inverted");
            }
            else
            {
                self.pipeBehavior.anim.play("StraightPiece_Flux_Inverted");
            }
        }
    }

    changeAnimSpeed() {
        var self = this;
        let speed = PlumberGameController.instance.animationSpeed;

        if(self.isNormalDirection)
        {
            if(self.pipeBehavior.pipeIsCurved)
            {
                self.pipeBehavior.anim.getState("CurvedPiece_Flux_Normal").speed = speed;
            }
            else
            {
                self.pipeBehavior.anim.getState("StraightPiece_Flux_Normal").speed = speed;
            }
        }
        else
        {
            if(self.pipeBehavior.pipeIsCurved)
            {
                self.pipeBehavior.anim.getState("CurvedPiece_Flux_Inverted").speed = speed;
            }
            else
            {
                self.pipeBehavior.anim.getState("StraightPiece_Flux_Inverted").speed = speed;
            }
        }
    }
}
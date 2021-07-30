import { _decorator, Component, Node, EventTouch, tween, Quat, CCFloat, Vec3, AnimationComponent } from 'cc';
import { AudioController } from './AudioController';
import { PipeCollider_Behavior } from './PipeCollider_Behavior';
import { PlumberGameController } from './PlumberGameController';

const { ccclass, property } = _decorator;

@ccclass('Pipe_Behavior')
export class Pipe_Behavior extends Component {

    @property(AnimationComponent)
    anim: AnimationComponent = null!;

    @property(Boolean)
    pipeIsCurved: Boolean = false;

    @property(Boolean)
    firstPipe: Boolean = false;

    @property(Boolean)
    lastPipe: Boolean = false;

    @property(Number)
    pathID: number = 0;

    indexOnPlumberGameControllerArray = 0;

    canBeTouched = true;

    startPipeCollider: PipeCollider_Behavior = null!;
    lastPipeCollider: PipeCollider_Behavior = null!;

    //FOR INTERNAL USE
    normalPipeCollider: PipeCollider_Behavior = null!;
    invertedPipeCollider: PipeCollider_Behavior = null!;

    onLoad () {
        var self = this;

        if(self.firstPipe)
            self.startPipeCollider = self.node.getComponentInChildren(PipeCollider_Behavior);

        if(self.lastPipe)
            self.lastPipeCollider = self.node.getComponentInChildren(PipeCollider_Behavior);

        self.node.on(Node.EventType.TOUCH_START, (event: EventTouch)=> {
            self.rotatePiece();
        }, self);
    }

    rotatePiece() {
        var self = this;

        if(!self.canBeTouched)
            return;

        self.canBeTouched = false;

        let currentRotation = new Vec3(self.node.eulerAngles);
        let goToRotation_Z = new Vec3(currentRotation.x, currentRotation.y, currentRotation.z - 90);

        AudioController.instance.playAudioSource(3);

        tween(currentRotation).to(0.5, goToRotation_Z, {
            easing: "cubicInOut",
            "onUpdate": (currentValue: Vec3)=> {
                self.node.setRotationFromEuler(currentValue);
            },
            "onComplete": ()=> {
                self.canBeTouched = true;
            },
        }).start();
    }

    //ONLY CALLED ON FIRST PIPE
    plumberStart() {
        var self = this;

        if(!self.firstPipe || !self.startPipeCollider)
            return;

        self.canBeTouched = false;

        if(self.startPipeCollider.pipe_Collision)
        {
            self.startPipeCollider.pipe_Collision.startPipeAnimation();
        }
        else
        {
            self.startPipeCollider.particles.play();
            PlumberGameController.instance.endPlumber(false);
        }
    }

    plumberInternalEnd_Normal() {
        var self = this;

        //console.log("NORMAL - FINISHED FRAMES - FUNCTION CALLED BY ANIMATION EVENT");

        if(self.invertedPipeCollider.pipe_Collision)
        {
            let invertedPipe = self.invertedPipeCollider.pipe_Collision;

            if(invertedPipe.isLastPipe)
            {
                invertedPipe.pipeBehavior.canBeTouched = false;

                if(self.pathID == 0)
                {
                    PlumberGameController.instance.plumber_Completed = true;
                }
                else if(self.pathID == 1)
                {
                    PlumberGameController.instance.plumber_2_Completed = true;
                }

                PlumberGameController.instance.endPlumber(true);
            }
            else
            {
                //console.log("CONTINUE HERE WITH INVERTED!!!!");
                self.invertedPipeCollider.pipe_Collision.startPipeAnimation();
            }
            AudioController.instance.playAudioSource(4);
        }
        else
        {
            self.invertedPipeCollider.particles.play();
            PlumberGameController.instance.endPlumber(false);
        }
    }
    
    plumberInternalEnd_Inverted() {
        var self = this;
        
        //console.log("INVERTED - FINISHED FRAMES - FUNCTION CALLED BY ANIMATION EVENT");
        
        if(self.normalPipeCollider.pipe_Collision)
        {
            let normalPipe = self.normalPipeCollider.pipe_Collision;
            
            if(normalPipe.isLastPipe)
            {
                normalPipe.pipeBehavior.canBeTouched = false;
                
                if(self.pathID == 0)
                {
                    PlumberGameController.instance.plumber_Completed = true;
                }
                else if(self.pathID == 1)
                {
                    PlumberGameController.instance.plumber_2_Completed = true;
                }
                
                PlumberGameController.instance.endPlumber(true);
            }
            else
            {                
                //console.log("CONTINUE HERE WITH NORMAL!!!!");
                self.normalPipeCollider.pipe_Collision.startPipeAnimation();
            }
            AudioController.instance.playAudioSource(4);
        }
        else
        {
            self.normalPipeCollider.particles.play();
            PlumberGameController.instance.endPlumber(false);
        }
    }
}
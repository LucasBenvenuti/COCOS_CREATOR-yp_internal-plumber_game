
import { _decorator, Component, Node, BlockInputEvents, AnimationState, AnimationComponent, AnimationClip } from 'cc';
import { PipeCollider_Behavior } from './PipeCollider_Behavior';
import { Pipe_Behavior } from './Pipe_Behavior';
const { ccclass, property } = _decorator;

@ccclass('PlumberGameController')
export class PlumberGameController extends Component {

    public static instance : PlumberGameController =  null;

    @property(Pipe_Behavior)
    plumberStartPipe: Pipe_Behavior = null!;

    @property(Pipe_Behavior)
    plumberLastPipe: Pipe_Behavior = null!;

    @property(BlockInputEvents)
    blockInputEvents_box: BlockInputEvents = null!;

    @property([AnimationClip])
    animationClipArray: AnimationClip[] = [];

    plumberAlreadyStarted = false;

    animationSpeed = 0.25;

    currentPipeCollision: PipeCollider_Behavior;

    onLoad() {
        var self = this;

        if(PlumberGameController.instance != null && PlumberGameController.instance != self){
            self.destroy();
        }else{
            PlumberGameController.instance = self;
        }

        self.blockInputEvents_box.enabled = false;
    }

    //USE THIS FUNCTION WHEN TIMER IS 0
    startPlumberWhenTimerGoesZero() {
        var self = this;

        console.log("CALL THIS FUNCTION ON TIMER!")

        if(self.plumberAlreadyStarted)
            return;

        if(self.plumberStartPipe)
        {
            self.animationSpeed = 0.25;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();

            self.plumberAlreadyStarted = true;
            self.plumberStartPipe.plumberStart();
        }
        else
        {
            console.log("Plumber start piece null!");
        }
    }

    //USE THIS FUNCTION ON PLAY BUTTON
    startPlumberWithGoButton() {
        var self = this;

        if(self.plumberStartPipe)
        {
            self.blockInputEvents_box.enabled = true;
            self.animationSpeed = 1;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();

            if(!self.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                console.log("STOP HERE THE TIMER");

                self.plumberAlreadyStarted = true;
                self.plumberStartPipe.plumberStart();
            }
        }
        else
        {
            console.log("Plumber start piece null!");
        }
    }

    endPlumber(win: Boolean) {
        var self = this;

        self.blockInputEvents_box.enabled = true;

        if(win)
        {
            console.log("WIN!");
        }
        else
        {
            console.log("LOSE...");
        }
    }
}

import { _decorator, Component, Node, BlockInputEvents, AnimationState, AnimationComponent, AnimationClip, AudioSource } from 'cc';
import { PipeCollider_Behavior } from './PipeCollider_Behavior';
import { Pipe_Behavior } from './Pipe_Behavior';
const { ccclass, property } = _decorator;

@ccclass('PlumberGameController')
export class PlumberGameController extends Component {

    public static instance : PlumberGameController =  null;

    @property(Node)
    plumberStartPipeNode: Node = null!;

    @property(Node)
    plumberStartPipeNode_2: Node = null!;

    @property(BlockInputEvents)
    blockInputEvents_box: BlockInputEvents = null!;

    // @property(AudioSource)

    plumberAlreadyStarted = false;

    plumberStartPipe: Pipe_Behavior = null!;
    plumberStartPipe_2: Pipe_Behavior = null!;

    currentPipeCollision: PipeCollider_Behavior = null!;
    currentPipeCollision_2: PipeCollider_Behavior = null!;

    plumber_Completed = false;
    plumber_2_Completed = false;

    gameIsRunning = true;

    animationSpeed = 0.25;

    onLoad() {
        var self = this;

        if(PlumberGameController.instance != null && PlumberGameController.instance != self){
            self.destroy();
        }else{
            PlumberGameController.instance = self;
        }

        if(self.plumberStartPipeNode)
            self.plumberStartPipe = self.plumberStartPipeNode.getComponent(Pipe_Behavior);

        if(self.plumberStartPipeNode_2)
            self.plumberStartPipe_2 = self.plumberStartPipeNode_2.getComponent(Pipe_Behavior);

        self.blockInputEvents_box.enabled = false;
    }

    startPlumberWhenTimerGoesZero() {
        var self = this;

        console.log("CALL THIS FUNCTION ON TIMER!")

        if(self.plumberAlreadyStarted)
            return;

        if(!self.gameIsRunning)
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

        if(self.plumberStartPipe_2)
        {
            self.animationSpeed = 0.25;

            if(self.currentPipeCollision_2)
                self.currentPipeCollision_2.changeAnimSpeed();

            self.plumberAlreadyStarted = true;

            self.plumberStartPipe_2.plumberStart();
        }
        else
        {
            console.log("Plumber start piece null!");
        }
    }

    startPlumberWithGoButton() {
        var self = this;

        if(!self.gameIsRunning)
            return;

        if(self.plumberStartPipe)
        {
            self.blockInputEvents_box.enabled = true;

            self.animationSpeed = 2;

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

        if(self.plumberStartPipe_2)
        {
            self.blockInputEvents_box.enabled = true;

            self.animationSpeed = 2;

            if(self.currentPipeCollision_2)
                self.currentPipeCollision_2.changeAnimSpeed();

            if(!self.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                console.log("STOP HERE THE TIMER");

                self.plumberAlreadyStarted = true;

                self.plumberStartPipe_2.plumberStart();
            }
        }
        else
        {
            console.log("Plumber start piece null!");
        }
    }

    endPlumber(win: Boolean) {
        var self = this;

        if(win)
        {
            if(self.plumberStartPipe && !self.plumberStartPipe_2)
            {
                if(self.plumber_Completed)
                {
                    self.blockInputEvents_box.enabled = true;

                    self.gameIsRunning = false;
    
                    console.log("WIN!");
                }
                else
                {
                    console.log("NOT COMPLETED YET...");
                }
            }

            if(self.plumberStartPipe_2)
            {
                if(self.plumber_Completed && self.plumber_2_Completed)
                {
                    self.blockInputEvents_box.enabled = true;

                    self.gameIsRunning = false;
    
                    console.log("WIN!");
                }
                else
                {
                    console.log("WAIT OTHER PLUMBER TO COMPLETE!");
                }
            }

        }
        else
        {
            self.blockInputEvents_box.enabled = true;

            self.animationSpeed = 0;

            self.gameIsRunning = false;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();
            
            if(self.currentPipeCollision_2)
                self.currentPipeCollision_2.changeAnimSpeed();

            console.log("LOSE...");
        }
    }
}
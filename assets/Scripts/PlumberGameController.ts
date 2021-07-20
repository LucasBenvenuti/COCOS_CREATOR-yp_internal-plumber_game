
import { _decorator, Component, Node, BlockInputEvents, AnimationState, AnimationComponent, AnimationClip, AudioSource } from 'cc';
import { DataController } from './DataController';
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

    @property([Node])
    plumberStartPipeArray: Node[] = [];

    @property([Node])
    plumberStartPipeArray_2: Node[] = [];

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
        
        PlumberGameController.instance = self;
        // if(PlumberGameController.instance != null && PlumberGameController.instance != self){
        //         self.destroy();
        //  }else{
        
        // }
        self.plumberStartPipeNode = self.plumberStartPipeArray[DataController.instance.levelIndex];
        //self.plumberStartPipeNode = self.plumberStartPipeArray[DataController.instance.levelIndex];
        
        if(self.plumberStartPipeNode)
             self.plumberStartPipe = self.plumberStartPipeNode.getComponent(Pipe_Behavior);
        
        if(self.plumberStartPipeNode_2[DataController.instance.levelIndex]){
            self.plumberStartPipe_2 = self.plumberStartPipe_2[DataController.instance.levelIndex];
        }

        // if(self.plumberStartPipeNode_2)
        //     self.plumberStartPipe_2 = self.plumberStartPipeNode_2.getComponent(Pipe_Behavior);

        self.blockInputEvents_box.enabled = false;
    }

    startPlumberWhenTimerGoesZero() {
        var self = this;

        console.log("CALL THIS FUNCTION ON TIMER!")

        if(self.plumberAlreadyStarted)
            return;

        if(!self.gameIsRunning)
            return;

        if(PlumberGameController.instance.plumberStartPipe)
        {
            PlumberGameController.instance.animationSpeed = 0.25;

            if(PlumberGameController.instance.currentPipeCollision)
                PlumberGameController.instance.currentPipeCollision.changeAnimSpeed();

            PlumberGameController.instance.plumberAlreadyStarted = true;

            PlumberGameController.instance.plumberStartPipe.plumberStart();
        }
        else
        {
            console.log("1Plumber start piece null!");
        }

        if(PlumberGameController.instance.plumberStartPipe_2)
        {
            PlumberGameController.instance.animationSpeed = 0.25;

            if(PlumberGameController.instance.currentPipeCollision_2)
                PlumberGameController.instance.currentPipeCollision_2.changeAnimSpeed();

            PlumberGameController.instance.plumberAlreadyStarted = true;

            PlumberGameController.instance.plumberStartPipe_2.plumberStart();
        }
        else
        {
            console.log("2Plumber start piece 2 null!");
        }
    }

    startPlumberWithGoButton() {
        var self = this;

        if(!self.gameIsRunning)
            return;

        console.log(self.plumberStartPipe);
        console.log(PlumberGameController.instance.plumberStartPipe);
        if(PlumberGameController.instance.plumberStartPipe)
        {
            PlumberGameController.instance.blockInputEvents_box.enabled = true;

            PlumberGameController.instance.animationSpeed = 2;

            if(PlumberGameController.instance.currentPipeCollision)
                PlumberGameController.instance.currentPipeCollision.changeAnimSpeed();

            if(!PlumberGameController.instance.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                console.log("STOP HERE THE TIMER");

                //self.plumberAlreadyStarted = true;
                PlumberGameController.instance.plumberAlreadyStarted = true;

                PlumberGameController.instance.plumberStartPipe.plumberStart();
            }
        }
        else
        {
            console.log("3Plumber start piece null!");
        }

        if(PlumberGameController.instance.plumberStartPipe_2)
        {
            PlumberGameController.instance.blockInputEvents_box.enabled = true;

            PlumberGameController.instance.animationSpeed = 2;

            if(PlumberGameController.instance.currentPipeCollision_2)
                PlumberGameController.instance.currentPipeCollision_2.changeAnimSpeed();

            if(!PlumberGameController.instance.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                console.log("STOP HERE THE TIMER");

                PlumberGameController.instance.plumberAlreadyStarted = true;

                PlumberGameController.instance.plumberStartPipe_2.plumberStart();
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
            // if(self.plumberStartPipe && !self.plumberStartPipe_2)
            // {
            //     if(self.plumber_Completed)
            //     {
            //         self.blockInputEvents_box.enabled = true;

            //         self.gameIsRunning = false;
    
            //         console.log("WIN!");
            //     }
            //     else
            //     {
            //         console.log("NOT COMPLETED YET...");
            //     }
            // }
            if(PlumberGameController.instance.plumberStartPipe && !PlumberGameController.instance.plumberStartPipe_2)
            {
                if(PlumberGameController.instance.plumber_Completed)
                {
                    PlumberGameController.instance.blockInputEvents_box.enabled = true;

                    PlumberGameController.instance.gameIsRunning = false;
    
                    console.log("WIN!");
                }
                else
                {
                    console.log("NOT COMPLETED YET...");
                }
            }

            // if(self.plumberStartPipe_2)
            // {
            //     if(self.plumber_Completed && self.plumber_2_Completed)
            //     {
            //         self.blockInputEvents_box.enabled = true;

            //         self.gameIsRunning = false;
    
            //         console.log("WIN!");
            //     }
            //     else
            //     {
            //         console.log("WAIT OTHER PLUMBER TO COMPLETE!");
            //     }
            // }
            if(PlumberGameController.instance.plumberStartPipe_2)
            {
                if(PlumberGameController.instance.plumber_Completed && PlumberGameController.instance.plumber_2_Completed)
                {
                    PlumberGameController.instance.blockInputEvents_box.enabled = true;

                    PlumberGameController.instance.gameIsRunning = false;
    
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
            PlumberGameController.instance.blockInputEvents_box.enabled = true;

            PlumberGameController.instance.animationSpeed = 0;

            PlumberGameController.instance.gameIsRunning = false;

            if(PlumberGameController.instance.currentPipeCollision)
                PlumberGameController.instance.currentPipeCollision.changeAnimSpeed();
            
            if(PlumberGameController.instance.currentPipeCollision_2)
                PlumberGameController.instance.currentPipeCollision_2.changeAnimSpeed();

            console.log("LOSE...");
        }
    }
}
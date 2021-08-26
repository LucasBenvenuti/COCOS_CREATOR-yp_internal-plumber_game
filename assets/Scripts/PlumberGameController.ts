
import { _decorator, Component, Node, BlockInputEvents, AnimationState, AnimationComponent, AnimationClip, AudioSource, ParticleSystemComponent } from 'cc';
import { AudioController } from './AudioController';
import { DataController } from './DataController';
import { FeedbackController } from './FeedbackController';
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

    @property(AnimationComponent)
    truckAnimation: AnimationComponent;

    @property(ParticleSystemComponent)
    truckParticles: ParticleSystemComponent = null!;


    @property(BlockInputEvents)
    blockInputEvents_box: BlockInputEvents = null!;

    @property(FeedbackController)
    feedBackController: FeedbackController;
    // @property(AudioSource)

    plumberAlreadyStarted = false;

    plumberStartPipe: Pipe_Behavior = null!;
    plumberStartPipe_2: Pipe_Behavior = null!;

    currentPipeCollision: PipeCollider_Behavior = null!;
    currentPipeCollision_2: PipeCollider_Behavior = null!;

    plumber_Completed = false;
    plumber_2_Completed = false;

    gameIsRunning = true;

    animationSpeed = 1.8;

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
        
        if(self.plumberStartPipeArray_2[DataController.instance.levelIndex]){
            self.plumberStartPipeNode_2 = self.plumberStartPipeArray_2[DataController.instance.levelIndex];
        }

         if(self.plumberStartPipeNode_2)
             self.plumberStartPipe_2 = self.plumberStartPipeNode_2.getComponent(Pipe_Behavior);

        self.blockInputEvents_box.enabled = false;
    }

    startPlumberWhenTimerGoesZero() {
        var self = this;

        //console.log("CALL THIS FUNCTION ON TIMER!")

        if(self.plumberAlreadyStarted)
            return;

        if(!self.gameIsRunning)
            return;

        if(self.plumberStartPipe)
        {
            self.animationSpeed = 1.8;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();

            self.plumberAlreadyStarted = true;

            self.plumberStartPipe.plumberStart();
        }
        else
        {
            //console.log("1Plumber start piece null!");
        }

        if(self.plumberStartPipe_2)
        {
            self.animationSpeed = 1.8;

            if(self.currentPipeCollision_2)
                self.currentPipeCollision_2.changeAnimSpeed();

            self.plumberAlreadyStarted = true;

            self.plumberStartPipe_2.plumberStart();
        }
        else
        {
            //console.log("2Plumber start piece 2 null!");
        }
    }

    startPlumberWithGoButton() {
        var self = this;

        if(!self.gameIsRunning)
            return;


        DataController.instance.timeIsRunning = false;    
        if(self.plumberStartPipe && !self.plumberStartPipe_2)
        {
            self.blockInputEvents_box.enabled = true;

            self.animationSpeed = 3;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();

            if(!self.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                //console.log("STOP HERE THE TIMER");

                //self.plumberAlreadyStarted = true;
                self.plumberAlreadyStarted = true;

                self.plumberStartPipe.plumberStart();
            }
        }
        else
        {
            //console.log("Plumber start piece null!");
        }

        if(self.plumberStartPipe && self.plumberStartPipe_2)
        {
            self.blockInputEvents_box.enabled = true;

            self.animationSpeed = 3;

            if(self.currentPipeCollision)
                self.currentPipeCollision.changeAnimSpeed();

            if(self.currentPipeCollision_2)
                self.currentPipeCollision_2.changeAnimSpeed();

            if(!self.plumberAlreadyStarted)
            {
                //STOP HERE TIMER
                //console.log("STOP HERE THE TIMER");

                self.plumberAlreadyStarted = true;

                self.plumberStartPipe.plumberStart();
                self.plumberStartPipe_2.plumberStart();
            }
        }
        else
        {
            //console.log("Plumber start piece null!");
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
    
                    //console.log("WIN!");
                     self.winFunction();
                }
                else
                {
                    //console.log("NOT COMPLETED YET...");
                }
            }
            
            
            if(self.plumberStartPipe_2)
            {
                if(self.plumber_Completed && self.plumber_2_Completed)
                {
                    self.blockInputEvents_box.enabled = true;
                    
                    self.gameIsRunning = false;
                    
                    //console.log("WIN!");
                    self.winFunction();
                }
                else
                {
                    //console.log("WAIT OTHER PLUMBER TO COMPLETE!");
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

            AudioController.instance.playAudioSource(2);

            self.scheduleOnce(()=>{
                this.feedBackController.playerLose();
            }, 1);
            
            //console.log("LOSE...");
        }
    }


    winFunction(){
        this.truckAnimation.play('Caminhao_GoAway');
    }
}
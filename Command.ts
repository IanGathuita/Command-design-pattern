/* encapsulate a request as an object (i.e. a command) and pass to an invoker. Invoker does not know how to
handle the request. It will call the Execute method of the command object. The execute method of the
command object will call the receiver object method and the receiver object method will perform the
necessary action to handle the request.Command has receiver object reference and the  Execute method which
will call the receiver object method to handle the request.*/

//Receiver class has the actual business logic to perform actions
class Doc {
    open() {
        console.log("Document Opened");
    }
    save(){
        console.log("Document Saved");
    }
    close(){
        console.log("Document Closed");
    }
}

interface ICommand {
    execute(): void;
}

//classes that define the structure of commands objects
class OpenCommand implements ICommand{
    private _document:Doc;

    constructor(document:Doc){
        this._document = document;
    }

    execute(): void {
        this._document.open();
    }   
    
}

class SaveCommand implements ICommand{
    private _document:Doc;

    constructor(document:Doc){
        this._document = document;
    }

    execute(): void {
        this._document.save();
    }   
    
}

class CloseCommand implements ICommand{
    private _document:Doc;

    constructor(document:Doc){
        this._document = document;
    }

    execute(): void {
        this._document.close();
    }   
    
}

//Invoker
class MenuOptions{
    openCommand:ICommand;
    saveCommand:ICommand;
    closeCommand:ICommand;

    constructor(open:ICommand, save:ICommand, close:ICommand){
        this.openCommand = open;
        this.saveCommand = save;
        this.closeCommand = close;
    }

    clickOpen():void{
        this.openCommand.execute();
    }

    clickSave():void{
        this.saveCommand.execute();
    }

    clickClose():void{
        this.closeCommand.execute();
    }
}

//client code
let doc = new Doc();
let openCommand: ICommand = new OpenCommand(doc);
let saveCommand: ICommand = new SaveCommand(doc);
let closeCommand: ICommand = new CloseCommand(doc);
let menuOptions:MenuOptions = new MenuOptions(openCommand, saveCommand, closeCommand);

menuOptions.clickOpen();
menuOptions.clickSave();
menuOptions.clickClose();
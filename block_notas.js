const RESOLVE="RESOLVE"
const PENDANT="PENDANT"
const dateSeparator="-"
const NOTESFILE=".\\notes.json"
const fs= require('fs')


let note_list=[]

/** this method allow the initialization of the block_notas script. It will look in the
 * current directory for the notes.json and look the persisted notes. In case that there isn't 
 * any notes.json, it will initialize with defautls values. It 's execute before exporting the module
 */
function init(){
    try {
        let data=fs.readFileSync(NOTESFILE,'utf-8')
        let objects=JSON.parse(data)
        for (const iterator of objects) {
            createAndAddNote(iterator)
        }
    } catch (error) {
        if(error.code != "ENOENT"){
            throw error
        }else{
            console.log("A new file will be created since it cannot be found")
        }
    }
}

/**Method that creates a note from an object */
function createAndAddNote(object){
    let {state,tittle,description,date}= object
    if(tittle != undefined && tittle != null && tittle.length > 0){
    note_list.push(new Note(tittle,description,date,state))
    }
}
/**Constructor for Class Note */
function Note(tittle,description="",date=formatedDate(),state=PENDANT){
    this.tittle=tittle
    this.description=description
    this.state=state
    this.date=date
    this.toString=function (pretty){
        if(pretty == undefined || isNaN(pretty) || pretty === null || pretty instanceof Number  || pretty instanceof String){
            pretty=false
        }
        if(pretty){
        console.log("--------------------------------------------------")
        console.log(this.date +"                       "+ this.tittle)
        console.log(this.description)
        console.log(this.state)
        }else{
            console.log(this.date +" | "+ this.tittle+" | "+this.description +" | "+ this.state)
        }
    }
}
/**Format the date to a specific format */
function formatedDate(){
    let date=new Date()
    return date.getFullYear() +dateSeparator+(date.getMonth()+1)+dateSeparator+(date.getDay()+1)

}


/**Changes the state of a specific note
 *  @param tittle unique id of note.Default value is ""
 *  @param description description of a note. Default value is ""
 */
function markNoteAsResolve(tittle="",descripcion=""){
    
    for (const iterator of note_list) {
        if(iterator.tittle == tittle || iterator.description == descripcion){
            iterator.state=RESOLVE
            return
        }
    }
    console.log("No existen notas con los datos ingresados")
}
/**
 * Persist the notes and the modifications in the notes.json file
 */
function saveToFile(){
    let fileContent=JSON.stringify(note_list)
    fs.writeFileSync(NOTESFILE,fileContent)
}

/**
 * List all the nodes with pendant state.
 * @param {*} pretty boolean value that allows to change to a pretty output. Default value is false
 */
function filterbyPendant(pretty=false){
    let array=note_list.filter( x=>x.state==PENDANT)
    if(array.length>0){
        array.forEach( x =>x.toString(pretty))
    }else{
        console.log("No hay notas pendientes para listar")
    }
}

/**
 * Creates a note. If the tittle is undefined or null or empty it will throw an exception
 * @param {*} tittle 
 * @param {*} description 
 */
function createNote(tittle,description="No Description"){
    
    if(tittle !=undefined && tittle != null && tittle.trim().length == 0){
        throw new Error("The tittle cannot be empty")
    }
    for (const iterator of note_list) {
        if(iterator.tittle == tittle){
            iterator.tittle=tittle
            iterator.description=description
            return
        }
    }
    note_list.push(new Note(tittle,description))
    }
/**
 * List all the notes 
 * @param {*} pretty boolean value that allows to change to a pretty output. Default value is false
 */
function listNotes(pretty=false){
    if(note_list.length>0){

        note_list.forEach(x=>x.toString(pretty) )
    }else{
        console.log("No hay notas para listar")
    }
}

init()
module.exports={
    saveChanges:saveToFile,
    listNotes,
    listPendantNotes:filterbyPendant,
    changeState:markNoteAsResolve,
    createNote,
}
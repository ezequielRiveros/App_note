const RESOLVE="RESOLVE"
const PENDANT="PENDANT"
const dateSeparator="-"
const NOTESFILE=".\\bloc_notas\\notes.json"
const fs= require('fs')

let note_list=[]


function init(){
    fs.readFile(NOTESFILE,'utf-8',(err,data)=>{
        if(err) console.log(err)
        console.log(typeof JSON.parse(data) )
    })
   /* const fd=fs.openSync(NOTESFILE,'r')
    let fileInfo=fs.readFileSync(fd)
    fs.closeSync(fd)*/
}

function Note(title,description){
    this.title=title
    let date=new Date()
    this.creatingDate=date.getFullYear() +dateSeparator+(date.getMonth()+1)+dateSeparator+(date.getDay()+1)
    this.state=PENDANT
    this.description=description
}

function markNoteAsResolve(note){
    pendantNote=note_list.filter((x,note)=> x.title == note.title)
    pendantNote.state=RESOLVE
}

function appendTofile(note){
    let noteAsJson=JSON.stringify(note)
    fs.appendFileSync(NOTESFILE,noteAsJson)
}

function save(){
    let noteAsJson=JSON.stringify(note)
    fs.writeFile(NOTESFILE, data, (err) => {
        if (err) throw err;
    });
}

function convert(){
    let data=JSON.parse("fileContent")

}
function createNote(tittle,description){
    let new_note=new Note(tittle,description)
    note_list.push(new_note)
}

function listNotes(){
    note_list.forEach(x=>{
        console.log("--------------------------------------------------")
        console.log(x.creatingDate +"                       "+ x.title)
        console.log(x.description)
        console.log(x.state)
    } )
} 

init()

module.exports={
    save,
    listNotes,
    changeState:markNoteAsResolve,
    createNote,
}
const PromptSync =require('prompt-sync');
const prompt = require('prompt-sync')({sigint: true}); 
const blockNotas= require('./block_notas')

console.log("**************************************************")
console.log("***                                           ****")
console.log("***                 NOTE APP                  ****")
console.log("***                                           ****")
console.log("**************************************************")

function menu_de_opciones(){
    console.log("*** Seleccione alguna opcion                  ****")
    console.log("***  1)Crear Nota                             ****")
    console.log("***  2)Modificar Estado de la Nota            ****")
    console.log("***  3)Listar Todas las Notas                 ****")
    console.log("***  4)Listar Notas Pendientes                ****")
    console.log("***  5)Guardar y Salir                        ****")
}

//this is a comment
let opcion_incorrecta=false
let opcion
do{
    menu_de_opciones()
    opcion=prompt("Seleccione su opcion: ") 
    console.log(" ") 
    do{
    opcion_incorrecta=false   
    switch(opcion){
        case "1" : crearNotaMenu();break
        case "2" : moficarEstadoNotaMenu();break
        case "3" : menuListarNotas();break
        case "4" : menuListarNotasPendientes();break
        case "5" : menuGuardarySalir();break
        default: console.log("valor incorrecto de opcion. Por favor seleccione una opcion valida")
                opcion=prompt("Seleccione su opcion: ")
                opcion_incorrecta=true;break
        }
    }while(opcion_incorrecta)
    console.log(" ")
    console.log("**************************************************")
    console.log(" ")
    console.log(" ")
}while( opcion !=5)
function crearNotaMenu(){
    let titulo=prompt("Ingrese el titulo de la nota: ")
    if(titulo.length == 0){
        console.log(" ")
        console.log("El titulo no puede ser vacio")
        return
    }
    let descripcion=prompt("Ingrese la descripcion de la nota: ")
    blockNotas.createNote(titulo,descripcion)
}
function moficarEstadoNotaMenu(){
    
    let titulo=prompt("Ingrese el titulo de la nota que desea marcar como resuelta: ")
    let descripcion
    if(titulo.length ==0 ){
        descripcion=prompt("Ingrese la descripcion de la nota que desea marcar como resuelta: ")
        if(descripcion == 0 || descripcion == undefined){
            console.log(" ")
            console.log("Se debe ingresar el titulo o la descripcion para cambiar el estado de la nota")
            return
        }    
    }
    blockNotas.changeState(titulo,descripcion)
    console.log("la nota: "   +titulo!=undefined?titulo:descripcion + " ha sido marcada como Resolve")
}
function menuListarNotas(){
    blockNotas.listNotes() 
}
function menuListarNotasPendientes(){
    blockNotas.listPendantNotes()
}
function menuGuardarySalir(){
    blockNotas.saveChanges()
}

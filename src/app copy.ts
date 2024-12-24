import fs from 'fs'
const path = 'cna'


export const createTableHeader = (tableNumer:number) => {
    console.log('============================================')
    console.log(`Tabla del ${tableNumer}`)
    console.log('============================================')
} 


export const createTableBody = (tableNumer:number, limit:number) : string => {
    let templateBody = ``

    for (let index = 1; index <= limit; index++) {
        templateBody+= `${tableNumer} x ${index} = ${tableNumer * index}\n`
        
    }

    return templateBody;
}

export const saveTableFile = (fileName:string = 'tabla',text:string,tableNumer:number = 9) => {

    if(!fs.existsSync(`${path}`)){
        fs.mkdirSync(`${path}`,{recursive:true})
    } 

    try{
        fs.writeFileSync(`${path}/${fileName}-${tableNumer}.txt`,text,{
            encoding:'utf-8'
        })
        console.log('El archivo se ha creado correctamente ')
    }catch(error){
        console.log('Ocurrio un error al crear el archivo');
        throw new Error(String(error));
    }

    
}

export const createTable = (tableNumer:number, limit:number,showTable:boolean,destination:string,):void => {
        createTableHeader(tableNumer);
        const table = createTableBody(tableNumer,limit)
        console.log(typeof showTable)
        if(showTable) {
            console.log(table)
        };
        saveTableFile(undefined,table,limit);

}


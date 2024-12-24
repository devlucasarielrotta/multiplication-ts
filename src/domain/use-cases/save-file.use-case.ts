import fs from 'fs';

export interface SaveFileUseCase{
    execute:(options:SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?:string;
    fileName?:string;
}

export class SaveFile implements SaveFileUseCase{
    constructor(){

    }


    execute ({fileContent,fileDestination = 'outputs',fileName = 'table'}: SaveFileOptions):boolean {

          if(!fs.existsSync(`${fileDestination}`)){
                fs.mkdirSync(`${fileDestination}`,{recursive:true})
            } 
        
            try{
                fs.writeFileSync(`${fileDestination}/${fileName}.txt`,fileContent,{
                    encoding:'utf-8'
                })
              
                return true;
            }catch(error){
                console.error(error)
                return false
               
            }
    } 
}
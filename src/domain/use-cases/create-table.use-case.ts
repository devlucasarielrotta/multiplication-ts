export interface CreateTableUseCase {
    execute: (options:CreateTableOptions) =>string; 
}

export interface CreateTableOptions {
    base: number;
    limit?:number;
}


export class CreateTable implements CreateTableUseCase {
    constructor(  /**
        * DI - Dependency Injection
        */
    ){}

    execute({base,limit=10}:CreateTableOptions){
        let templateBody = '';
        for (let index = 1; index <= limit; index++) {
            templateBody+= `${base} x ${index} = ${base * index}\n`
            
        }

        return templateBody;
    }
}
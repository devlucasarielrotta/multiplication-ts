import fs from "fs";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case"

describe('SaveFileUSe case',() => {
    beforeEach(() => {
        try{
            fs.rmSync('outputs/table.txt',{recursive:true})
        }catch(error){

        }

        jest.clearAllMocks();
    })

    afterEach(() => {
        try{
            fs.rmSync('outputs/',{recursive:true})
        }catch(error){

        }
    })
    test('should save file with deafult values',() => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);

        expect(result).toBe(true);
        const checkFile =  fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})

        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent)

    })

    test('should save file with custom values',() => {
        const options = {
            fileContent: 'custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name'
        }
        const filePath = `${options.fileDestination}/${options.fileName}.txt`
        const saveFile = new SaveFile();
        const result = saveFile.execute(options);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'})
       

        expect(fileContent).toBe(options.fileContent)
    })

    test.skip('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
          throw new Error('Could not create directory (test file)');
        });
        const options = {
            fileContent: 'test content'
        }
        const result = saveFile.execute(options);
        expect(result).toBeFalsy();
     
        mkdirSyncSpy.mockRestore();
      });
     
      test.skip('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest
          .spyOn(fs, 'writeFileSync')
          .mockImplementation(() => {
            throw new Error('This is a custom writing error message (test file)');
          });
        const result = saveFile.execute({ fileContent: 'Hello' });
        expect(result).toBeFalsy();
     
        writeFileSyncSpy.mockRestore(); // Restaura el comportamiento original de fs.writeFileSync() después de la prueba.
      });
})
import { CreateTable } from "../src/domain/use-cases/create-table.use-case";
import { SaveFile } from "../src/domain/use-cases/save-file.use-case";
import { ServerApp } from "../src/presentation/server-app"

describe('server app ', () => {

    const options = {
        base:2,
        limit:10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    }

    test('should create ServerApp instance',() => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
    })

    test('shjould run server app',() => {

        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');

    
        
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalled()
        expect(createTableSpy).toHaveBeenCalledTimes(1)
        expect(createTableSpy).toHaveBeenCalledWith({base:options.base,limit:options.limit})
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
    })

    test('should run with custom values mcoked',() => {
        const logMock = jest.fn();
        const createMock = jest.fn();
        const savefileMock = jest.fn();

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = savefileMock;
        ServerApp.run(options);
        
        expect(logMock).toHaveBeenCalled();
    })
})
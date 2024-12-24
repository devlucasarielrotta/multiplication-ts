import { ServerApp } from "../src/presentation/server-app";


describe('App',() =>{
    test('should call server.run with values', async() => {
        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;

        process.argv = ['-b','10','-l','5','-s','-n','test-file','-d','test-file'];

        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base:10,
            limit:5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-file'
        })
    })
})
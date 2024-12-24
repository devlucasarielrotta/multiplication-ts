/// import { yarg } from "../../src/plugins/yargs.plugin";
const runCommand = async (args:string[]) => {
    process.argv = [...process.argv, ...args];

    const {yarg} = await import('../../src/plugins/yargs.plugin');

    return yarg;
}
describe('test args.plugin.ts',() => {
    const orignalArgv = process.argv;
    beforeEach(() => {
        process.argv = orignalArgv;
        jest.resetModules();
    })
    test('should return defualt values', async () => {
        const argv = await runCommand(['-b','5']);

        expect(argv).toEqual( expect.objectContaining({
            b:5
        })
            
        )
    })

    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b','5','-l','10']);

        expect(argv).toEqual( expect.objectContaining({
            b:5,
            l:10
        })
            
        )
    })
})
interface CheckServiceUseCase {
    execute(url:string): Promise<boolean> // una promesa que devuelve un boolean
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ){}
    

    public async execute(url:string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallBack();
            console.log(`Service ${url} is ok`);
            return true;
        } catch (error) {
            this.errorCallBack(`${error}`);
            console.log(`${error}`);
            
            return false
        } 
        return true
    } 
}
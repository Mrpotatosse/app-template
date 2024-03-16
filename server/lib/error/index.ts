export enum CustomErrorCode {
    Test = 0,
    NotInitialized = 1,
    PropertyNotFound = 2,
}

export class CustomError extends Error {
    private readonly _code: CustomErrorCode;

    constructor(code: CustomErrorCode, message: string) {
        super(message);
        this._code = code;
    }
}

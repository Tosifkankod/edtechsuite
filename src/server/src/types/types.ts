
export type THttpResponse = {
    success: boolean,
    statusCode: number,
    request: {
        ip?: string | null,
        method: string,
        url: string
    }
    message: string,
    data: unknown
}


export type THttpError = {
    success: boolean,
    statusCode: number,
    request: {
        ip?: string | null,
        method: string,
        url: string
    }
    message: string,
    error: unknown,
    trace?: object | null
}


export type commonQueryParams = {
    page: number
    limit: number
    search?: string
    sortBy?: string
    order?: "ASC" | "DESC"
}
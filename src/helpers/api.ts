import {NextApiRequest, NextApiResponse} from "next";

export interface RequestData {
    message?: string;
    data?: any
}

export function methodNotImplementedYet(req: NextApiRequest, res: NextApiResponse): void {
    res.status(501).json({code: 501, message: "Not implemented yet"});
}

export function badMethod(req: NextApiRequest, res: NextApiResponse, requiredMethod: string | undefined, data?: any): void {
    return res.status(405).json({
        code: 405,
        message: "Wrong method for route",
        method: req.method,
        requiredMethod,
        data
    });
}

export function badRequest(req: NextApiRequest, res: NextApiResponse, {message, data}: {message?: string, data?: any}): void {
    return res.status(400).json({
        code: 400,
        message: message || "Bad request, see online documentation",
        method: req.method,
        data
    });
}

export function ok(req: NextApiRequest, res: NextApiResponse, {message, data}: RequestData): void {
    return res.status(200).json({
        code: 200,
        message: message || "all is good !",
        data,
    })
}

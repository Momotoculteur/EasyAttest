import { datetime } from "../general/IDateTime";

export interface IAttestationObject {
    id: number,
    createdAt: datetime,
    leavedAt: datetime,
    reasons: string,
    path: string,
    createAt: string;
    
}
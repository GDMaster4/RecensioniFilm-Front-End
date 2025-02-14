import { Film } from "./film.entity";
import { User } from "./user.entity";

export interface Review
{
    id: string,
    Film:Film
    Autore: User,
    Testo:string,
    Valutazione:number,
    DataInserimento:string,
    DataUltModifica:string,
}
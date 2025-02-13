import { Film } from "./film.entity";

export interface Review
{
    id: string,
    Film:Film
    Autore: string,
    Testo:string,
    Valutazione:number,
    DataInserimento:string,
    DataUltModifica:string,
}
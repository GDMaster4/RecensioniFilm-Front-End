export interface Film
{
    id: string,
    Titolo: string,
    Genere: GenereFilm,
    AnnoUscita:number
}

export enum GenereFilm
{
    Azione,
    Commedia,
    Drammatico,
    Fantascienza,
    Horror,
    Thriller,
    Animazione,
    Documentario,
    Avventura,
    Fantasy,
    Musical,
    Romantico,
    Storico,
    Western
}
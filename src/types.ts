export type Carburant = 'essence' | 'diesel' | 'electrique'

export type Etat = 'disponible' | 'louee' | 'en_reparation'

export type Voiture = {
    "immatriculation": String,
    "marque": String,
    "modele": String,
    "annee": Number,
    "prixJour": Number,
    "carburant": Carburant,
    "etat": Etat,
}

export type Demande = {
    "immatriculation": String,
    "jour": Number
}

export type Resultats =
    { ok: true; voiture: Voiture; prix: number }
    | { ok: false; raison: string };

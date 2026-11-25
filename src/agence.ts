import type { Carburant, Etat, Voiture, Demande, Resultats } from './types.ts';

export function libelleEtat(etat: Etat): string {
    switch (etat) {
        case "disponible":
            return "Disponible";
        case "louee":
            return "Deja louee";
        case "en_reparation":
            return "En reparation"
        default:
            const impossible: never = etat;
            return impossible
    }

}

export function prixLocation(voiture: Voiture, jours: number): number {

    let prix = jours * Number(voiture.prixJour);
    if (jours >= 7) {
        prix = Math.round(prix * 0.9);
    }
    return prix;
}


export function louer(
    voitures: Voiture[],
    demande: Demande
): Resultats {

    const voiture = voitures.find(
        v => v.immatriculation === demande.immatriculation
    );

    if (voiture === undefined) {
        return {
            ok: false,
            raison: "voiture inconnue"
        };
    }

    if (Number(demande.jour) < 1 || Number(demande.jour) > 30) {
        return {
            ok: false,
            raison: "durée invalide (1 à 30 jours)"
        };
    }

    if (voiture.etat !== "disponible") {
        return {
            ok: false,
            raison: libelleEtat(voiture.etat)
        };
    }

    return {
        ok: true,
        voiture: voiture,
        prix: prixLocation(voiture, Number(demande.jour))
    };

}

export function plusAncienne(voitures: Voiture[]): Voiture | undefined {

    let ancienne: Voiture | undefined = undefined;
        for (const voiture of voitures)
        {
            if(ancienne === undefined || voiture.annee < ancienne.annee)
            ancienne = voiture;
        }
    return ancienne;
       
}

export function plusRecente(voitures: Voiture[]): Voiture | undefined {
    let VoitureRecente: Voiture | undefined = undefined;
    for(const voiture of voitures)
    {
        if(VoitureRecente === undefined || voiture.annee > VoitureRecente.annee) VoitureRecente=voiture

    }
    return VoitureRecente;

    
}

export function parCarburant(voitures: Voiture[]): Record<Carburant,Number>
{
const compte: Record<Carburant,Number> = {essence:0, diesel:0, electrique:0}
for(const voiture of voitures)
{
    compte[voiture.carburant]+=1
}
return compte;
}

export function estCarburant(x: unknown): x is Carburant{
    return x === 'essence' || x === 'diesel' || x === 'electrique'
}

export function estEtat(x: unknown): x is Etat{
    return x === 'disponible' || x === 'louee' || x ==='en_reparation'
}

export function estVoiture(x: unknown): x is Voiture{
    if(x === null || typeof x !== 'object') return false
    const voiture = x as Record <String, unknown>;
    return (
        typeof voiture.immatriculation === 'String' &&
        typeof voiture.marque === 'String'&&
        typeof voiture.modele === 'String'&&
        typeof voiture.annee === 'Number'&&
        estCarburant(voiture.carburant)&&
        typeof voiture.prixJour === 'Number'&& voiture.prixJour > 0 &&
        estEtat(voiture.etat)
    )
}

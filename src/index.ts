import { readFile } from 'node:fs/promises'
import type { Demande, Voiture } from './types.ts'
import { estVoiture, plusAncienne, parCarburant, libelleEtat, louer } from './agence.ts'
const donnee: unknown = JSON.parse(await readFile('parc.json', 'utf8'))
const list: unknown[] = Array.isArray(donnee) ? donnee : [];
const parc: Voiture[] = list.filter(estVoiture);
console.log('le parc de l\'agence')
console.table(parc.map((voiture) => ({
    immatriculation: voiture.immatriculation,
    voiture: `${voiture.marque} ${voiture.modele}`,
    annee: voiture.annee,
    Carburant: voiture.carburant,
    'Prix/jour': voiture.prixJour,
    etat: libelleEtat(voiture.etat)
})))

console.log(
    `voiture ignorer: Le nombre de voiture ignorer est ${list.length - parc.length}`
)
const compte = parCarburant(parc);
console.log(`Essence: ${compte.essence}  Diesel: ${compte.diesel}   Electrique: ${compte.electrique}`)

const ancienne = plusAncienne(parc);

if (ancienne !== undefined)
    console.log(`La voiture la plus ancienne est ${ancienne.marque} ${ancienne.modele} ${ancienne.annee}`)

const demandes: Demande[] = [{
    immatriculation: 'BJ-1234-A',
    jour: 3
},
{
    immatriculation: 'BJ-2210-B',
    jour: 2
},
{
    immatriculation: 'BJ-5678-E',
    jour: 10
},
{
    immatriculation: 'BJ-4512-D',
    jour: 1
},
{
    immatriculation: 'BJ-9999-Z',
    jour: 2
},
{
    immatriculation: 'BJ-3345-C',
    jour: 0
},];
let recette = 0;
for(const demande of demandes){
    const r = louer(parc, demande)
    if(r.ok){
        recette+= r.prix
        console.log(`✅ ${demande.immatriculation} ${r.voiture.marque} ${r.voiture.modele} ${r.prix} `)
    } else{
        console.log(`${demande.immatriculation} ${r.raison}`)
    }

}

console.log(`La recette du jour est ${recette}`)
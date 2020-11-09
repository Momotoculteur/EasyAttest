import { IAttestationType } from "../interface/general/IAttestationType";

export const ALL_ATTESTATIONS_TYPE: IAttestationType[] = [
    {
        id: 1,
        label: "DEPLACEMENT_PRO",
        shortLabel: 'Pro',
        shortDescription: "Déplacement professionel",
        description: "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement\
        d’enseignement ou de formation, déplacements professionnels ne pouvant être différés, déplacements pour un concours ou un examen."
    },
    {
        id: 2,
        label: "DEPLACEMENT_NOURRITURE",
        shortDescription: "Déplacement nourriture",
        description: "Déplacements pour effectuer des achats de fournitures nécessaires à l'activité professionnelle,\
        des achats de première nécessité dans des établissements dont les activités demeurent autorisées, le retrait de\
        commande et les livraisons à domicile.",
        shortLabel: 'Nourriture'

    },
    {
        id: 3,
        label: "DEPLACEMENT_MEDICAL",
        shortDescription: "Déplacement médical",
        description: "Consultations, examens et soins ne pouvant être assurés à distance et l’achat de médicaments.",
        shortLabel: 'Medical',

    },
    {
        id: 4,
        label: "DEPLACEMENT_FAMILIAL",
        shortLabel: 'Familial',
        shortDescription: "Déplacement familial",
        description: "Déplacements pour motif familial impérieux, pour l'assistance aux personnes vulnérables et \
            précaires ou la garde d'enfants."
    },
    {
        id: 5,
        label: "DEPLACEMENT_HANDICAP",
        shortLabel: 'Handicap',
        shortDescription: "Déplacement handicap",
        description: "Déplacement des personnes en situation de handicap et leur accompagnant."
    },
    {
        id: 6,
        label: "DEPLACEMENT_SPORTIF",
        shortLabel: 'Marche',
        shortDescription: "Déplacement sportif",
        description: "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre\
        autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive \
        collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un \
        même domicile, soit aux besoins des animaux de compagnie."
    },
    {
        id: 7,
        label: "DEPLACEMENT_JUDICIAIRE",
        shortLabel: 'Judiciaire',
        shortDescription: "Déplacement judiciaire",
        description: "Convocation judiciaire ou administrative et pour se rendre dans un service public."
    },
    {
        id: 8,
        label: "DEPLACEMENT_MISSION_INTERET_GENERAL",
        shortLabel: 'Mission',
        shortDescription: "Déplacement mission d'intérêt général",
        description: "Participation à des missions d'intérêt général sur demande de l'autorité administrative."
    },
    {
        id: 9,
        label: "DEPLACEMENT_ENFANTS",
        shortLabel: 'Enfants',
        shortDescription: "Déplacement enfants",
        description: "Déplacement pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires."
    },
];
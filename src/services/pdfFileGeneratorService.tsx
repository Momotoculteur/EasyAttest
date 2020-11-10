import * as Print from 'expo-print';
import { Alert, Platform } from "react-native";
import { IAttestationType } from "../components/shared/interface/general/IAttestationType";
import { ALL_ATTESTATIONS_TYPE } from '../components/shared/constant/CAttestationType'
import { IUserObject } from '../components/shared/interface/object/IUserObject';
import QRCode from 'qrcode';




function getQRCodeData(user?: IUserObject, reasonsLabelsList: string[],  leavedAtDate: string, leavedAtTime: string, createdAtDate: string, createdAtTime: string) {

    
    return [
      `Cree le: ${createdAtDate} a ${createdAtTime}`,
      `Nom: ${user?.lastName}`,
      `Prenom: ${user?.firstName}`,
      `Naissance: ${user?.birthdate} a ${user?.birthplace}`,
      `Adresse: ${user?.adress} ${user?.postalCode} ${user?.city}`,
      `Sortie: ${leavedAtDate} a ${leavedAtTime}`,
      `Motifs: ${reasonsLabelsList.join(", ")}`,
    ].join(";\n");
    
}



export async function generateAttestationPdfFile(user?: IUserObject, reasonsIdsList: number[], reasonsLabelsList: string[], leavedAtDate: string, leavedAtTime: string, createdAtDate: string, createdAtTime: string) {



    const qrCodeLarge: string = await QRCode.toString(getQRCodeData(user, reasonsLabelsList, leavedAtDate, leavedAtTime, createdAtDate, createdAtTime));
    
    let html = `<style>
    @page {

    }
    * {
        fontFamily: 'Arial';
        line-height: 1em;
    }

  </style>
    <h2 style="text-align: center;">ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h2>
    <p style="text-align: center;">En application du décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales
    nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire</p>
    <p>Je soussigné(e),</p>
    <p>Mme/M. : ${user.firstName} ${user.lastName}</p>
    <table>
    <tbody>
    <tr>
    <td style="width: 360px;">Né(e) le : ${user.birthdate}</td>
    <td style="width: 384px;">à : ${user.birthplace}</td>
    </tr>
    </tbody>
    </table>
    <p>Demeurant : ${user.adress}</p>
    <p>certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret</br>
    n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à</br>
    l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire <sup>1<sup> : </p>`;


    html += `<table><tbody>`


    // Checkbox
    ALL_ATTESTATIONS_TYPE.forEach((reason: IAttestationType) => {
        html += `<tr>`;
        html += `<td style="width: 45px;">`

        html += `<div style="height: 25px;width: 25px;border: solid 2px;"><div style="text-align:center;vertical-align:center;font-size: 1.4em">`

        // Cocher la checkbox
        if (reasonsIdsList.includes(reason.id)) {
            html += `X`
        }

        html += `<div/></div>`
        html += `</td>`;

        //Description
        html += `<td>${reason.description}</td>`;

        html += `</tr>`;
    })




    html += `</tbody></table>`


    // TINY QR CODE EN BASE DE PREMIERE PAGE
    //html += `<p style="position: absolute; left:550px; bottom: 143px;">${qrCodeTiny}</p>

    html += `
    <table>
    <tbody>
    <tr>
    <td style="width: 400px;">Fait à : ${user.city}</td>
    <td style="width: 270px;"></td>
    </tr>
    <tr>
    <td style="width: 400px;">Le : ${leavedAtDate}</td>
    <td style="width: 270px;">à : ${leavedAtTime}</td>
    </tr>
    </tbody>
    </table>
    <p>(Date et heure de début de sortie à mentionner obligatoirement)<br />Signature :</p>
    <table>
    <tbody>
    <tr>
    <td style="width: 35px;text-align: center;"><sup>1</sup></td>
    <td>Les personnes souhaitant bénéficier de l'une de ces exceptions doivent se munir s'il y a lieu, lors de leurs déplacements hors de leur domicile, d'un document leur permettant de justifier que le déplacement considéré entre dans le champ de l'une de ces exceptions.</td>
    </tr>
    <tr>
    <td style="width: 35px;text-align: center;"><sup>2</sup></td>
    <td>A utiliser par les travailleurs non-salariés, lorsqu'ils ne peuvent disposer d'un justificatif de déplacement établi par leur employeur.</td>
    </tr>
    <tr>
    <td style="width: 35px;text-align: center;"><sup>3</sup></td>
    <td>Y compris les acquisitions à titre gratuit (distribution de denrées alimentaires...) et les déplacements liés à la perception de prestations sociales et au retrait d'espèces.</td>
    </tr>
    </tbody>
    </table>${qrCodeLarge}`;


    return (await Print.printToFileAsync({
        html: html
    })).uri

}




import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from "react-native";
import { IAttestationType } from "../components/shared/interface/general/IAttestationType";
import {ALL_ATTESTATIONS_TYPE} from '../components/shared/constant/CAttestationType'
import { IUserObject } from '../components/shared/interface/object/IUserObject';


export async function genPdf(user?: IUserObject, attestationsTypes?: IAttestationType[]) {

    const maurice: IUserObject = {
        firstName: "Bastien",
        lastName: "MAURICE",
        birthdate: "10/12/1993",
        birthplace: "Périgueux",
        adress: "14 Impasse de campniac",
        postalCode: "24000",
        city: "Périgueux",
        id: 1

    }

    const date: string = "10/12/2020";
    const hours: string = "10:10"

    let attestList: IAttestationType[] = [];

    let QRCODE= "";



    let html = `<style>
    @page {
      margin: 25px;
    }
  </style>
    <h2 style="text-align: center;">ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h2>
    <p style="text-align: center;">En application du décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales
    nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire</p>
    <p>Je soussigné(e),</p>
    <p>Mme/M. : ${maurice.firstName} ${maurice.lastName}</p>
    <table style="width: 703px;">
    <tbody>
    <tr>
    <td style="width: 360px;">Né(e) le : ${maurice.birthdate}</td>
    <td style="width: 384px;">à : ${maurice.birthplace}</td>
    </tr>
    </tbody>
    </table>
    <p>Demeurant : ${maurice.adress}</p>
    <p>certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret</br>
    n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à</br>
    l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire <sup>1<sup> : </p>`;


    html += `<table style="width: 697px;"><tbody>`


    ALL_ATTESTATIONS_TYPE.forEach((reason: IAttestationType) => {
        html +=`<tr>`;
        // Checkbox
        html +=`<td style="width: 45px;">`
        html += `<div style="height: 25px;width: 25px;border: solid 2px;"><div style="text-align:center;vertical-align:center;font-size: 1.4em">X<div/></div>`;
        html += `</td>`;

        //Description
        html +=`<td style="width: 700px;">${reason.description}</td>`;

        html +=`</tr>`;
    })




    html += `</tbody></table>`

    html += `<p><img style="background-image: url('img/object.gif'); float: right;" width="100" height="100" /></p>
    <table style="width: 386.851px;">
    <tbody>
    <tr>
    <td style="width: 400px;">Fait à : ${maurice.city}</td>
    <td style="width: 270px;"></td>
    </tr>
    <tr>
    <td style="width: 400px;">Le : ${date}</td>
    <td style="width: 270px;">à : ${hours}</td>
    </tr>
    </tbody>
    </table>
    <p>(Date et heure de début de sortie à mentionner obligatoirement)<br />Signature :</p>
    <table style="width: 706px;">
    <tbody>
    <tr>
    <td style="width: 35px; text-align: center;"><sup>1</sup></td>
    <td style="width: 675px;">Les personnes souhaitant bénéficier de l'une de ces exceptions doivent se munir s'il y a lieu, lors de leurs déplacements hors de leur domicile, d'un document leur permettant de justifier que le déplacement considéré entre dans le champ de l'une de ces exceptions.</td>
    </tr>
    <tr>
    <td style="width: 35px; text-align: center;"><sup>2</sup></td>
    <td style="width: 675px;">A utiliser par les travailleurs non-salariés, lorsqu'ils ne peuvent disposer d'un justificatif de déplacement établi par leur employeur.</td>
    </tr>
    <tr>
    <td style="width: 35px; text-align: center;"><sup>3</sup></td>
    <td style="width: 675px;">Y compris les acquisitions à titre gratuit (distribution de denrées alimentaires...) et les déplacements liés à la perception de prestations sociales et au retrait d'espèces.</td>
    </tr>
    </tbody>
    </table>`;


    //const { uri } = await Print.printToFileAsync({ html });

    /*

    const promise = await Print.printAsync({
        orientation: Print.Orientation.portrait,
        // markupFormatterIOS: `
        html: html,
    });
    
    */


    //console.log(uri)
    //    Sharing.shareAsync(uri);

}




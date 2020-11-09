import { Subject } from "rxjs";

const subject = new Subject<string>();


export const popupProfilCreatedService = {
    openPopup: () => subject.asObservable(),
    sendMessageToPopup: (message: string) => subject.next(message)
};
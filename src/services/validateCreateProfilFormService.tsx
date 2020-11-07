import { onErrorResumeNext, Subject } from 'rxjs';

const subject = new Subject();

export const validateCreateProfilFormService = {
    validateForm: () => subject.asObservable(),
    notifie: () => subject.next()
};
import * as _ from 'lodash';

/**
 * Beschreibt eine Komponente fuer einen modalen Dialog.
 *
 * {@example ../authenticationwarning/authenticationwarning.component.ts}
 */
export interface ModalComponent {
    getId(): string;
}

/**
 * Verwaltet Referenzen zu modalen Dialogen. Dieser Service dient als
 * Bindeglied zwischen zwei verschiedenen Controllern.
 */
export class ModalService {
    private modals: ModalComponent[] = [];

    add(modal: ModalComponent) {
        const doubleCheck = _.find(this.modals, {id: modal.getId()})
        if (doubleCheck === undefined || doubleCheck === null) {
            this.modals.push(modal);
        } else {
            throw new Error('Modal with id=[' + modal.getId() + '] already there.');
        }
    }

    remove(modal: ModalComponent) {
        const removed = _.remove(this.modals, e => { return e.getId() === modal.getId() });
    }

    open(id: string, message?: any) {
        const modal: any = _.find(this.modals, { id: id });
        modal.open(message);
    }

    close(id: string) {
        const modal: any = _.find(this.modals, { id: id });
        modal.close();
    }
}

import * as _ from 'lodash';

/**
 * Verwaltet Referenzen zu modalen Dialogen. Dieser Service verbindet
 * zwei Controller mit einander.
 */
export class ModalService {
    private modals: any[] = [];

    add(modal: any) {
        const doubleCheck = _.find(this.modals, {id: modal.id})
        if (doubleCheck === undefined || doubleCheck === null) {
            this.modals.push(modal);
        } else {
            throw new Error('Modal with id=[' + modal.id + '] already there.');
        }
    }

    remove(modal: any) {
        const removed = _.remove(this.modals, e => { return e.id === modal.id });
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

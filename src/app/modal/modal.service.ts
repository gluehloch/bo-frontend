export class ModalService {
    // private modals: any[] = [];
    private modal: any;

    add(modal: any) {
        // add modal to array of active modals
        // this.modals.push(modal);
        this.modal = modal;
    }

    remove(id: string) {
        // remove modal from array of active modals
        // let modalToRemove = find(this.modals, { id: id });
        // this.modals = without(this.modals, modalToRemove);
        this.modal = null;
    }

    open(httpError: any) {
        // open modal specified by id
        // let modal: any = find(this.modals, { id: id });
        this.modal.open(httpError);
    }

    close(id: string) {
        // close modal specified by id
        // let modal: any = find(this.modals, { id: id });
        this.modal.close();
    }
}

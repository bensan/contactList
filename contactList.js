/**
 * @description       : JS file for a list of all the contacts
 * 
 */

import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import searchContacts from '@salesforce/apex/ContactController.searchContacts';

const CONTACT_COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Account Name', fieldName: 'Account.Name', 
        cellAttributes: {
            class: 'slds-text-color_success slds-text-title_caps',
        }
    }
];

export default class ContactList extends LightningElement {
    @track contacts;
    @track columns = CONTACT_COLUMNS;

    connectedCallback() {
        getContacts()
            .then(result => {
                console.log(result);
                this.contacts = result;
            });
    }

    handleSearchTermChange(event) {
        const searchTerm = event.detail.value;
        console.log('searchTerm => ' + searchTerm);

        if (searchTerm) {
            searchContacts({ searchTerm })
                .then(result => {
                    console.log(result);
                    this.contacts = result;
                });
        } else {
            getContacts()
                .then(result => {
                    console.log(result);
                    this.contacts = result;
                });
        }
    }
}
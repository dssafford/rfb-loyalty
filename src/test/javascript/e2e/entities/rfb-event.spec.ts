import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('RfbEvent e2e test', () => {

    let navBarPage: NavBarPage;
    let rfbEventDialogPage: RfbEventDialogPage;
    let rfbEventComponentsPage: RfbEventComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RfbEvents', () => {
        navBarPage.goToEntity('rfb-event');
        rfbEventComponentsPage = new RfbEventComponentsPage();
        expect(rfbEventComponentsPage.getTitle()).toMatch(/Rfb Events/);

    });

    it('should load create RfbEvent dialog', () => {
        rfbEventComponentsPage.clickOnCreateButton();
        rfbEventDialogPage = new RfbEventDialogPage();
        expect(rfbEventDialogPage.getModalTitle()).toMatch(/Create or edit a Rfb Event/);
        rfbEventDialogPage.close();
    });

    it('should create and save RfbEvents', () => {
        rfbEventComponentsPage.clickOnCreateButton();
        rfbEventDialogPage.setEventDateInput('2000-12-31');
        expect(rfbEventDialogPage.getEventDateInput()).toMatch('2000-12-31');
        rfbEventDialogPage.setEventCodeInput('eventCode');
        expect(rfbEventDialogPage.getEventCodeInput()).toMatch('eventCode');
        rfbEventDialogPage.rfbLocationSelectLastOption();
        rfbEventDialogPage.save();
        expect(rfbEventDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RfbEventComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rfb-event div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RfbEventDialogPage {
    modalTitle = element(by.css('h4#myRfbEventLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    eventDateInput = element(by.css('input#field_eventDate'));
    eventCodeInput = element(by.css('input#field_eventCode'));
    rfbLocationSelect = element(by.css('select#field_rfbLocation'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setEventDateInput = function (eventDate) {
        this.eventDateInput.sendKeys(eventDate);
    }

    getEventDateInput = function () {
        return this.eventDateInput.getAttribute('value');
    }

    setEventCodeInput = function (eventCode) {
        this.eventCodeInput.sendKeys(eventCode);
    }

    getEventCodeInput = function () {
        return this.eventCodeInput.getAttribute('value');
    }

    rfbLocationSelectLastOption = function () {
        this.rfbLocationSelect.all(by.tagName('option')).last().click();
    }

    rfbLocationSelectOption = function (option) {
        this.rfbLocationSelect.sendKeys(option);
    }

    getRfbLocationSelect = function () {
        return this.rfbLocationSelect;
    }

    getRfbLocationSelectedOption = function () {
        return this.rfbLocationSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}

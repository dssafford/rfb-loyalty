import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('RfbLocation e2e test', () => {

    let navBarPage: NavBarPage;
    let rfbLocationDialogPage: RfbLocationDialogPage;
    let rfbLocationComponentsPage: RfbLocationComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RfbLocations', () => {
        navBarPage.goToEntity('rfb-location');
        rfbLocationComponentsPage = new RfbLocationComponentsPage();
        expect(rfbLocationComponentsPage.getTitle()).toMatch(/Rfb Locations/);

    });

    it('should load create RfbLocation dialog', () => {
        rfbLocationComponentsPage.clickOnCreateButton();
        rfbLocationDialogPage = new RfbLocationDialogPage();
        expect(rfbLocationDialogPage.getModalTitle()).toMatch(/Create or edit a Rfb Location/);
        rfbLocationDialogPage.close();
    });

    it('should create and save RfbLocations', () => {
        rfbLocationComponentsPage.clickOnCreateButton();
        rfbLocationDialogPage.setLocationNameInput('locationName');
        expect(rfbLocationDialogPage.getLocationNameInput()).toMatch('locationName');
        rfbLocationDialogPage.setRunDayOfWeekInput('5');
        expect(rfbLocationDialogPage.getRunDayOfWeekInput()).toMatch('5');
        rfbLocationDialogPage.save();
        expect(rfbLocationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RfbLocationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rfb-location div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RfbLocationDialogPage {
    modalTitle = element(by.css('h4#myRfbLocationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    locationNameInput = element(by.css('input#field_locationName'));
    runDayOfWeekInput = element(by.css('input#field_runDayOfWeek'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setLocationNameInput = function (locationName) {
        this.locationNameInput.sendKeys(locationName);
    }

    getLocationNameInput = function () {
        return this.locationNameInput.getAttribute('value');
    }

    setRunDayOfWeekInput = function (runDayOfWeek) {
        this.runDayOfWeekInput.sendKeys(runDayOfWeek);
    }

    getRunDayOfWeekInput = function () {
        return this.runDayOfWeekInput.getAttribute('value');
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

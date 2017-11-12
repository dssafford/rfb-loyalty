import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('RfbUser e2e test', () => {

    let navBarPage: NavBarPage;
    let rfbUserDialogPage: RfbUserDialogPage;
    let rfbUserComponentsPage: RfbUserComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RfbUsers', () => {
        navBarPage.goToEntity('rfb-user');
        rfbUserComponentsPage = new RfbUserComponentsPage();
        expect(rfbUserComponentsPage.getTitle()).toMatch(/Rfb Users/);

    });

    it('should load create RfbUser dialog', () => {
        rfbUserComponentsPage.clickOnCreateButton();
        rfbUserDialogPage = new RfbUserDialogPage();
        expect(rfbUserDialogPage.getModalTitle()).toMatch(/Create or edit a Rfb User/);
        rfbUserDialogPage.close();
    });

    it('should create and save RfbUsers', () => {
        rfbUserComponentsPage.clickOnCreateButton();
        rfbUserDialogPage.setUsernameInput('username');
        expect(rfbUserDialogPage.getUsernameInput()).toMatch('username');
        rfbUserDialogPage.homeLocationSelectLastOption();
        rfbUserDialogPage.save();
        expect(rfbUserDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RfbUserComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rfb-user div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RfbUserDialogPage {
    modalTitle = element(by.css('h4#myRfbUserLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    usernameInput = element(by.css('input#field_username'));
    homeLocationSelect = element(by.css('select#field_homeLocation'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUsernameInput = function (username) {
        this.usernameInput.sendKeys(username);
    }

    getUsernameInput = function () {
        return this.usernameInput.getAttribute('value');
    }

    homeLocationSelectLastOption = function () {
        this.homeLocationSelect.all(by.tagName('option')).last().click();
    }

    homeLocationSelectOption = function (option) {
        this.homeLocationSelect.sendKeys(option);
    }

    getHomeLocationSelect = function () {
        return this.homeLocationSelect;
    }

    getHomeLocationSelectedOption = function () {
        return this.homeLocationSelect.element(by.css('option:checked')).getText();
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

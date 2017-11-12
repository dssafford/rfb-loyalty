import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('RfbEventAttendance e2e test', () => {

    let navBarPage: NavBarPage;
    let rfbEventAttendanceDialogPage: RfbEventAttendanceDialogPage;
    let rfbEventAttendanceComponentsPage: RfbEventAttendanceComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load RfbEventAttendances', () => {
        navBarPage.goToEntity('rfb-event-attendance');
        rfbEventAttendanceComponentsPage = new RfbEventAttendanceComponentsPage();
        expect(rfbEventAttendanceComponentsPage.getTitle()).toMatch(/Rfb Event Attendances/);

    });

    it('should load create RfbEventAttendance dialog', () => {
        rfbEventAttendanceComponentsPage.clickOnCreateButton();
        rfbEventAttendanceDialogPage = new RfbEventAttendanceDialogPage();
        expect(rfbEventAttendanceDialogPage.getModalTitle()).toMatch(/Create or edit a Rfb Event Attendance/);
        rfbEventAttendanceDialogPage.close();
    });

    it('should create and save RfbEventAttendances', () => {
        rfbEventAttendanceComponentsPage.clickOnCreateButton();
        rfbEventAttendanceDialogPage.setAttendanceDateInput('2000-12-31');
        expect(rfbEventAttendanceDialogPage.getAttendanceDateInput()).toMatch('2000-12-31');
        rfbEventAttendanceDialogPage.rfbEventSelectLastOption();
        rfbEventAttendanceDialogPage.rfbUserSelectLastOption();
        rfbEventAttendanceDialogPage.save();
        expect(rfbEventAttendanceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RfbEventAttendanceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rfb-event-attendance div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RfbEventAttendanceDialogPage {
    modalTitle = element(by.css('h4#myRfbEventAttendanceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    attendanceDateInput = element(by.css('input#field_attendanceDate'));
    rfbEventSelect = element(by.css('select#field_rfbEvent'));
    rfbUserSelect = element(by.css('select#field_rfbUser'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setAttendanceDateInput = function (attendanceDate) {
        this.attendanceDateInput.sendKeys(attendanceDate);
    }

    getAttendanceDateInput = function () {
        return this.attendanceDateInput.getAttribute('value');
    }

    rfbEventSelectLastOption = function () {
        this.rfbEventSelect.all(by.tagName('option')).last().click();
    }

    rfbEventSelectOption = function (option) {
        this.rfbEventSelect.sendKeys(option);
    }

    getRfbEventSelect = function () {
        return this.rfbEventSelect;
    }

    getRfbEventSelectedOption = function () {
        return this.rfbEventSelect.element(by.css('option:checked')).getText();
    }

    rfbUserSelectLastOption = function () {
        this.rfbUserSelect.all(by.tagName('option')).last().click();
    }

    rfbUserSelectOption = function (option) {
        this.rfbUserSelect.sendKeys(option);
    }

    getRfbUserSelect = function () {
        return this.rfbUserSelect;
    }

    getRfbUserSelectedOption = function () {
        return this.rfbUserSelect.element(by.css('option:checked')).getText();
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

import monolithic
import time
import unittest


class Test(monolithic.MonolithicTest):
    def step_01_go_to_the_retract_invitation_page(self):
        self.login()
        button = self.browser.find_element_by_xpath(
            "//a[.='Retract Invitations']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/users/retract')
        self.currentUrl = self.domain+'admin/users/retract'

    def step_02_click_refresh_button_and_retract_emails(self):
        refresh = self.browser.find_element_by_xpath(
            "//button[@title='Refresh Tokens List']")
        refresh.click()
        time.sleep(2)

    def step_03_retract_invitation(self):
        retract_button = self.browser.find_element_by_xpath(
            "//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary']")
        retract_button.click()
        time.sleep(2)


if __name__ == '__main__':
    unittest.main(verbosity=2)

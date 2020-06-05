import monolithic
import time
import unittest
from selenium.webdriver.common.keys import Keys


class Test(monolithic.MonolithicTest):
    def step_01_go_to_the_invite_user_page(self):
        self.login()
        button = self.browser.find_element_by_xpath("//a[.='Invite Users']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/users/invite')
        self.createbutton = self.browser.find_element_by_xpath(
            "//button[.='Send Invitation Emails']")
        self.currentUrl = self.domain+'admin/users/invite'

    def step_02_check_if_in_the_same_page_after_empty_button_click(self):
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)

    def step_03_fill_only_invite_users_and_submit(self):
        invitee_list = self.browser.find_element_by_xpath(
            '//textarea')
        invitee_list.send_keys("sasmithadasanayaka96@gmail.com")
        invitee_list.send_keys(Keys.RETURN)
        invitee_list.send_keys("sasmithanilupul.17@cse.mart.ac.lk")
        invitee_list.send_keys(Keys.RETURN)
        time.sleep(1)
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)
        self.clearInputField(invitee_list)

    def step_04_fill_only_role_and_submit(self):
        role = self.browser.find_element_by_xpath("//div[@role='button']")
        role.click()
        student_role = self.browser.find_element_by_xpath("//li[.='Student']")
        student_role.click()
        time.sleep(1)
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)

    def step_05_fill_all_fields_and_submit(self):
        invitee_list = self.browser.find_element_by_xpath(
            '//textarea')
        invitee_list.send_keys("sasmithadasanayaka96@gmail.com")
        invitee_list.send_keys(Keys.RETURN)
        invitee_list.send_keys("sasmithanilupul.17@cse.mart.ac.lk")
        invitee_list.send_keys(Keys.RETURN)
        time.sleep(1)
        role = self.browser.find_element_by_xpath("//div[@role='button']")
        role.click()
        student_role = self.browser.find_element_by_xpath("//li[.='Student']")
        student_role.click()
        time.sleep(1)
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)


if __name__ == '__main__':
    unittest.main(verbosity=2)

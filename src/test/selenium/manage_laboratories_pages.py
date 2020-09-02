import monolithic
import time
import unittest
from random import randrange
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class TestManageLaboratoriesPages(monolithic.MonolithicTest):
    def step_01_go_to_the_create_laboratory_page(self):
        self.login()
        button = self.browser.find_element_by_xpath(
            "//a[.='Create Laboratories']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/labs/createlabs')

    def step_02_find_all_fields(self):
        self.currentUrl = self.domain+'admin/labs/createlabs'
        self.labtitle = 'test lab'+str(randrange(10000))
        self.labtitle2 = 'test lab'+str(randrange(10000))
        self.labsubtitle = 'test lab subtitle'

        self.labtitle_placeholder = self.browser.find_element_by_name(
            'title')
        self.labsubtitle_placeholder = self.browser.find_element_by_name(
            'subTitle')

        self.add_button = self.browser.find_element_by_xpath(
            "//button[.='Create Lab']")

        success_msg = "Lab "+self.labtitle+" created successfully!"
        # success_msg2 = "Lab "+self.labtitle2+" created successfully!"
        error_msg = "Lab with title "+self.labtitle+" already exists."
        # error_msg2 = "Lab with title "+self.labtitle2+" already exists."
        self.xpath = "//div[contains(., %s)] | //div[contains(., %s)]" % (
            self.xpath_string_escape(success_msg), self.xpath_string_escape(error_msg))

    def step_03_check_if_in_does_not_submit_after_empty_button_click(self):
        self.add_button.click()
        time.sleep(1)
        banner_msgs = self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_04_fill_data(self):
        self.labtitle_placeholder.send_keys(self.labtitle)
        self.labsubtitle_placeholder.send_keys(self.labsubtitle)

    def step_05_clear_data(self):
        self.clearInputField(self.labtitle_placeholder)
        self.clearInputField(self.labsubtitle_placeholder)

    def step_06_fill_only_labtitle_and_submit(self):
        self.labtitle_placeholder.send_keys(self.labtitle)
        self.add_button.click()
        time.sleep(1)
        banner_msgs = self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_07_fill_only_labsubtitle_and_submit(self):
        self.clearInputField(self.labtitle_placeholder)
        self.clearInputField(self.labsubtitle_placeholder)
        self.labsubtitle_placeholder.send_keys(self.labsubtitle)
        self.add_button.click()
        time.sleep(1)
        banner_msgs = self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_08_fill_labtitle_labsubtitle_and_submit(self):
        self.clearInputField(self.labtitle_placeholder)
        self.clearInputField(self.labsubtitle_placeholder)
        self.labtitle_placeholder.send_keys(self.labtitle)
        self.labsubtitle_placeholder.send_keys(self.labsubtitle)
        self.add_button.click()
        time.sleep(4)
        banner_msgs = self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) > 0)

    def step_09_go_to_the_assign_staff_members_page(self):
        button = self.browser.find_element_by_xpath(
            "//a[.='Assign Staff Members']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/labs/assignstaff')

    def step_10_click_refresh_button_and_check_superviosor(self):
        time.sleep(1)
        refresh = self.browser.find_element_by_xpath(
            "//button[@title='Refresh Labs']")
        refresh.click()
        time.sleep(5 )
        data = self.browser.find_elements_by_tag_name("td")
        self.assertIn(self.labtitle, [each.text.lower() for each in data])

    def step_11_check_search_bar(self):
        self.search_input = self.browser.find_element_by_xpath(
            '//input[@placeholder="Search"]')
        self.search_input.send_keys(self.labtitle)
        time.sleep(1)
        data = self.browser.find_elements_by_tag_name("td")
        result = [each.text.lower() for each in data]
        self.assertIn(self.labtitle, result)

    def step_12_clear_search_bar_with_close_button(self):
        close_button = self.browser.find_element_by_xpath(
            '//div[@class="MuiInputAdornment-root MuiInputAdornment-positionEnd"]/button')
        close_button.click()
        self.assertEqual(self.search_input.get_attribute('value'), '')

    def step_13_assign_staff_member(self):
        button = self.browser.find_element_by_xpath(
            "//td[.='"+self.labtitle+"']").find_element_by_xpath('../td/div/button[1]')
        button.click()
        time.sleep(2)
        assign_button = self.browser.find_element_by_xpath(
            "//p[.='"+self.correct_email+"']").find_element_by_xpath('..').find_element_by_xpath('..').find_element_by_xpath('../div[2]/button')
        assign_button.click()
        time.sleep(2)
        banner_msgs = self.browser.find_elements_by_xpath(
            "//div[.='Lab Assigned successfully!']")
        self.assertTrue(len(banner_msgs) > 0)

    def step_14_go_to_view_laboratories(self):
        button = self.browser.find_element_by_xpath(
            "//a[.='View Laboratories']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/labs/labs')

    def step_15_find_created_lab(self):
        data = self.browser.find_elements_by_tag_name("td")
        result = [each.text.lower() for each in data]
        self.assertIn(self.labtitle.lower(), result)

    def step_16_check_for_assigned(self):
        button = self.browser.find_element_by_xpath(
            "//b[.='"+self.labtitle.capitalize()+"']").find_element_by_xpath('..').find_element_by_xpath('../td[6]/button[1]')
        button.click()
        time.sleep(1)
        data = self.browser.find_elements_by_xpath(
            "//*[.='"+self.correct_email+"']")
        result = [each.text.lower() for each in data]
        self.assertIn(self.correct_email.lower(), result)

        closebutton = self.browser.find_element_by_xpath(
            "//span[.='Close']").find_element_by_xpath('..')
        closebutton.click()

    def step_17_logout(self):
        self.logout()

    
if __name__ == '__main__':
    unittest.main(verbosity=2)

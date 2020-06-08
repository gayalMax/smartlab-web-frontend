import monolithic
import time
import unittest


class TestManageSupervisorsPages(monolithic.MonolithicTest):
    def step_01_go_to_the_add_supervisor_page(self):
        self.login()
        button = self.browser.find_element_by_xpath("//a[.='Add Supervisors']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/administration/supervisor/add')

    def step_02_find_all_fields(self):
        self.currentUrl = self.domain+'admin/administration/supervisor/add'
        self.firstname = 'John'
        self.lastname = 'Doe'
        self.email = 'johndoe3@abc.com'
        self.banner = '//*[@id="root"]/div/div/div/main/div[1]/div/div[2]/div/div/div/div/div/div[2]'
        self.firstname_placeholder = self.browser.find_element_by_name(
            'firstName')
        self.lastname_placeholder = self.browser.find_element_by_name(
            'lastName')
        self.email_placeholder = self.browser.find_element_by_name('email')
        self.add_button = self.browser.find_element_by_xpath(
            "//button[.='Add Supervisor']")
        success_msg = "Supervisor '"+self.firstname + \
            " "+self.lastname+"' created successfully."
        error_msg = "Supervisor with email "+self.email+" already exists."
        self.xpath = "//div[contains(., %s)] | //div[contains(., %s)]" % (self.xpath_string_escape(
            success_msg), self.xpath_string_escape(error_msg))

    def step_03_check_if_in_does_not_submit_after_empty_button_click(self):
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_04_fill_data(self):
        self.firstname_placeholder.send_keys(self.firstname)
        self.lastname_placeholder.send_keys(self.lastname)
        self.email_placeholder.send_keys(self.email)

    def step_05_clear_data(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)

    def step_06_fill_only_firstname_and_submit(self):
        self.firstname_placeholder.send_keys(self.firstname)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_07_fill_only_lastname_and_submit(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.lastname_placeholder.send_keys(self.lastname)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_08_fill_only_email_and_submit(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.email_placeholder.send_keys(self.email)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_09_fill_firstname_lastname_and_submit(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.firstname_placeholder.send_keys(self.firstname)
        self.lastname_placeholder.send_keys(self.lastname)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_10_fill_only_firstname_email_and_submit(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.firstname_placeholder.send_keys(self.firstname)
        self.email_placeholder.send_keys(self.email)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_11_fill_lastname_email_and_submit(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.lastname_placeholder.send_keys(self.lastname)
        self.email_placeholder.send_keys(self.email)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_12_fill_invalid_email_format(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.firstname_placeholder.send_keys(self.firstname)
        self.lastname_placeholder.send_keys(self.lastname)
        self.email_placeholder.send_keys('fdfad@dfad')
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) == 0)

    def step_13_fill_and_submit_correct(self):
        self.clearInputField(self.firstname_placeholder)
        self.clearInputField(self.lastname_placeholder)
        self.clearInputField(self.email_placeholder)
        self.firstname_placeholder.send_keys(self.firstname)
        self.lastname_placeholder.send_keys(self.lastname)
        self.email_placeholder.send_keys(self.email)
        self.add_button.click()
        time.sleep(1)
        banner_msgs=self.browser.find_elements_by_xpath(self.xpath)
        self.assertTrue(len(banner_msgs) > 0)

    def step_14_go_to_the_list_supervisor_page(self):
        button = self.browser.find_element_by_xpath("//a[.='View Supervisors']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/administration/supervisor/list')
    
    def step_15_click_refresh_button_and_check_superviosor(self):
        refresh = self.browser.find_element_by_xpath(
            "//button[@title='Refresh Supervisors List']")
        refresh.click()
        time.sleep(1)
        data = self.browser.find_elements_by_tag_name("td")
        self.assertIn(self.email, [each.text.lower() for each in data])

    def step_16_check_search_bar(self):
        self.search_input = self.browser.find_element_by_xpath(
            '//input[@placeholder="Search"]')
        self.search_input.send_keys(self.email)
        time.sleep(1)
        data = self.browser.find_elements_by_tag_name("td")
        result = [each.text.lower() for each in data]
        self.assertIn(self.email, result)

    def step_17_clear_search_bar_with_close_button(self):
        close_button = self.browser.find_element_by_xpath(
            '//div[@class="MuiInputAdornment-root MuiInputAdornment-positionEnd"]/button')
        close_button.click()
        self.assertEqual(self.search_input.get_attribute('value'), '')

    def step_18_logout(self):
        self.logout()


if __name__ == '__main__':
    unittest.main(verbosity=2)

import monolithic
import time
import unittest


class TestViewUsersPage(monolithic.MonolithicTest):
    def step_01_go_to_view_users_page(self):
        self.login()
        button = self.browser.find_element_by_xpath("//a[.='View Users']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'admin/administration/users')

    def step_02_find_all_fields(self):
        self.currentUrl = self.domain+'admin/administration/users'
        self.refresh = self.browser.find_element_by_xpath(
            "//button[@title='Refresh Tokens List']")

    def step_03_click_refresh_button_and_check_user(self):
        self.refresh.click()
        time.sleep(2)
        data = self.browser.find_elements_by_tag_name("td")
        self.assertIn(self.correct_email, [each.text.lower() for each in data])

    def step_04_check_search_bar(self):
        search_input = self.browser.find_element_by_xpath(
            '//input[@placeholder="Search"]')
        search_input.send_keys(self.correct_email)
        time.sleep(1)
        data = self.browser.find_elements_by_tag_name("td")
        result = [each.text.lower() for each in data]
        self.assertIn(self.correct_email, result)

    def step_05_clear_search_bar_with_close_button(self):
        close_button = self.browser.find_element_by_xpath(
            '//div[@class="MuiInputAdornment-root MuiInputAdornment-positionEnd"]/button')
        close_button.click()
        search_input = self.browser.find_element_by_xpath(
            '//input[@placeholder="Search"]')
        self.assertEqual(search_input.get_attribute('value'), '')

    def step_06_logout(self):
        self.logout()


if __name__ == '__main__':
    unittest.main(verbosity=2)

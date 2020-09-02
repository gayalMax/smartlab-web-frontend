import monolithic
import time
import unittest


class TestLoginPage(monolithic.MonolithicTest):
    def step_01_go_to_the_login_page(self):
        self.browser.get(self.domain+'login')
        self.assertBrowserTitle('open inventory')

    def step_02_find_all_fields(self):
        self.email = self.browser.find_element_by_name("email")
        self.password = self.browser.find_element_by_name("password")
        self.signin = self.browser.find_element_by_xpath(
            "//button[.='Sign In']")

    def step_03_check_if_in_the_same_page_after_empty_signin(self):
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_04_fill_data(self):
        self.email.send_keys(self.correct_email)
        self.password.send_keys(self.correct_password)

    def step_05_clear_data(self):
        self.clearInputField(self.email)
        self.clearInputField(self.password)

    def step_06_fill_only_email_and_submit(self):
        self.email.send_keys(self.correct_email)
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_07_fill_only_password_and_submit(self):
        self.clearInputField(self.email)
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_08_fill_an_invalid_format_email_and_submit(self):
        self.clearInputField(self.email)
        self.clearInputField(self.password)
        self.email.send_keys('abcd@fdaa')
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_09_fill_an_invalid_email_and_submit(self):
        self.clearInputField(self.email)
        self.clearInputField(self.password)
        self.email.send_keys('abcd@gmail.com')
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_10_fill_an_invalid_password_and_submit(self):
        self.clearInputField(self.email)
        self.clearInputField(self.password)
        self.email.send_keys(self.correct_email)
        self.password.send_keys('fasdfdfa')
        time.sleep(1)
        self.signin.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')

    def step_11_login(self):
        self.clearInputField(self.email)
        self.clearInputField(self.password)
        self.email.send_keys(self.correct_email)
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(2)
        self.assertCurrentUrl(self.domain+'admin/dashboard')
    
    def step_12_logout(self):
        self.logout()


if __name__ == '__main__':
    unittest.main(verbosity=2)

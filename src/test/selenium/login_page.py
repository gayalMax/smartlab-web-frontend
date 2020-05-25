import monolithic
import time
import unittest


class TestLoginPage(monolithic.MonolithicTest):
    def step_01_go_to_the_login_page(self):
        self.browser.get(self.domain+'login')
        self.assertBrowserTitle('open inventory')
    
    def step_02_check_if_in_the_same_page_after_empty_signin(self):
        link = self.browser.find_element_by_xpath("//button[.='Sign In']")
        link.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'login')
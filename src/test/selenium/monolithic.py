import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class MonolithicTest(unittest.TestCase):

    def _steps(self):
        for name in dir(self):
            if name.startswith("step"):
                yield name, getattr(self, name)

    def assertBrowserTitle(self, expected):
        self.assertIn(expected, self.browser.title.lower())

    def assertCurrentUrl(self, expected):
        self.assertIn(expected, self.browser.current_url.lower())

    def assertElementText(self, expected, element):
        self.assertIn(expected.lower(), element.text.lower())

    def clearInputField(self, element):
        while element.get_attribute('value') != '':
            element.send_keys(Keys.BACKSPACE)
    
    def login(self):
        self.browser.get(self.domain+'login')
        self.email = self.browser.find_element_by_name("email")
        self.password = self.browser.find_element_by_name("password")   
        self.signin = self.browser.find_element_by_xpath(
            "//button[.='Sign In']")
        self.email.send_keys(self.correct_email)
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(2)
        self.assertCurrentUrl(self.domain+'admin/dashboard')

    def assertPanelLocked(self, button_id, is_locked):
        locked = True
        button = self.browser.find_element_by_id(button_id)
        button.click()
        time.sleep(1)
        self.browser.switch_to.frame(
            self.browser.find_element_by_id('content-iframe')
        )

        try:
            # If error then Error element does not exist -> Unlocked
            self.browser.find_element_by_id("unverified_text")
        except:
            locked = False

        self.browser.switch_to.default_content()
        self.assertEqual(is_locked, locked)

    def test_steps(self):
        print()
        for name, step in self._steps():
            try:
                test_name = " ".join(name.split('_')[2:])
                print("Running test: {}".format(test_name))
                step()
                time.sleep(1)
            except Exception as e:
                self.fail("{} failed ({}: {})".format(step, type(e), e))

    def setUp(self):
        self.browser = webdriver.Chrome('C:/Users/sasmi/Downloads/New folder/chromedriver.exe')
        self.domain = 'http://localhost:3000/#/'

        # change email, password to valid email,pwds of the system
        self.correct_email = 'admin@admin.com'
        self.correct_password = 'ins'

        self.browser.maximize_window()
        time.sleep(1)
        self.addCleanup(self.browser.quit)

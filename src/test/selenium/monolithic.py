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

    def xpath_string_escape(self, input_str):
        """ creates a concatenation of alternately-quoted strings that is always a valid XPath expression """
        parts = input_str.split("'")
        return "concat('" + "', \"'\" , '".join(parts) + "', '')"

    def login(self):
        self.browser.get(self.domain+'login')
        self.email = self.browser.find_element_by_name("email")
        self.password = self.browser.find_element_by_name("password")
        self.signin = self.browser.find_element_by_xpath(
            "//button[.='Sign In']")
        self.email.send_keys(self.correct_email)
        self.password.send_keys(self.correct_password)
        self.signin.click()
        time.sleep(5)
        self.assertCurrentUrl(self.domain+'admin/dashboard')

    def logout(self):
        iconbutton = self.browser.find_element_by_xpath(
            '//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"]')
        iconbutton.click()
        time.sleep(1)
        logoutbutton = self.browser.find_element_by_xpath(
            '//li[@role="menuitem"][@tabindex="0"]')
        logoutbutton.click()
        time.sleep(2)
        self.assertCurrentUrl(self.domain+'login')

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
        # for linux
        # self.browser = webdriver.Chrome()
        # for Windows specify the path
        self.browser = webdriver.Chrome('C:/chromedriver.exe')
        self.domain = 'https://openinventoryorg.github.io/web-frontend/#/'

        # change email, password to valid email,pwds of the system
        self.correct_email = 'openinventorysystem@gmail.com'
        self.correct_password = 'password'

        self.browser.maximize_window()
        time.sleep(1)
        self.addCleanup(self.browser.quit)

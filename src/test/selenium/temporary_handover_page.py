import monolithic
import time
import unittest


class Test(monolithic.MonolithicTest):
    def step_01_go_to_the_temporary_handover_page(self):
        self.login()
        button = self.browser.find_element_by_xpath(
            "//a[.='Temporary Handover']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(
            self.domain+'admin/tempitems')
        self.currentUrl = self.domain+'admin/tempitems'

    def step_02_click_refresh_button_and_view_lent_items(self):
        refresh = self.browser.find_element_by_xpath(
            "//button[@title='Refresh Lent Items List']")
        refresh.click()
        time.sleep(2)


if __name__ == '__main__':
    unittest.main(verbosity=2)

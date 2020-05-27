import monolithic
import time
import unittest


class TestCreateItemSetsPage(monolithic.MonolithicTest):
    def step_01_go_to_the_create_item_sets_page(self):
        self.browser.get(self.domain+'admin/lab/itemsets/create')
        self.assertBrowserTitle('open inventory')
    
    def step_02_check_if_in_the_same_page_after_empty_inputs(self):
        link = self.browser.find_element_by_xpath("/html/body/div[1]/div/div/div/main/div/div/div[4]/form/div/div[6]/div/button")
        link.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'admin/lab/itemsets/create')
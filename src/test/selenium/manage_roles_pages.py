import monolithic
import time
import unittest


class ManageRolesPages(monolithic.MonolithicTest):
    def step_01_go_to_the_create_new_role_page(self):
        self.login()
        button = self.browser.find_element_by_xpath("//a[.='Create New Role']")
        button.click()
        time.sleep(1)
        self.assertCurrentUrl(self.domain+'admin/administration/roles/create')

    def step_02_find_all_fields(self):
        self.currentUrl = self.domain+'admin/administration/roles/create'
        self.role = 'minor staff'
        self.name = self.browser.find_element_by_name("name")
        self.admin_checkbox = self.browser.find_element_by_xpath(
            "//span[.='Administrator']")
        self.lab_manager_checkbox = self.browser.find_element_by_xpath(
            "//span[.='Lab Manager']")
        self.registrar_checkbox = self.browser.find_element_by_xpath(
            "//span[.='Registrar']")
        self.invent_manager_checkbox = self.browser.find_element_by_xpath(
            "//span[.='Inventory Manager']")
        self.createbutton = self.browser.find_element_by_xpath(
            "//button[.='Create Role']")

    def step_03_check_if_in_the_same_page_after_empty_button_click(self):
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)

    def step_04_fill_data(self):
        self.name.send_keys(self.role)
        self.admin_checkbox.click()
        self.lab_manager_checkbox.click()
        self.registrar_checkbox.click()
        self.invent_manager_checkbox.click()

    def step_05_clear_data(self):
        self.clearInputField(self.name)
        self.admin_checkbox.click()
        self.lab_manager_checkbox.click()
        self.registrar_checkbox.click()
        self.invent_manager_checkbox.click()

    def step_06_fill_only_name_and_submit(self):
        self.name.send_keys(self.role)
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)

    def step_07_fill_only_permissions_and_submit(self):
        self.clearInputField(self.name)
        self.admin_checkbox.click()
        self.registrar_checkbox.click()
        self.createbutton.click()
        time.sleep(1)
        self.assertCurrentUrl(self.currentUrl)

    def step_08_create_role_success(self):
        self.clearInputField(self.name)
        self.admin_checkbox.click()
        self.lab_manager_checkbox.click()
        self.registrar_checkbox.click()
        self.invent_manager_checkbox.click()

        self.name.send_keys(self.role)
        self.admin_checkbox.click()
        self.invent_manager_checkbox.click()

        self.createbutton.click()
        time.sleep(2)
        element = self.browser.find_element_by_xpath(
            '//*[@id="root"]/div/div/div/main/div[1]/div/div[2]/div/div/div/div/div/div[2]')
        expected = "Role '"+self.role+"' created successfully."
        self.assertElementText(expected, element)

    def step_09_create_role_error(self):
        self.clearInputField(self.name)
        self.admin_checkbox.click()
        self.lab_manager_checkbox.click()
        self.registrar_checkbox.click()
        self.invent_manager_checkbox.click()

        self.name.send_keys(self.role)
        self.admin_checkbox.click()
        self.invent_manager_checkbox.click()

        self.createbutton.click()
        time.sleep(2)
        element = self.browser.find_element_by_xpath('//*[@id="root"]/div/div/div/main/div[1]/div/div[1]/div/div/div/div/div/div[2]')
        expected = 'A role with the name '+self.role + \
            ' is already created. Role name must be unique'
        self.assertElementText(expected, element)


if __name__ == '__main__':
    unittest.main(verbosity=2)

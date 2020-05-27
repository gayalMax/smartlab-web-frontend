import unittest
import home_page
import login_page
import manage_roles_pages
import view_users_page
import add_supervisor_page

if __name__ == "__main__":
    test_classes_to_run = [
        home_page.TestHomePage,
        login_page.TestLoginPage,
        manage_roles_pages.ManageRolesPages,
        view_users_page.TestViewUsersPage,
        add_supervisor_page.TestAddSupervisorPage
    ]

    loader = unittest.TestLoader()

    suites_list = []
    for test_class in test_classes_to_run:
        suite = loader.loadTestsFromTestCase(test_class)
        suites_list.append(suite)

    big_suite = unittest.TestSuite(suites_list)
    runner = unittest.TextTestRunner(verbosity=2)
    results = runner.run(big_suite)

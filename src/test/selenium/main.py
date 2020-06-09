import unittest
import home_page
import login_page
import manage_roles_pages
import view_users_page
import manage_supervisors_pages
import manage_laboratories_pages
import create_item_sets_pages
import create_items_pages
import invite_users_page
import retract_invitaitons_page
import temporary_handover_page

if __name__ == "__main__":
    test_classes_to_run = [
        home_page.TestHomePage,
        login_page.TestLoginPage,
        manage_roles_pages.ManageRolesPages,
        view_users_page.TestViewUsersPage,
        manage_supervisors_pages.TestManageSupervisorsPages,
        manage_laboratories_pages.TestManageLaboratoriesPages,
        create_item_sets_pages.TestCreateItemSetsPage,
        create_items_pages.TestCreateItemSetsPage,
        invite_users_page.TestInviteUsersPage,
        retract_invitaitons_page.TestRetractInvitationPage,
        temporary_handover_page.TestTemporaryHandoverPage
    ]

    loader = unittest.TestLoader()

    suites_list = []
    for test_class in test_classes_to_run:
        suite = loader.loadTestsFromTestCase(test_class)
        suites_list.append(suite)

    big_suite = unittest.TestSuite(suites_list)
    runner = unittest.TextTestRunner(verbosity=2)
    results = runner.run(big_suite)

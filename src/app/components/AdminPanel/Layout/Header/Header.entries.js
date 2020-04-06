/**
 * Entries which describe header text.
 * The entries list is access left-to-right.
 * The function will look for the first element that the current route starts with
 * and apply it.
 * So, child routes should come first.
 *
 * eg:`/a/b` should come before `/a`.
 */
const entries = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard'
  },
  {
    path: '/admin/administration/users',
    name: 'View Users'
  },
  {
    path: '/admin/users/invite',
    name: 'Invite Users'
  },
  {
    path: '/admin/users/retract',
    name: 'Retract Invitations'
  },
  {
    path: '/admin/administration/roles/create',
    name: 'Create New Role'
  },
  {
    path: '/admin/administration/roles/delete',
    name: 'View Roles'
  },
  {
    path: '/admin/lab/itemsets/create',
    name: 'Create Item Sets'
  }
];

export default entries;

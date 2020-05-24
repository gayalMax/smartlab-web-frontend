const developmentMode = process.env.NODE_ENV === 'development';

// Change server path depending on the mode (dev/prod)
let server = 'https://open-inventory-system.herokuapp.com';
if (developmentMode) server = 'http://localhost:8000';

export const SERVER = server;
export const SERVER_SIGN_IN = '/api/login';
export const SERVER_REQUEST_INVITATION = '/api/registration/verify';
export const SERVER_SIGN_UP = '/api/registration/register';
export const SERVER_GET_ROLES = '/api/registrar/roles';
export const SERVER_GET_ROLES_ALL = '/api/roles/list';
export const SERVER_GET_USERS_ALL = '/api/users/list';
export const SERVER_GET_LABS_ALL = '/api/labs/list';
export const SERVER_GET_PERMISSIONS = '/api/permissions/list';
export const SERVER_POST_TOKEN = '/api/registrar/token';
export const SERVER_CREATE_ROLE = '/api/roles/create';
export const SERVER_GET_TOKENS = '/api/registrar/token';
export const SERVER_DELETE_TOKENS = '/api/registrar/token';
export const SERVER_DELETE_ROLE = '/api/roles';
export const SERVER_CREATE_LAB = '/api/labs/create';
export const SERVER_SYNC_LAB = '/api/labs/list';
export const SERVER_GET_USER_LABS = '/api/users/assignedlabs';
export const SERVER_CREATE_ITEMSET = '/api/itemsets/create';
export const SERVER_GET_ITEMSETS_ALL = '/api/itemsets/list';
export const SERVER_CREATE_ITEM = '/api/items/create';
export const SERVER_GET_ITEMS_ALL = '/api/items/list';
export const SERVER_SYNC_LENTITEMS_ALL = '/api/labs/list'; // TODO
export const SERVER_SYNC_ITEM_REQUESTS_ALL = '/api/requestitems/lab/list';
export const SERVER_LEND_ITEM = '/api/requestitems/lend'; // check
export const SERVER_RETURN_ITEM = '/api/requestitems/return';
export const SERVERE_ASSIGN_STAFF = '/api/labs/assign';
export const SERVERE_UNASSIGN_STAFF = '/api/labs/unassign';
export const SERVER_GET_MANAGERS_ALL = '/api/users/list/inventorymanagers';
export const SERVER_CREATE_SUPERVISOR = '/api/supervisors';
export const SERVER_GET_SUPERVISORS = '/api/supervisors';
export const SERVER_DELETE_SUPERVISOR = '/api/supervisors';
export const SERVER_GET_REQUEST_ITEM = '/api/requestitems';
export const SERVER_ACCEPT_REQUEST_ITEM = '/api/requestitems/review';

export const ROLE_STUDENT = 'Student';

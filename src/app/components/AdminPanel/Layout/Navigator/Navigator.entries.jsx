import React from 'react';
import {
  AiOutlineUnlock,
  AiOutlineUsergroupAdd,
  AiOutlineLaptop,
  AiOutlineIdcard,
  AiOutlineDiff,
  AiOutlineFileText,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiOutlineSearch,
  AiOutlineSwap,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDashboard,
  AiOutlineBlock
} from 'react-icons/ai';

/**
 * Entries which describe sidebar.
 * `id` should be unique and is also taken as the sidebar text.
 * `route` is required. To do nothing pass '#'.
 */
const entries = [
  {
    id: 'Account',
    permissions: null,
    children: [
      {
        id: 'Dashboard',
        icon: <AiOutlineDashboard />,
        route: '/admin/dashboard'
      },
      {
        id: 'My Profile',
        icon: <AiOutlineUser />,
        route: '#'
      },
      {
        id: 'Logout',
        icon: <AiOutlineLogout />,
        route: '#'
      }
    ]
  },
  {
    id: 'Administration',
    permissions: ['ADMINISTRATOR'],
    children: [
      {
        id: 'Create New Role',
        icon: <AiOutlineUnlock />,
        route: '/admin/administration/roles/create'
      },
      {
        id: 'Manage Roles',
        icon: <AiOutlineBlock />,
        route: '/admin/administration/roles/delete'
      },
      {
        id: 'View Users',
        icon: <AiOutlineUsergroupAdd />,
        route: '/admin/administration/users'
      },
      {
        id: 'Add Supervisors',
        icon: <AiOutlineUsergroupAdd />,
        route: '/admin/administration/supervisor/add'
      },
      {
        id: 'Views Supervisors',
        icon: <AiOutlineUsergroupAdd />,
        route: '/admin/administration/supervisor/list'
      }
    ]
  },
  {
    id: 'Lab Management',
    permissions: ['LAB_MANAGER'],
    children: [
      {
        id: 'Create Laboratories',
        icon: <AiOutlineIdcard />,
        route: '/admin/labs/createlabs'
      },
      {
        id: 'View Laboratories',
        icon: <AiOutlineLaptop />,
        route: '/admin/labs/labs'
      },
      {
        id: 'Assign Staff Members',
        icon: <AiOutlineIdcard />,
        route: '/admin/labs/assignstaff'
      }
    ]
  },
  {
    id: 'Item Management',
    permissions: ['LAB_MANAGER', 'INVENTORY_MANAGER'],
    children: [
      {
        id: 'Create Item Sets',
        icon: <AiOutlineDiff />,
        route: '/admin/lab/itemsets/create'
      },
      {
        id: 'View Item Sets',
        icon: <AiOutlineDiff />,
        route: '/admin/itemset/list'
      },
      {
        id: 'Create Items',
        icon: <AiOutlineFileText />,
        route: '/admin/items/create'
      },
      {
        id: 'View Items',
        icon: <AiOutlineFileText />,
        route: '/admin/items/list'
      }
    ]
  },
  {
    id: 'Account Registration',
    permissions: ['REGISTRAR'],
    children: [
      {
        id: 'Invite Users',
        icon: <AiOutlinePlusSquare />,
        route: '/admin/users/invite'
      },
      {
        id: 'Retract Invitations',
        icon: <AiOutlineMinusSquare />,
        route: '/admin/users/retract'
      }
    ]
  },
  {
    id: 'Inventory Management',
    permissions: ['INVENTORY_MANAGER'],
    children: [
      {
        id: 'Search Items',
        icon: <AiOutlineSearch />,
        route: '#'
      },
      {
        id: 'Lend Items',
        icon: <AiOutlineSwap />,
        route: '/admin/lenditems/lend'
      },
      {
        id: 'Temporary Handover',
        icon: <AiOutlineClockCircle />,
        route: '#'
      },
      {
        id: 'View lent Items',
        icon: <AiOutlineFileText />,
        route: '/admin/lentitems/list'
      }
    ]
  }
];

export default entries;

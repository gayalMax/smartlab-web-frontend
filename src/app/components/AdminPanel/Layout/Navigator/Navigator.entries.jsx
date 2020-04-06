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
    children: [
      {
        id: 'Create New Role',
        icon: <AiOutlineUnlock />,
        route: '/admin/administration/roles/create'
      },
      {
        id: 'View Roles',
        icon: <AiOutlineBlock />,
        route: '/admin/administration/roles/delete'
      },
      {
        id: 'Manage Users',
        icon: <AiOutlineUsergroupAdd />,
        route: '/admin/administration/users'
      }
    ]
  },
  {
    id: 'Lab Management',
    children: [
      {
        id: 'Manage Laboratories',
        icon: <AiOutlineLaptop />,
        route: '#'
      },
      {
        id: 'Assign Staff Members',
        icon: <AiOutlineIdcard />,
        route: '#'
      }
    ]
  },
  {
    id: 'Item Management',
    children: [
      {
        id: 'Create Item Sets',
        icon: <AiOutlineDiff />,
        route: '/admin/lab/itemsets/create'
      },
      {
        id: 'Delete Item Sets',
        icon: <AiOutlineDiff />,
        route: '#'
      },
      {
        id: 'Create Items',
        icon: <AiOutlineFileText />,
        route: '#'
      },
      {
        id: 'Delete Items',
        icon: <AiOutlineFileText />,
        route: '#'
      }
    ]
  },
  {
    id: 'Account Registration',
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
    children: [
      {
        id: 'Search Items',
        icon: <AiOutlineSearch />,
        route: '#'
      },
      {
        id: 'Lend Item',
        icon: <AiOutlineSwap />,
        route: '#'
      },
      {
        id: 'Temporary Handover',
        icon: <AiOutlineClockCircle />,
        route: '#'
      }
    ]
  }
];

export default entries;

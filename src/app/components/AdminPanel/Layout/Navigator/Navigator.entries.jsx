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
  AiOutlineDashboard
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
        id: 'Manage Roles',
        icon: <AiOutlineUnlock />,
        route: '#'
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
        id: 'Create Laboratories',
        icon: <AiOutlineIdcard />,
        route: '/admin/labs/createlabs'
      },
      {
        id: 'Assign Staff Members',
        icon: <AiOutlineIdcard />,
        route: '#'
      },
      {
        id: 'Manage Item Sets',
        icon: <AiOutlineDiff />,
        route: '#'
      },
      {
        id: 'Manage Items',
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
        route: '#'
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

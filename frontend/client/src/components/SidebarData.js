import React from 'react';
import { SlPaperPlane } from 'react-icons/sl'
import { HiMagnifyingGlass, HiOutlineSquares2X2 } from 'react-icons/hi2'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsBarChart } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'

export const SidebarData = [
    {
      title: 'Feed',
      path: '/',
      icon: <HiOutlineSquares2X2 />,
      cName: 'nav-text'
    },
    {
      title: 'Explore',
      path: '/explore',
      icon: <HiMagnifyingGlass />,
      cName: 'nav-text'
    },
    {
      title: 'Notifications',
      path: '/notifications',
      icon: <IoMdNotificationsOutline />,
      cName: 'nav-text',
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: <SlPaperPlane />,
      cName: 'nav-text',
    },
    {
      title: 'Stats',
      path: '/stats',
      icon: <BsBarChart />,
      cName: 'nav-text'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <FiSettings />,
      cName: 'nav-text'
    }
  ];
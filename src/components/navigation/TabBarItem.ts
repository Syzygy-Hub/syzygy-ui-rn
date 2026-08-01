import React from 'react';

/** A single destination shown in `TabBar` or `BottomNavigationBar`. */
export interface TabBarItem<T> {
  tag: T;
  icon: React.ReactNode;
  label: string;
}

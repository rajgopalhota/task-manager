import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className='bg-slate-900 shadow-md text-center text-slate-200'>
      Task Management App ©2025
    </Footer>
  );
};

export default AppFooter;

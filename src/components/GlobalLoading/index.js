import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import './GlobalLoading.css';

function GlobalLoading() {
  const loading = useSelector((state) => state.GlobalReducer.isLoading);
  if (loading === true) {
    return (
      <div className='loading-container'>
        <Spin size='large' />
      </div>
    );
  } else return null;
}
export default GlobalLoading;

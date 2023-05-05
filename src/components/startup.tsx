// AnimatedLogo.js

import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const Startup = () => {
  const [showLogo, setShowLogo] = useState(false);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src="https://s12.gifyu.com/images/dribbble-video2.gif" alt="logo" width={400} height={'auto'} />
    </div>
  );
};

export default Startup;

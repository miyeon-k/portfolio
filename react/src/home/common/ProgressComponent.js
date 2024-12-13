import React, { useState, useEffect } from 'react'

const ProgressComponent = props => {
  
	const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

    return (
			<div className='progress'>
				<div className='box'>
					<div></div>
					<div></div>
					<div></div>
					<p></p>
					<p></p>
					<p></p>
					<span>Loading</span>
				</div>
			</div>
    )
}

export default ProgressComponent
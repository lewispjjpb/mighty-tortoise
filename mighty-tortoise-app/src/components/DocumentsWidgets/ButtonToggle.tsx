import { Button } from '@mui/material';
import { useState } from 'react';

export const ButtonToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setIsToggled(!isToggled)}
        style={{ marginBottom: '1rem' }}
      >
        {isToggled ? 'Hide Content' : 'Show Content'}
      </Button>

      <div
      >
        <h4>Toggleable Content</h4>
        <p>This content changes based on the button state!</p>
        <p>Current state: <strong>{isToggled ? 'Visible' : 'Hidden'}</strong></p>
      </div>
    </div>
  );
};

import { useState } from 'react';
import Button from './Button';
import CreateModal from './CreateModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <h1>Create your family tree</h1>
      <Button
        text={'add member'}
        click={handleOpenCreateModal}
      />
      {isOpen && (
        <CreateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </nav>
  );
};

export default Header;

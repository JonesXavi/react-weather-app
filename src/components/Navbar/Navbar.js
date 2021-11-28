import { useContext } from 'react';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import { ThemeContext } from '../../contexts/theme';

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);

  return (
    <nav className='center nav'>
      <button
        type='button'
        onClick={toggleTheme}
        className='button button--icon'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>
    </nav>
  )
}

export default Navbar;

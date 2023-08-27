import { useTheme } from 'next-themes';

export const ThemeConfigurator = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {theme === 'light' ? (
        <button className="switcher__btn shadow-box">
          <i className="iconoir-light-bulb-off" onClick={handleToggle} />
        </button>
      ) : (
        <button className="switcher__btn shadow-box">
          <i className="iconoir-light-bulb-on" onClick={handleToggle} />
        </button>
      )}
    </>
  );
};

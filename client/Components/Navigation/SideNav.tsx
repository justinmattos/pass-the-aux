import React, { useState, useRef, useLayoutEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SideNavDiv, SideNavComplement, SideMenuOption } from '../../styles';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { Toggle } from '../Utils';
import { collapse, setDark, setLight } from '../../store';

const SideNav = () => {
  // redux store
  const { expanded, styleOpt } = useTypedSelector((state) => ({
    expanded: state.menu.expanded,
    styleOpt: state.styleOpt.value,
  }));
  const dispatch = useTypedDispatch();

  // react-router
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  // local state for slideout position
  const [slideoutX, setSlideoutX] = useState(3000);
  const slideout = useRef(null);
  useLayoutEffect((): void => {
    if (!slideout.current) return;
    const width = slideout.current.offsetWidth;
    if (slideoutX !== width) setSlideoutX(width);
  });

  // toggleControl function for changing light/dark mode
  const toggleSwitch = (): void => {
    let newStyleOpt;
    if (styleOpt === 'dark') {
      newStyleOpt = 'light';
      dispatch(setLight());
    }
    if (styleOpt === 'light') {
      newStyleOpt = 'dark';
      dispatch(setDark());
    }
    window.localStorage.setItem('styleOpt', newStyleOpt);
  };

  // navigate function for taking users to new pages via nav
  const navigate = (pathname: string): void => {
    dispatch(collapse());
    history.push(pathname);
  };

  return (
    <>
      <SideNavDiv
        ref={slideout}
        initial="hidden"
        animate={expanded ? 'visible' : 'hidden'}
        variants={{
          visible: { x: 0 },
          hidden: { x: -slideoutX },
        }}
        transition={{
          ease: 'easeIn',
          duration: 0.6,
        }}
      >
        <div>
          {[
            ['/', 'Home'],
            ['/player', 'Player'],
          ].map(([path, pageName], idx) => (
            <SideMenuOption
              key={idx}
              onClick={() => navigate(path)}
              selected={pathname === path}
            >
              {pageName}
            </SideMenuOption>
          ))}
        </div>
        <SideMenuOption>
          <div>Toggle Dark Mode</div>
          <Toggle toggleControl={toggleSwitch} />
        </SideMenuOption>
      </SideNavDiv>
      {expanded ? (
        <SideNavComplement onClick={() => dispatch(collapse())} />
      ) : (
        ''
      )}
    </>
  );
};

export default SideNav;

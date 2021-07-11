import React, { useState, useRef, useLayoutEffect } from 'react';
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

  // local state
  const [slideoutX, setSlideoutX] = useState(3000);
  const slideout = useRef(null);

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

  useLayoutEffect(() => {
    if (!slideout.current) return;
    const width = slideout.current.offsetWidth;
    if (slideoutX !== width) setSlideoutX(width);
  });

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
          {Array(5)
            .fill('')
            .map((_, idx) => idx + 1)
            .map((val) => {
              return (
                <SideMenuOption key={val} selected={val === 3}>
                  {val}
                </SideMenuOption>
              );
            })}
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

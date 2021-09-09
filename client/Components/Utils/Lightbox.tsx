import React, { FunctionComponent } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useTypedSelector } from '../../hooks';
import { IconContainer, LightboxShadow, LightboxContent } from '../../styles';

interface LightboxProperties {
  visible: boolean;
  Content: FunctionComponent;
  closeFunc: () => void;
}

const Lightbox = ({ visible, Content, closeFunc }: LightboxProperties) => {
  const { styleOpt } = useTypedSelector((state) => ({
    styleOpt: state.styleOpt.value,
  }));
  return (
    <LightboxShadow
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        visible: {
          opacity: 1,
          zIndex: 1,
          transition: {
            duration: 0.5,
          },
        },
        hidden: {
          opacity: 0,
          zIndex: -1,
          transition: {
            duration: 1,
          },
        },
      }}
      // onClick={() => closeFunc()} Need this to not fire when clicking within content
    >
      <LightboxContent
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        transition={{ duration: 1 }}
        variants={{
          visible: { scale: 1, transition: { duration: 1 } },
          hidden: { scale: 0, transition: { duration: 0.1 } },
        }}
      >
        <IconContainer style={{ position: 'relative' }}>
          <XIcon
            onClick={() => closeFunc()}
            height="1rem"
            width="1rem"
            style={{
              position: 'absolute',
              top: '0',
              right: '1rem',
            }}
          />
        </IconContainer>
        <Content />
      </LightboxContent>
    </LightboxShadow>
  );
};

export default Lightbox;

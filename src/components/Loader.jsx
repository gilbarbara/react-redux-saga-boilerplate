import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { appColor } from 'modules/theme';

const options = {
  size: '2rem',
  speed: '1s',
  width: '10rem',
};

const pulse = keyframes`
  0% {
    height: 0;
    width: 0;
  }

  30% {
    border-width: 0.8rem;
    height: ${options.size};
    opacity: 1;
    width: ${options.size};
  }

  100% {
    border-width: 0;
    height: ${options.size};
    opacity: 0;
    width: ${options.size};
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

const LoaderPulse = styled.div`
  height: ${options.size};
  margin: 1.5rem auto;
  position: relative;
  width: ${options.size};

  > div {
    animation: ${pulse} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    border: 0 solid ${appColor};
    border-radius: 50%;
    box-sizing: border-box;
    height: 0;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
  }
`;

const LoaderRotate = styled.div`
  height: ${options.width};
  margin: 1.5rem auto;
  width: ${options.width};
`;

const LoaderRotateSVG = styled.svg`
  animation: ${rotate} 2s linear infinite;
  height: ${options.width};
  width: ${options.width};
`;

const LoaderRotateCircle = styled.circle`
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke: #333;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-miterlimit: 10;
`;

const Loader = ({ type }) => {
  let html;

  if (type === 'rotate') {
    html = (
      <LoaderRotate>
        <LoaderRotateSVG>
          <LoaderRotateCircle cx="50" cy="50" r="20" fill="none" strokeWidth="2" />
        </LoaderRotateSVG>
      </LoaderRotate>
    );
  } else {
    html = (
      <LoaderPulse>
        <div />
      </LoaderPulse>
    );
  }

  return html;
};

Loader.propTypes = {
  type: PropTypes.string,
};

Loader.defaultProps = {
  type: 'pulse',
};

export default Loader;

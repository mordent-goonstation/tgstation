/**
 * @file
 * @copyright 2020 mordent.goonstation@gmail.com
 * @license ISC
 */

import { map, zipWith } from 'common/collections';
import { pureComponentHooks } from 'common/react';
import { Component, createRef } from 'inferno';
import { Box } from '../Box';

const normalizeData = (data, scale, rangeX, rangeY) => {
  if (data.length === 0) {
    return [];
  }
  const min = zipWith(Math.min)(...data);
  const max = zipWith(Math.max)(...data);
  if (rangeX !== undefined) {
    min[0] = rangeX[0];
    max[0] = rangeX[1];
  }
  if (rangeY !== undefined) {
    min[1] = rangeY[0];
    max[1] = rangeY[1];
  }
  const normalized = map(point => {
    return zipWith((value, min, max, scale) => {
      return (value - min) / (max - min) * scale;
    })(point, min, max, scale);
  })(data);
  return normalized;
};

const dataToAscii = data => {
  return data;
};

class AsciiChart extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.state = {
      // Initial guess
      viewBox: [600, 200],
    };
    this.handleResize = () => {
      const element = this.ref.current;
      this.setState({
        viewBox: [element.offsetWidth, element.offsetHeight],
      });
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const {
      data = [],
      rangeX,
      rangeY,
      strokeColor = '#ffffff',
      ...rest
    } = this.props;
    const { viewBox } = this.state;
    const normalized = normalizeData(data, viewBox, rangeX, rangeY);
    const points = dataToAscii(normalized);
    return (
      <Box position="relative" {...rest}>
        {props => (
          <div ref={this.ref} {...props}>
            {JSON.stringify(points)}
          </div>
        )}
      </Box>
    );
  }
}

AsciiChart.defaultHooks = pureComponentHooks;

export {
  AsciiChart,
};

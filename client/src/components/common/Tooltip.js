import React from 'react';
import { Tooltip } from 'react-bootstrap';

const InfoIconWithTooltip = ({ anchorId, tooltipContent, tooltipStyle }) => {
  return (
      <Tooltip anchorSelect={`#${anchorId}`} style={tooltipStyle}>
        {tooltipContent}
      </Tooltip>
  );
};

export default InfoIconWithTooltip;
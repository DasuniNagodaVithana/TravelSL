import React from 'react';

type SubtitleProps = {
  Subtitle: string;
};

const Subtitle: React.FC<SubtitleProps> = ({ Subtitle }) => {
  return (
    <h3 className="section__subtitle">{Subtitle}</h3>
  );
};

export default Subtitle;

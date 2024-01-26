import React from 'react';
import ChipSubject from '../components/ui-chip-subject/ChipSubject';

export default function Home() {
  return (
    <div>
      <div>
        <ChipSubject label="프로젝트" onClick={() => console.log('')} />
      </div>
      <div>
        <ChipSubject label="일반" onClick={() => console.log('')} />
      </div>
      <div>
        <ChipSubject label="백엔드" onClick={() => console.log('')} />
      </div>
      <div>
        <ChipSubject label="상" onClick={() => console.log('')} />
      </div>
    </div>
  );
}



import React, { useState, useEffect } from 'react';

const ConfigureComponent = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (response !== '') {
      const outputStream = new WritableStream({
        write(chunk) {
          console.log(chunk);
        },
      });

      const writer = outputStream.getWriter();
      writer.write(response);
      writer.close();
    }
  }, [response]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue !== '') {
      setResponse(inputValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={response}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ConfigureComponent;
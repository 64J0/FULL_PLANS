import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { Container } from './styles';

export default function PasswordInput({ name, placeholder, id, value, setValue }) {
  const [visibility, setVisibility] = useState(false);

  return (
    <Container>
      <input
        className="passwordInput"
        type={visibility ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={(e) => { setValue(e.target.value) }}
        value={value}
      />
      <button onClick={() => setVisibility(!visibility)} type="button">
        {visibility ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </Container>
  );
}
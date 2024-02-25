import React from 'react'

function SubmitButton({disabletValue,handleClickValidation}) {
  return <input onClick={handleClickValidation} type="submit" disabled = {disabletValue}  />
}

export default SubmitButton

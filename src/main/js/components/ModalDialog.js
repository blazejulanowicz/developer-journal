const React = require('react');

const ModalDialog = ({dialogName, inputOptions, onSubmit, isVisible}) => {

    const [formInputs, setFormInputs] = React.useState([]);
    const dialogRef = React.createRef();

    React.useEffect(() => {

        //TODO: Check if inputOptions >= 1

        let inputs = inputOptions.map(element => {
            let newInput = {};
            newInput.ref = React.createRef();
            newInput.htmlTag = <input key={newInput.ref} placeholder={element.placeholder} type={element.type} ref={newInput.ref}/>;
            return newInput;
        });

        setFormInputs(inputs);
        dialogRef.current.style.display = isVisible ? 'block' : 'none';
    }, [isVisible]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let returnValues =  formInputs.map(input => {
           return input.ref.current.value;
        });
        dialogRef.current.style.display = 'none';
        console.debug(returnValues);
        onSubmit(returnValues);
    };

    return(
      <div className='dialog-modal' ref={dialogRef}>
          <form id='modal-dialog-form'>
              <h4>{dialogName}</h4>
              {formInputs.map(input => input.htmlTag)}
              <button className='button' onClick={handleSubmit}>Submit</button>
          </form>
      </div>
    );

}

module.exports = ModalDialog;
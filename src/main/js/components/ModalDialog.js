const React = require('react');

const ModalDialog = ({dialogName, inputOptions, onSubmit, isVisible}) => {

    const [formInputs, setFormInputs] = React.useState([]);
    const dialogRef = React.createRef();

    React.useEffect(() => {

        //TODO: Check if inputOptions >= 1

        let inputs = inputOptions.map(element => {
            let newInput = {};
            newInput.ref = React.createRef();
            if(element.inputType === 'dropdown') {
                let options = element.options.map(option => <option key={option.key} value={option.value}>{option.text}</option>);
                options.push(<option selected disabled>Choose project...</option>);
                newInput.htmlTag = <select key={newInput.ref} ref={newInput.ref}>{options}</select>;
                console.debug(options);
            }
            else if(element.inputType === 'manual') {
                newInput.htmlTag = <input key={newInput.ref} placeholder={element.placeholder} type={element.type} ref={newInput.ref}/>;
            }
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
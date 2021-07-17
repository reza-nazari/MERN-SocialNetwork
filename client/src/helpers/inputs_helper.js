const input_helper = (() => {

    return {
        changedHandler
    }

    function changedHandler(event, inputIdentifier, form, setForm){
        const updatedOrderForm = {
            ...form,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation,
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[inputIdentifier].valid && isValid;
        }

        setForm({
            ...form,
            [inputIdentifier]: updatedOrderForm[inputIdentifier],
        });
        
        return isValid;
    };

    
    function checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    };

})();

export {
    input_helper
}
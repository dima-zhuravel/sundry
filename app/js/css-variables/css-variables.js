const DynamicVariables = function() {
    this.arrInputs = document.querySelectorAll('.variables__item-input');
};

DynamicVariables.prototype.handleInputs = function() {
    function handleUpdate() {
        const suffix = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

    }

    this.arrInputs.forEach((inputs) => {
        inputs.addEventListener('change', handleUpdate);
        inputs.addEventListener('mousemove', handleUpdate);
    });
};

module.exports = DynamicVariables;
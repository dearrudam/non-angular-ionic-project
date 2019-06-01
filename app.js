const inputReason = document.querySelector('#input-reason');
const inputAmount = document.querySelector('#input-amount');
const btnCancel = document.querySelector('#btn-cancel');
const btnConfirm = document.querySelector('#btn-confirm');
const expensesList = document.querySelector('#expenses-list')
const totalExpensesOutput = document.querySelector('#total-expenses');

const alertController = document.querySelector('ion-alert-controller');

let totalExpenses = 0;

const updateTotalExpenses = () => {
    totalExpensesOutput.textContent = `$${totalExpenses}`;
};

const resetInputs = () => {
    inputAmount.value = '';
    inputReason.value = '';
}

btnCancel.addEventListener('click', releaseEvents);

btnConfirm.addEventListener('click', () => {

    const enteredReason = inputReason.value;
    const enteredAmount = inputAmount.value;

    if (
        enteredReason.trim().length <= 0 ||
        enteredAmount == 0 ||
        enteredAmount.trim().length <= 0
    ) {
        alertController.create({
            header: 'Invalid Inputs',
            message: 'Please, provide valid inputs.',
            buttons: ['OK']
        })
            .then((alert) => {
                alert.present();
            });

        return;
    }

    const newItem = document.createElement('ion-item');
    newItem.textContent = `${enteredReason} : $${enteredAmount}`;
    newItem.addEventListener('click', () => {

        alertController.create(
            {
                header: 'Expense removing',
                message: 'This action will remove this expense. Are you sure?',
                buttons: [
                    {
                        text: 'No',
                        cssClass: 'danger'
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            expensesList.removeChild(newItem);
                            totalExpenses -= +enteredAmount;
                            updateTotalExpenses();
                        }
                    }
                ]
            })
            .then((alert) => {
                alert.present();
            });

    });

    expensesList.appendChild(newItem);
    totalExpenses += +enteredAmount;
    updateTotalExpenses();
    resetInputs();

});
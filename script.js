const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const showExpensesButton = document.getElementById('show-expenses');
const clearExpensesButton = document.getElementById('clear-expenses');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const month = document.getElementById('month').value.trim();
    const expenseName = document.getElementById('expense-name').value.trim();
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    
    if (month && expenseName && !isNaN(expenseAmount)) {
        expenses.push({ month, name: expenseName, amount: expenseAmount });
        saveExpenses();
        expenseForm.reset();
        alert('Expense added successfully!');
    } else {
        alert('Please enter valid expense details.');
    }
});

showExpensesButton.addEventListener('click', function() {
    const month = document.getElementById('month').value.trim();
    const filteredExpenses = expenses.filter(expense => expense.month.toLowerCase() === month.toLowerCase());

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = '<p>No expenses recorded for this month.</p>';
        return;
    }

    let total = 0;
    expenseList.innerHTML = `<h2>Expenses for ${month}:</h2>`;
    filteredExpenses.forEach(expense => {
        total += expense.amount;
        expenseList.innerHTML += `<p>${expense.name}: ₹${expense.amount.toFixed(2)}</p>`;
    });
    expenseList.innerHTML += `<h3>Total: ₹${total.toFixed(2)}</h3>`;
});

// Clear all expenses
clearExpensesButton.addEventListener('click', function() {
    expenses = [];
    saveExpenses();
    expenseList.innerHTML = '<p>All expenses cleared.</p>';
});
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

showExpensesButton.addEventListener('click', function() {
    const month = document.getElementById('month').value.trim();

    if (!month) {
        modal.style.display = 'flex'; 
        return;
    }

    const filteredExpenses = expenses.filter(expense => expense.month.toLowerCase() === month.toLowerCase());

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = '<p>No expenses recorded for this month.</p>';
        return;
    }

    let total = 0;
    expenseList.innerHTML = `<h2>Expenses for ${month}:</h2>`;
    filteredExpenses.forEach(expense => {
        total += expense.amount;
        expenseList.innerHTML += `<p>${expense.name}: ₹${expense.amount.toFixed(2)}</p>`;
    });
    expenseList.innerHTML += `<h3>Total: ₹${total.toFixed(2)}</h3>`;
});

closeButton.addEventListener('click', function() {
    modal.style.display = 'none'; // Hide the modal
});
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

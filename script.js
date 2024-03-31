document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
          const li = document.createElement('li');
          li.innerHTML = `
            <span>Description: ${expense.text}</span><br>
            <span>Amount: ${expense.amount}</span><br><br>
            <button class="edit" data-id="${index}">Edit</button>
            <button class="delete" data-id="${index}">Delete</button>
          `;
          expenseList.appendChild(li);
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
      }
    expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = document.getElementById('expenseText').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (text && amount) {
      expenses.push({ text, amount });
      displayExpenses();
      expenseForm.reset();
    } else {
      alert('Please enter both description and amount.');
    }
    });
    
    expenseList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
      const id = event.target.dataset.id;
      const newText = prompt('Enter new description:');
      const newAmount = parseFloat(prompt('Enter new amount:'));
      if (newText && newAmount) {
        expenses[id].text = newText;
        expenses[id].amount = newAmount;
        displayExpenses();
      } else {
        alert('Please enter both description and amount.');
      }
    }
    if (event.target.classList.contains('delete')) {
      const id = event.target.dataset.id;
      expenses.splice(id, 1);
      displayExpenses();
    }
    });
    displayExpenses();
    });
    
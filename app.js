let totalAmount = document.getElementById("total-amount");
let newCategory = document.getElementById("add-category");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const categoryButton = document.getElementById("btn-category");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const errorMessage2 = document.getElementById("category-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const date = document.getElementById("input-date");
// Set Budget Part:
let tempAmount = 0;

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    }
    else {
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        // console.log(expenditureValue.innerText);
        totalAmount.value = "";
    }
})

// function to add expences:

checkAmountButton.addEventListener("click", () => {
    // empty check:
    // console.log(date.format("dd/MM/yyyy"));
    if (!userAmount.value || !productTitle.value || productTitle.value === "Select" || !date.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    else {
        productTitleError.classList.add("hide");
        // Enable buttons:
        disableButton(false);
        // Expense:
        let expenditure = parseInt(userAmount.value);
        // Total expense (existing + new)
        let sum = parseInt(expenditureValue.innerText) + expenditure;
        expenditureValue.innerText = sum;
        // Total Balance (budget - total expense)
        const totalBalance = tempAmount - sum;
        balanceValue.innerText = totalBalance;
        // Create list
        listCreator(productTitle.value, userAmount.value, date.value);
        // Empty inputs:
        productTitle.value = "Select";
        userAmount.value = "";
        date.value = "";
    }
})

// fucntion to disable edit and delete buttons:

const disableButton = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    // console.log(editButtons);
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
}
// function to create list:

const listCreator = (expenceName, expenceValue, expenceDate) => {
    let sublistContent = document.createElement("div");
    let sublistContent2 = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    list.appendChild(sublistContent2);
    sublistContent.innerHTML = `<p class="product">${expenceName}</p>
    <p class="amount">${expenceValue}</p>`;
    sublistContent2.innerHTML = `<p class="date sublist-content2">${expenceDate}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-regular", "fa-bookmark", "edit", "icons");
    editButton.style.fontSize = "15px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true, expenceDate);
        sublistContent2.remove();
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-xmark", "delete", "icons");
    deleteButton.style.fontSize = "15px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton, expenceDate);
        sublistContent2.remove();
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};
// function to modify the list element:

const modifyElement = (element, edit = false, expenceDate) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        date.value = expenceDate;
        disableButton(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};
let category = "";
categoryButton.addEventListener("click", () => {
    category = newCategory.value;
    if (category === "") {
        errorMessage2.classList.remove("hide");
    }
    else {
        errorMessage2.classList.add("hide");
        let x = document.getElementById("product-title");
        let option = document.createElement("option");
        option.text = category;
        x.add(option);
        newCategory.value = "";
    }
})
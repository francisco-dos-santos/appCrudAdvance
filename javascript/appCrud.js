console.log('testando');
const totalAmount= document.getElementById("total-amount");
const totalAmountButton= document.getElementById("Total-amount-button");
const errormessage=document.getElementById('budget-error');
const errorProductTitle=document.getElementById("product-title-error");
let productTitle=document.getElementById("productTitle");
const checkAmountButton= document.getElementById("check-amount");
let userAmount=document.getElementById("user-amount");
const amount=document.getElementById("amount");
const expenditureValue=document.getElementById("expenditure");
const balance=document.getElementById("balance-amount");
const list= document.getElementById("list"); 
let tempAmount=0;
console.log(userAmount);

// set budget part
totalAmountButton.addEventListener("click", ()=>{
    tempAmount=totalAmount.value;
    //empty or negatie
    if(tempAmount==="" || tempAmount<0){
        errormessage.classList.remove("hide");
    }else{
        errormessage.classList.add("hide");
        // set budget
        amount.textContent=tempAmount;
        // set balance
        balance.textContent=tempAmount-expenditureValue.textContent; 
        // clear input box
        totalAmount.value="";
    }
})

// function to  disable edit and delele
const disableButtons=(bool)=>{
    let editButtons=document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((button)=>{
        button.disabled=bool;
    });
};

// function to modify list elements
const modifyElement=(element, edit=false)=>{
    let parentDiv= element.parentElement;
    let currentBalance=balance.textContent;
    let currentExpense= expenditureValue.textContent;
    let parentAmount=parentDiv.querySelector(".amount").textContent;
    if(edit){
        let parentText=parentDiv.querySelector(".product").textContent;
        productTitle.value=parentText;
        userAmount.value=parentAmount;
        disableButtons(true);
    }
    balance.textContent=parseInt(currentBalance)+parseInt(parentAmount);
    expenditureValue.textContent=parseInt(currentExpense)-parseInt(parentAmount);
    parentDiv.remove();
}
// function to create list
const listCreator=(expenseName,expenseValue)=>{
    let sublistContent=document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML=`<p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>`;
    let editButton=document.createElement("button");
    editButton.textContent="editar";
    editButton.classList.add("Edit");
    editButton.style.fontSize="20px";
    editButton.addEventListener("click", ()=>{
        modifyElement(editButton,true);
    });
    let delButton=document.createElement("button");
    delButton.textContent="Deletar";
    delButton.classList.add("delete");
    delButton.style.fontSize="20px";
    delButton.addEventListener("click", ()=>{
        modifyElement(delButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(delButton);
    document.getElementById("list").appendChild(sublistContent);
}
// function to Add Expenses
checkAmountButton.addEventListener("click",()=>{
    // emtpy checks
    if(!userAmount.value || !productTitle.value){
        errorProductTitle.classList.remove("hide");
        return false;
    }
    // enable buttons
    disableButtons(false);
    // expense
    let expenditure= parseInt(userAmount.value);
    // Total expense(existing +new)
    let sum =parseInt(expenditureValue.textContent)+ expenditure;
    expenditureValue.textContent=sum;
    // Total balance(budget- Total expense)
    const totalBalance=sum>0?sum-tempAmount:tempAmount-sum;
    balance.textContent=totalBalance;
    listCreator(productTitle.value,userAmount.value);
    productTitle.value="";
    userAmount.value="";
});
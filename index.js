




function getDetails(event)
{
    event.preventDefault();
    const seqInput = event.target.seq.value;
    const amntInput = event.target.amntName.value; 
    const rsnInput = event.target.rsnName.value;
    const categoryInput = event.target.category.value;
    let details = {
        seqInput,
        amntInput,
        rsnInput,
        categoryInput
    }
    displayDetails(details);
    localStorage.setItem(details.seqInput, JSON.stringify(details));
}

function displayDetails(obj)
{
    document.getElementById('seqId').value = '';
    document.getElementById('amnt').value = '';
    document.getElementById('rsn').value = '';
    document.getElementById('spent').value = '';
    if(localStorage.getItem(obj.seqInput) == null){
        removeDisplay(obj.seqInput);
    }
    const listExpense = document.getElementById('display');
    const childHtml = `
    <li class="expense-List" id=${obj.seqInput}>
    ${obj.seqInput}: ${obj.amntInput} ${obj.rsnInput} ${obj.categoryInput}
    <button onClick=deleteDisplay('${obj.seqInput}')>Delete</button>
    <button onClick=editDisplay('${obj.seqInput}','${obj.amntInput}','${obj.rsnInput}','${obj.categoryInput}')>
    Edit</button>
    </li><br>`
    listExpense.innerHTML = listExpense.innerHTML + childHtml ;
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        displayDetails(userDetailsObj)
    }
})



function deleteDisplay(seqInput)
{
    localStorage.removeItem(seqInput);
    removeDisplay(seqInput);
}

function removeDisplay(seqInput)
{
    let parentNode = document.getElementById('display');
    let childToBeDeleted = document.getElementById(seqInput);
    if(childToBeDeleted)
    {
        parentNode.removeChild(childToBeDeleted);
    }
}

function editDisplay(seqInput, amntInput, rsnInput, categoryInput)
{
    document.getElementById('seqId').value = seqInput;
    document.getElementById('amnt').value = amntInput;
    document.getElementById('rsn').value = rsnInput;
    document.getElementById('spent').value = categoryInput;
    deleteDisplay(seqInput);
}
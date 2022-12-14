




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
    axios.post('https://crudcrud.com/api/1320a9380a994ddd99fcb22dd0a35a29/appointmentData',details)
    .then((res)=>{
        displayDetails(res.data);
        console.log(res);
    });
    
    // localStorage.setItem(details.seqInput, JSON.stringify(details));
}

function displayDetails(obj)
{
    document.getElementById('seqId').value = '';
    document.getElementById('amnt').value = '';
    document.getElementById('rsn').value = '';
    document.getElementById('spent').value = '';
    // if(localStorage.getItem(obj.seqInput) == null){
    //     removeDisplay(obj.seqInput);
    // }
    const listExpense = document.getElementById('display');
    const childHtml = `
    <li class="expense-List" id=${obj._id}>
    ${obj.seqInput}: ${obj.amntInput} ${obj.rsnInput} ${obj.categoryInput}
    <button onClick=deleteDisplay('${obj._id}')>Delete</button>
    <button onClick=editDisplay('${obj._id}')>
    Edit</button>
    </li><br>`
    listExpense.innerHTML = listExpense.innerHTML + childHtml ;
}

window.addEventListener("DOMContentLoaded", () => {
    // const localStorageObj = localStorage;
    // const localstoragekeys  = Object.keys(localStorageObj)

    // for(var i =0; i< localstoragekeys.length; i++){
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     displayDetails(userDetailsObj)
    // }


    axios.get('https://crudcrud.com/api/1320a9380a994ddd99fcb22dd0a35a29/appointmentData')
    .then((res)=>{
        for(let i = 0; i < res.data.length; i++)
        {
            displayDetails(res.data[i]);
        }
    })
})



function deleteDisplay(seq)
{
    // localStorage.removeItem(seqInput);

    axios.delete(`https://crudcrud.com/api/1320a9380a994ddd99fcb22dd0a35a29/appointmentData/${seq}`)
    .then((res)=>{
        console.log(res);
        removeDisplay(seq);
    })
}

function removeDisplay(id)
{
    let parentNode = document.getElementById('display');
    let childToBeDeleted = document.getElementById(id);
    if(childToBeDeleted)
    {
        parentNode.removeChild(childToBeDeleted);
    }
}

function editDisplay(id)
{
    // document.getElementById('seqId').value = seqInput;
    // document.getElementById('amnt').value = amntInput;
    // document.getElementById('rsn').value = rsnInput;
    // document.getElementById('spent').value = categoryInput;

    axios.get(`https://crudcrud.com/api/1320a9380a994ddd99fcb22dd0a35a29/appointmentData/${id}`)
    .then((res)=>{
        document.getElementById('seqId').value = res.data.seqInput;
        document.getElementById('amnt').value = res.data.amntInput;
        document.getElementById('rsn').value = res.data.rsnInput;
        document.getElementById('spent').value = res.data.categoryInput;
    })
    deleteDisplay(id);
}
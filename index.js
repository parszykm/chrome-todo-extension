let myLeads=[]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn=document.getElementById("delete-btn")
const saveBtn=document.getElementById("save-btn")
if(JSON.parse(localStorage.getItem('myLeads'))){
    myLeads=JSON.parse(localStorage.getItem('myLeads'))
    renderLeads(myLeads)
}
inputBtn.addEventListener("click", () =>{
    myLeads.push(inputEl.value)
    inputEl.value =""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
    
})

delBtn.addEventListener("dblclick",() => {
    myLeads=[]
    localStorage.clear()
    renderLeads(myLeads)

})
saveBtn.addEventListener("click",() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(myLeads)
        myLeads.push(tabs[0].url)
        console.log(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)


   
     })


})
const renderLeads = (leads) =>{
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems += `
        <li><a target='_blank' href="${leads[i]}"> ${leads[i]} </a></li>
        `
    }
    ulEl.innerHTML = listItems
}

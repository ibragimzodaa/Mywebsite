let url = "https://66e8219eb17821a9d9db8120.mockapi.io/tableOfUser"

async function getUsers() {
    try {
        const {data} = await axios.get(url);
        getData(data)
    } catch (error) {
        console.error(error);
    }
}

let tbody = document.querySelector('.tbody')
let idd=null

function getData(data) {
    tbody.innerHTML = '';
    data.forEach((e,i) => {
        let tr = document.createElement('tr')

        let id = document.createElement('td')
        id.innerHTML = e.id;

        let name = document.createElement('td')
        name.innerHTML = e.name;
        name.classList.add("name")

        let comment = document.createElement('p')
        comment.innerHTML =  e.comment.slice(0,40) + " " + "...";
        comment.classList.add("p")
       
        let photo = document.createElement('img')
        photo.src = e.photo;
        photo.classList.add("photo")

        let categori = document.createElement('td')
        categori.innerHTML = e.categori;

        let prise = document.createElement('td')
        prise.innerHTML = e.prise + " $";

        let qty = document.createElement('td')
        qty.innerHTML = e.qty;

        let chekbox = document.createElement('input')
        chekbox.type = 'checkbox';
        DelSel.onclick = () => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox, index) => {
                if (checkbox.checked) {
                    deleteUserrr(data[index].id);
                }
            });
        }
        
        let status = document.createElement('td')
        status.innerHTML = e.status? "In stock" : "Out of stock";
        status.style.color = e.status? "green" : "red";

        let profileBtn = document.createElement('img');
        profileBtn.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s";
        profileBtn.classList.add("profileBtn")
        profileBtn.onclick = () => {
            profile.showModal()
        }

        let editBtn = document.createElement("img")
        editBtn.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTprVUjh1WdoCRQ4RZVVuZj-pDkdGgzueMZxQ&s";
        editBtn.classList.add("editBtn")
        editBtn.onclick = () => {
        editUsers.showModal()  
        editUsers.showModal() 
        }

        let deleteBtn = document.createElement("img")
        deleteBtn.src = "https://cdn-icons-png.flaticon.com/512/3405/3405244.png";        
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.onclick = () => {
            console.log(e.id);
            idd=e.id
            deleteUserr(idd)
        }

        let nameComment = document.createElement("div")
        nameComment.append(name,comment)

        let nameCommentImg = document.createElement("div")
        nameCommentImg.append(photo,nameComment)
        nameCommentImg.classList.add("nameCommentImg")

        let editDeleteProfile = document.createElement("div")
        editDeleteProfile.append(editBtn,deleteBtn,profileBtn)
        editDeleteProfile.classList.add("editDeleteProfile")

        tr.append(chekbox,id,nameCommentImg,categori,prise,qty,status,editDeleteProfile)
        tbody.append(tr)
    });
}
getUsers() 


// Add User

let btnAdd = document.querySelector(".btnAdd")
let addUsers = document.querySelector(".addUsers")
let btnSave = document.querySelector(".btnSave");
let btnCancel = document.querySelector(".btnCancel");
let formAddUsers = document.querySelector(".formAddUsers");

btnAdd.onclick = () => {
    addUsers.showModal()
}
async function adUsers(user) { 
    try {
     await axios.post(url,user)
        getUsers()
    } catch (error) {
        console.log(error);
    }
  }
formAddUsers.onsubmit = async(event) => {
    event.preventDefault()
    let user = {
        name: formAddUsers["inpName"].value,
        comment: formAddUsers["inpComment"].value,
        photo: formAddUsers["inpImage"].value,
        categori: formAddUsers["selectCategori"].value,
        prise: formAddUsers["inpPrice"].value,
        qty: formAddUsers["inpQuantity"].value,
        status: formAddUsers["selectStatus"].value
    }
    adUsers(user)
    addUsers.close()
    formAddUsers.reset()
}

// Delete

async function deleteUserr(id) { 
    try {
        await axios.delete(`${url}/${id}`)
        getUsers()
    } catch (error) {
        console.error(error);
        
    }
  }


  async function deleteUserrr(id) { 
    try {
        await axios.delete(`${url}/${id}`)  
        getUsers()
    } catch (error) {
        console.error(error);
        
    }
  }

//   Edit User

let editUsers = document.querySelector(".editUsers")
let btnSave1 = document.querySelector(".btnSave1")
let formedit = document.querySelector(".formedit")
let btnCancel1 = document.querySelector(".btnCancel1")


// Profile

let profile = document.querySelector(".profile")

// Search

let formsearch = document.querySelector(".formSearch");

formsearch.onsubmit = async(event) => {
    event.preventDefault()
    try {
        const respone = await fetch(`${url}?name=${formsearch['inpSearch'].value}`)
        const data = await respone.json();
        getData(data)
    } catch (error) {
        console.error(error);
        
    }
}

// SortButton

let sortButton = document.querySelector('.btnSort');

sortButton.onclick = async() => {
    try {
        const resp = await fetch(`${url}?sortBy=name`)
        const data = await resp.json();
        getData(data);
    } catch (error) {
        console.error(error);
    }
} 

// Delete with checkbox

let DelSel = document.querySelector(".DelSel")


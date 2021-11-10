const btnSearch = document.querySelector('.btn-search')

btnSearch.addEventListener('click', searchPeraturan)

function getListPeraturanPajak() {
    fetch("./data/list_peraturan.json")
    .then(res => res.json())
    .then(data => Peraturan.onLoaded(data))
    .catch(err => console.log(err))
}

function searchPeraturan(){
    const search = document.querySelector('.input-search').value
    if(search != "" ){
        Peraturan.cariPeraturan(search)
    }else if(search == ""){
        getListPeraturanPajak()
    }
}

document.addEventListener("click", element => createDetail(element))

function createDetail(element){
    if(element.target.id == "detailBtn" || element.target.id == "headurl"){
        element.preventDefault()

        const url = {
            url : element.target.getAttribute("href")
        }

        fetch('/detail', {method: "POST",body: JSON.stringify(url), headers: {"Content-type":"application/json"}})
        .then(res => res.text())
        .then(data => {
            document.querySelector(".document-spawn .content").innerHTML = ""
            const newData = document.createElement('div')
            newData.innerHTML = data
            const documentExternal = newData.querySelector(".node--type-peraturan")
            document.querySelector(".document-spawn .warp .content").append(documentExternal)
            document.querySelector(".document-spawn").classList.remove("hidden")
        })
        .catch(err => console.log(err))            
    } else if(element.target.id == "close"){
        document.querySelector(".document-spawn").classList.add("hidden")
    }
}
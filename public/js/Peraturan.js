class Peraturan{
    static listPeraturan = []
    static listSearch = []

    static onLoaded(data){
        Peraturan.listPeraturan = data
        for(let i = 0; i <= 9; i ++){
            Peraturan.listSearch.push(Peraturan.listPeraturan[i])
        }
        Peraturan.createUI(Peraturan.listSearch)
    }

    static cariPeraturan(search){
        Peraturan.listSearch = []
        if(Peraturan.listPeraturan.length > 0) {
            let find = search.toUpperCase();
            Peraturan.listSearch = Peraturan.listPeraturan.filter(peraturan => {
                return peraturan.title.toUpperCase().indexOf(find) !== -1 || peraturan.desc.toUpperCase().indexOf(find) !== -1  
            })
            Peraturan.createUI(Peraturan.listSearch)
        }
    }

    static createUI(items){
        const content = document.querySelector('.content-peraturan')
        content.innerHTML = ""
        if(items.length == 0){
            content.innerHTML = `
                <p class="notfound">Data tidak ditemukan</p>
            `
        }
        items.forEach((item, index) => {
             if(index){
                let card = document.createElement('div')
                card.innerHTML = `
                    <div class="peraturan">
                        <div class="title">${item['title']}</div>
                        <div class="desc">
                            ${item['desc']}
                        </div>
                        <div class="detail">
                            <small>
                                <span class="dokumen">${item['jenisDokumen']}</span>
                                <span> | </span>
                                <span class="tanggal">${item['tanggalPeraturan']}</span>
                            </small>
                        </div>
                        <a id="detailBtn" href="${item['detail']}" class="btn btn-primary">Lihat</a>
                    </div>             
                `
                card.className = "card"
                content.appendChild(card)
             }else{
                const header = document.querySelector('.peraturan-terbaru .title a')   
                const body = document.querySelector('.peraturan-terbaru .desc')   
                const status = document.querySelector('.peraturan-terbaru .detail small .status')   
                const dokumen = document.querySelector('.peraturan-terbaru .detail small .dokumen')   
                const tanggal = document.querySelector('.peraturan-terbaru .detail small .tanggal')   
                header.innerHTML = items[0]['title']
                body.innerHTML = items[0]['desc']
                status.innerHTML = items[0]['status']
                dokumen.innerHTML = items[0]['jenisDokumen']
                tanggal.innerHTML = items[0]['tanggalPeraturan']
                header.setAttribute("href", items[0]['detail'])       
             }
         });

    }
}
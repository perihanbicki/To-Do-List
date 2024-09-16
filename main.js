// html elementlerini jsde kullanmak için çağırdık
const form = document.querySelector(".todolist-form")
const alert = document.querySelector(".alert")
const grocery =document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")

// Listeyi düzenleme seçenekleri

let editElement; //düzenleme yapılan öğeyi temsil eder
let editFlag = false; //düzenleme modunda olup olmadğını belirtir
let editID =""; //benzersiz id oluşturmak için yazdık, listeye eklenen her bir değer yani value eşsiz bir idye sahip olacak

//OLAY İZLEYİCİLERİ BÖLÜMÜ

//form gönderildiğinde addItem fonksiyonunu çağır
form.addEventListener("submit", addItem)

//Temizle butonuna tıklanıldığında clearItems fonksiyonunu çağır
clearBtn.addEventListener("click", clearItems)
//sayfa yüklendiğinde setupItems fonksiyonunu çağır
window.addEventListener("DOMContentLoaded", setupItems)

//FONKSİYONLAR BÖLÜMÜ
function addItem(e){
 e.preventDefault()
 const value = grocery.value //inputa girilen değeri almaya yarayacak
 const id =new Date().getTime().toString()

if(value !== "" && !editFlag) {
const element = document.createElement("article")
let attr =document.createAttribute("data-id")
attr.value = id;
element.classList.add("grocery-item")
element.setAttributeNode(attr)
console.log(attr)
element.innerHTML=`
<p class="item">${value}</p>
                    <div class="btn-container">
                        <button class="edit-btn" type="button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="delete-btn" type="button"><i class="fa-solid fa-trash"></i></button>
                    </div>`


const deleteBtn = element.querySelector(".delete-btn")
deleteBtn.addEventListener("click", deleteItem)

const editBtn = element.querySelector(".edit-btn")
editBtn.addEventListener("click", editItem)


list.appendChild(element)

//alert fonksiyonunu çağırıcaz aşağıda tanımlamıştık
displayAlert("Başarıyla eklendi", "success")
//show container
container.classList.add("show-container")
//local storage yani depolamak için 
addToLocalStorage(id, value)
//inputa yazılanı submitledikten sonra çubuktan yani inputtan silsin
setBackToDefault()
} else if (value !== "" && editFlag){
    editElement.innerHTML = value
    displayAlert("Değer değiştirildi", "success")
    editLocalStorage(editID, value)
    setBackToDefault()
}else {
    displayAlert("Lütfen bir değer giriniz.", "danger")
}
}

//alert fonksiyonu yani alert kısmı hangi durumda ne yazsınn
function displayAlert (text,action) {
alert.textContent = text;
alert.classList.add(`alert-${action}`)
console.log(alert)
setTimeout (function() {
    alert.textContent = ""
    alert.classList.remove(`alert-${action}`)
}, 2000)
}
//inputa yazılanı silme fonksiyonu
function setBackToDefault(){
    grocery.value=""
    editFlag=false
    editID=""
    submitBtn.textContent = "submit"
}
//delete etme işlemi
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement
    // console.log(element)

    //datasete ulaşmak için yani fonksiyondaki verilere ulaşmak için (biz burada idye ulaştık)
const id = element.dataset.id

list.removeChild(element)

if(list.children.length == 0) {
    container.classList.remove("show-container")
}
displayAlert("Silindi", "danger")

removeFromLocalStorage(id)
}

//düzenleme işlemi
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement
   editElement = e.currentTarget.parentElement.previousElementSibling
   //console.log(editElement)
   // form kısmını düzenlenen yeni metinle doldurması için;
   grocery.value = editElement.innerHTML
   editFlag = true
   editID = element.dataset.id //düzenlenen elementin yeni kimliği
   submitBtn.textContent="edit"
}

//Listeyi temizleme işlemi için 
function clearItems() {
    const items = document.querySelectorAll(".grocery-item")
if(items.length > 0) {
    items.forEach(function(item){
        list.removeChild(item)
    })
}
container.classList.remove("show-container")
displayAlert("Liste temizlendi", "danger")
setBackToDefault()
}
//! local storage işlemleri 

//yazdıklarımız listede kalsın, sayfayı yenileyince gitmesin yani yerel depoya eklensin
function addToLocalStorage(id, value){
const grocery ={ id, value }
let items = getLocalStorage()
item.push(grocery)
localStorage.setItem("list", JSON.stringify(items))
}

function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
}

function removeFromLocalStorage(id){

    let items = getLocalStorage()

    items = items.filter(function(item){
         if (item.id !== id){
            return item
        }
    })
}

function editLocalStorage (id, value) {}

function setupItems(){
    let items = getLocalStorage()
}
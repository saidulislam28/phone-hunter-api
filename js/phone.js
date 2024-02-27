const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll)
}

const displayPhones =(phones, isShowAll) => {
  //1. get container by id;
  const phoneContainer = document.getElementById('phone-container');
  // empty after re-search in input field 
  phoneContainer.innerHTML = '';

  // display show all button if there are more than 12phones 
  const showAllcontainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllcontainer.classList.remove('hidden');
  }
  else{
    showAllcontainer.classList.add('hidden');
  }
console.log('is show all', isShowAll);
  // display first 13 after click search 
 if(!isShowAll){
  phones = phones.slice(0, 12);
 }


  console.log(phones);
  phones.forEach(phone => {
    console.log(phone);
    // 2. create a div.
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl mt-5`;
    //3. set innerHTML 
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title text-black">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick ="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
      </div>
  </div>
    `;
    //append child

    phoneContainer.appendChild(phoneCard);

  });

  // hide loading spinner 
  toggleLoadingSpinner(false);

}

const handleShowDetail = async (id) =>{
  console.log('details clicked', id);
  //  single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
 
}



// handle show all 
const handleShowAll = () =>{
 handleSearch(true);
}


// loadPhone();
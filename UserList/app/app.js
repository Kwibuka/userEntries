/** @format */

const buttonSelected = document.querySelector(".btn-clicked");
console.log(buttonSelected);

const fetchAllDataHandler = (id, AllUserElementsInfo) => {
  console.log(id);
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((respnonse) => {
      return respnonse.json();
    })
    .then((data, allUserDetails) => {
      const filteredUser = data.filter((user) => user.id === id);
      console.log(filteredUser);
      const elementFullDetails = document.createElement("div");
      filteredUser.map((userDetails) => {
        return (elementFullDetails.innerHTML = ` <ul>
        <p class="header-items" >More Details</p>
            <li ><strong>Username:</strong> ${userDetails.username}</li>
            <li><strong>Email:</strong> ${userDetails.email}</li>
            <li><strong>phone:</strong> ${userDetails.phone}</li>
            <li><strong>phone:</strong> ${userDetails.website}</li>
            <li>
              <div class="subtitles">
              <p> Address</p>
              <div> <strong> Sreeet: </strong> ${userDetails.address.street}</div>
              <div><strong>Route:</strong> ${userDetails.address.suite}</div>
              <div><strong>City:</strong> ${userDetails.address.city}</div>
              <div><strong>Zipcode:</strong> ${userDetails.address.zipcode}</div>
              </div>
              <div class="subtitles">
              <p>Position</p>
              <div><strong>Latitude</strong>: ${userDetails.address.geo.lat}</div>
              <div><strong>Longitude</strong>: ${userDetails.address.geo.lng}</div>
              </div>
              <div class="subtitles" >
              
              <p>Company</p>
              <div><strong>Name:</strong> ${userDetails.company.name}</div>
              <div><strong>Phrase:</strong> ${userDetails.company.catchPhrase}</div>
              <div><strong>bs:</strong> ${userDetails.company.bs}</div>
              
              </div>
            </li>
          </ul>`);
      });
      AllUserElementsInfo.append(elementFullDetails);
    });
};

const usersListArray = {
  render() {
    const userRender = document.getElementById("root");
    const usersTitleContainer = document.createElement("div");
    usersTitleContainer.textContent = "Users List";
    usersTitleContainer.className = "users-header";
    const usersList = document.createElement("div");
    usersList.className = "user-list";
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respnonse) => {
        return respnonse.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          for (let user of data) {
            const userElement = document.createElement("div");
            userElement.className = "user-item__content";
            userElement.innerHTML = ` 
                   
                  <div class="user-item-name-container" >
                        <div class="user-name" > ${user.name} <div/>
                        <div class="user-email" > ${user.email} </div>
                  </div>
                  
                  `;
            const buttonSelected = document.createElement("button");
            buttonSelected.textContent = "Get User’s Posts";
            const AllUserElementsInfo = document.createElement("div");
            buttonSelected.addEventListener("click", () => {
              fetchAllDataHandler(user.id, AllUserElementsInfo);
            });
            userElement.append(buttonSelected, AllUserElementsInfo);
            usersList.append(userElement);
          }
        }

        if (!data) {
          const userElement = document.createElement("div");
          userElement.textContent = "Loading...";
          userElement.className = "user-item";
          usersList.append(userElement);
        }
      })
      .catch((error) => {
        console.log(error);
        const userElement = document.createElement("div");
        userElement.textContent = "No Network";
        userElement.className = "user-item";
        usersList.append(userElement);
      });
    userRender.append(usersTitleContainer, usersList);
  },
};
usersListArray.render();

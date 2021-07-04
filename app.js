/** @format */

const buttonSelected = document.querySelector(".btn-clicked");
console.log(buttonSelected);

const fetchAllDataHandler = (id, AllUserElementsInfo) => {
  console.log(id);
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((respnonse) => {
      return respnonse.json();
    })
    .then((data) => {
      const filteredUser = data.filter((user) => user.id === id);
      console.log(filteredUser);
      const elementFullDetails = document.createElement("div");
      filteredUser.map((post) => {
        return (elementFullDetails.innerHTML = `
        <div class="new-post"> 
        <div class="news-title" >${post.title}</div>
        <div class="news-body">${post.body}</div>
        </div>
        `);
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

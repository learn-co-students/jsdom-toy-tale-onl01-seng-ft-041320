class ToysAdapter{
  constructor(baseURL){
    this.baseURL = baseURL
    this.addToy = false;

    this.addBtn = document.querySelector("#new-toy-btn")
    this.toyForm = document.querySelector(".container");
    this.toyCollection = document.querySelector("#toy-collection")

    this.addBtn.addEventListener('click', this.toggleForm)
    this.toyCollection.addEventListener('click', this.handleLike)

    this.headers = {"Content-Type": "application/json", "Accepts": "application/json"}

    this.toys = []
  }

  handleLike = (e) => {
      if (e.target.className = "like-btn"){
          let id = e.target.dataset.id
          let toy = this.toys.find(toy => toy.id == id)
            console.log(toy);
          let configObj = {
              method: "PATCH",
              headers: this.headers,
              body: JSON.stringify({likes: toy.likes + 1})
           }

            toy.likes++
            toy.render()

          fetch(`${this.baseURL}/${id}`, configObj)
          .then(res => res.json())
          .then(console.log)
      }
    }

  toggleForm = (e) => {
    // hide & seek with the form
    this.addToy = !this.addToy;
    if (this.addToy) {
      console.log(this)
      this.toyForm.style.display = "block";
    } else {
      this.toyForm.style.display = "none";
    }
  }

  getToys(){
    fetch(this.baseURL)
      .then(res => res.json())
      .then(toysArray => toysArray.forEach(toyObj => {
        let toy = new Toy(toyObj)
        this.toys.push(toy)
        this.toyCollection.appendChild(toy.render())
      }))
    }
}

let toysAdapter = new ToysAdapter ("http://localhost:3000/toys")

toysAdapter.getToys()
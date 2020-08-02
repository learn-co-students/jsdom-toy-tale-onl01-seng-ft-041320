class Toy{
    constructor({id, name, likes, image}){
        this.id = id
        this.name = name
        this.likes = likes
        this.image = image

        this.element = document.createElement('div')
        this.element.className = "card"
        this.element.id = this.id
    }

    render(){
        this.element.innerHTML = `
            <h2>${this.name}</h2>
            <img src=${this.image} class="toy-avatar" />
            <p>${this.likes} Likes </p>
            <button data-id=${this.id} class="like-btn">Like <3</button>
          `
        return this.element
    }
}
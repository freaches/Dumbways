const dataTestimonial = [ 
    {
        name : "Yoman",
        comment : "MU kapan menang bang",
        rating : 2,
        image : "https://images.unsplash.com/photo-1494368308039-ed3393a402a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1243&q=80"
    },
    {
        name : "Yamin",
        comment : "Saya sebagai Fans Arsenal Bahagia",
        rating : 5,
        image : "https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    },
    {
        name : "Celeng",
        comment : "Bang udah Bang",
        rating : 1,
        image : "Assets/Image/chelsea.jpeg"
    },
    // {
    //     name : "Mercon",
    //     comment : "Fans MC sedang tidak baik baik",
    //     rating : 3,
    //     image : "https://images.unsplash.com/photo-1659148566611-f1891d35bf60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    // },
    {
        name : "Kikil",
        comment : "Spurs sedang bersahabat dengan The Gunners",
        rating : 4,
        image : "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGh1bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
    },
    {
        name : "Paru",
        comment : "Mudryck adalah seleb tiktok dengan sampingan pemain bola",
        rating : 2,
        image : "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
    }
]

console.log(dataTestimonial)

function showTestimonial() {
    let testimonialForHtml = ""
  
    dataTestimonial.forEach(item => {
      testimonialForHtml += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
          <p class="star"> ${item.rating} <i class="fa-solid fa-star"></i></p>
        </div>
      `
    })
  
    document.getElementById("list-testimonial").innerHTML = testimonialForHtml
  }
  showTestimonial()

  function filterTestimonial(rating) {
    let testimonialForHtml = ""
  
    const dataFiltered = dataTestimonial.filter(data => data.rating === rating)
    console.log(dataFiltered);
  
    if(dataFiltered.length === 0) {
      testimonialForHtml = `<h3>Data not found !</h3>`
    } else {
      dataFiltered.forEach(item => {
        testimonialForHtml += `
          <div class="testimonial">
            <img src=${item.image} class="profile-testimonial" />
            <p class="quote">${item.comment}</p>
            <p class="author">- ${item.name}</p>
            <p class="star"> ${item.rating} <i class="fa-solid fa-star"></i></p>
          </div>
        `
      })
    }
  
    document.getElementById("list-testimonial").innerHTML = testimonialForHtml
  }
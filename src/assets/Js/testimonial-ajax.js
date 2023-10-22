const testimonial = new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open("GET", "https://api.npoint.io/47ffb4dea296bb343b60" , true)

    xhr.onload = function () {
        if(xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
        } else {
            reject("Error Loading Data")
        }
    }

    xhr.onerror = function () {
        reject("Network Error")
    }

    xhr.send()
})


async function showTestimonial() {
    try {
      const response = await testimonial
      let testimonialForHtml = ""
  
      response.forEach(item => {
        testimonialForHtml += `
            <div class="w-25 bg-secondary-subtle p-3 rounded text-end m-3">
                    <img src=${item.image} class="w-100 h-50 mb-3"/>
                    <p class="fst-italic">"${item.comment}"</p>
                    <p class="fw-bold">- ${item.name}</p>
                    <p> ${item.rating} <i class="fa-solid fa-star "></i></p>
                </div>
        `
      })
  
      document.getElementById("list-testimonial").innerHTML = testimonialForHtml
    } catch (err) {
      console.log(err)
    }
  }
  showTestimonial()
  
  async function filterTestimonial(rating) {
    try {
      const response = await testimonial
      let testimonialForHtml = ""
  
      const dataFiltered = response.filter(data => data.rating === rating)
      if(dataFiltered.length === 0) {
        testimonialForHtml = `<h3>Data not found !</h3>`
      } else {
        dataFiltered.forEach(item => {
          testimonialForHtml += `
            <div class="w-25 bg-secondary-subtle p-3 rounded text-end">
                    <img src=${item.image} class="w-100 mb-3"/>
                    <p class="fst-italic">"${item.comment}"</p>
                    <p class="fw-bold">- ${item.name}</p>
                    <p> ${item.rating} <i class="fa-solid fa-star "></i></p>
                </div>
          `
        })
      }
  
      document.getElementById("list-testimonial").innerHTML = testimonialForHtml
    } catch (err) {
      console.log(err);
    }
  }
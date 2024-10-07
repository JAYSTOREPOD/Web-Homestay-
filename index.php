<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jay Homestay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet"href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
    <link rel="stylesheet" href="css/common.css">
 <style>
     
        .availability-form{
          margin-top: -50px;
          z-index: 2;
          position: relative;
        }
        @media screen and (max-width: 575px) {  
            .availability-form{
              margin-top: 25px;
              padding: 0 35px;
          }
        }
    </style>
</head>
<body class="bg-light">
    
<nav class="navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand me-5 fw-bold fs-3 h-font" href="index.php">Jay Homestay</a>
    <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active me-2" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link me-2" href="#">Rooms</a>
        </li>
        <li class="nav-item">
          <a class="nav-link me-2" href="#">Facilities</a>
        </li>
        <li class="nav-item">
          <a class="nav-link me-2" href="#">Contact us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <div class="d-flex">
        <button type="button" class="btn btn-outline-dark shadow-none me-lg-3 me-2 " data-bs-toggle="modal" data-bs-target="#loginModal">
            Login
        </button>
        <button type="button" class="btn btn-outline-dark shadow-none " data-bs-toggle="modal" data-bs-target="#registerModal">
            Register
        </button>
      </div> 
    </div>
  </div>
</nav>

<!-- Modal Login-->
<div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <form>
            <div class="modal-header">
                <h5 class="modal-title d-flex align-items-center">
                <i class="bi bi-person-circle fs-3 me-2"></i>User Login
                 </h5>
                <button type="reset" class="btn-close shawdow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control shawdow-none">
            </div>
            <div class="mb-4">
              <label class="form-label">Password</label>
              <input type="password" class="form-control shawdow-none">
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <Button type="submit" class="btn btn-dark shawdow-none">LOGIN</Button>
              <a href="javascript: void(0)" class="text-secondary text-decoration-none">Forgot Password?</a>
            </div>
            </div>
        </form>
    </div>
  </div>
</div>

<!-- Modal Register -->
<div class="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <form>
            <div class="modal-header">
                <h5 class="modal-title d-flex align-items-center">
                <i class="bi bi-person-lines-fill fs-3 me-2"></i>User Registration
                 </h5>
                <button type="reset" class="btn-close shawdow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <span class="badge bg-light text-dark mb-3 test-wrap lh-base">
              Note: Your details must match with your ID (Aadhaar card,passport, driving license, etc.)
              that will be required druring check-in.
            </span>
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 ps-0 mb-3">
                  <label class="form-label">Name</label>
                  <input type="email" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 p-0 mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 ps-0 mb-3">
                  <label class="form-label">Phone Number</label>
                  <input type="number" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 p-0 mb-3">
                  <label class="form-label">Picture</label>
                  <input type="file" class="form-control shawdow-none">
                </div>
                <div class="col-md-12 p-0 mb-3">
                  <label class="form-label">Address</label>
                  <textarea class="form-control shadow-none" rows="1"></textarea>
                </div>
                <div class="col-md-6 ps-0 mb-3">
                  <label class="form-label">Pincode</label>
                  <input type="number" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 p-0 mb-3">
                  <label class="form-label">Date of birth</label>
                  <input type="date" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 ps-0 mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control shawdow-none">
                </div>
                <div class="col-md-6 p-0 mb-3">
                  <label class="form-label">Confirm Password</label>
                  <input type="password" class="form-control shawdow-none">
                </div>
              </div>
            </div>
            <div class="text-center my-1">
            <Button type="submit" class="btn btn-dark shawdow-none">REGISTER</Button>
            </div>
            </div>
        </form>
    </div>
  </div>
</div>

<!-- Carousel -->

<div class="container-fluid px-lg-4 mt-4">
  <div class="swiper swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="images/carousel/1.png" class="w-100 d-block"/>
        </div>
        <div class="swiper-slide">
          <img src="images/carousel/2.png" class="w-100 d-block"/>
        </div>
        <div class="swiper-slide">
          <img src="images/carousel/3.png" class="w-100 d-block"/>
        </div>
        <div class="swiper-slide">
          <img src="images/carousel/4.png" class="w-100 d-block"/>
        </div>
        <div class="swiper-slide">
          <img src="images/carousel/5.png" class="w-100 d-block"/>
        </div>
        <div class="swiper-slide">
          <img src="images/carousel/6.png" class="w-100 d-block"/>
        </div>
      </div>
    </div>
</div>

<!-- Check availability form -->

<div class="container availability-form">
  <div class="row">
    <div class="col-lg-12 bg-white shadow p-4 rounded">
      <h5 class="mb-4">Check Booking Availability</h5>
      <form>
        <div class="row align-items-end">
          <div class="col-lg-3 mb-3">
                  <label class="form-label" style="font-weight: 500;">Check-in</label>
                  <input type="date" class="form-control shawdow-none">
          </div>
          <div class="col-lg-3 mb-3">
                  <label class="form-label" style="font-weight: 500;">Check-out</label>
                  <input type="date" class="form-control shawdow-none">
          </div>
          <div class="col-lg-3 mb-3">
          <label class="form-label" style="font-weight: 500;">Adult</label>
            <select class="form-select shadow-none" >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-lg-2 mb-3">
          <label class="form-label" style="font-weight: 500;">Children</label>
            <select class="form-select shadow-none" >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-lg-1 mb-lg-3 mt-2">
            <button type="submit" class="btn text-white shadow-none custom-bg">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Our Rooms -->

  <h2 class="mt-5 pt-4 mb-4 text-center fw-bold h-font"> OUR ROOMS</h2>

  <div class="container">
    <div class="row">

      <div class="col-lg-4 col-md-6 my-3">
        <div class="card border-0 shadow" style="max-width: 350px; margin: auto;">
          <img src="images/rooms/1.jpg" class="card-img-top">
          <div class="card-body">
            <h5>Simple Room Name</h5>
            <h6 class="mb-4">$200 per night</h6>
            <div class="features mb-4">
                <h6 class="mb-1">features</h6>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 2 Rooms
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Bathroom
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Balcony
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  3 Sofa
                 </span>
            </div>
            <div class="facilities mb-4">
              <h6 class="mb-1">Facilities</h6>
              <span class="badge rounded-pill bg-light text-dark test-wrap">
                Wifi
               </span>
               <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Television 
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 AC
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Room heater
                </span>
            </div>
            <div class="rating mb-4">
              <h6 class="mb-1">Rating</h6>
              <span class="badge rounded-pill bg-light">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </span>
            </div>
            <div class="d-flex justify-content-evenly mb-2">
              <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a> 
              <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a> 
            </div>
          </div>
        </div>    
      </div>

      <div class="col-lg-4 col-md-6 my-3">
        <div class="card border-0 shadow" style="max-width: 350px; margin: auto;">
          <img src="images/rooms/1.jpg" class="card-img-top">
          <div class="card-body">
            <h5>Simple Room Name</h5>
            <h6 class="mb-4">$200 per night</h6>
            <div class="features mb-4">
                <h6 class="mb-1">features</h6>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 2 Rooms
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Bathroom
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Balcony
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  3 Sofa
                 </span>
            </div>
            <div class="facilities mb-4">
              <h6 class="mb-1">Facilities</h6>
              <span class="badge rounded-pill bg-light text-dark test-wrap">
                Wifi
               </span>
               <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Television 
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 AC
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Room heater
                </span>
            </div>
            <div class="rating mb-4">
              <h6 class="mb-1">Rating</h6>
              <span class="badge rounded-pill bg-light">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </span>
            </div>
            <div class="d-flex justify-content-evenly mb-2">
              <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a> 
              <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a> 
            </div>
          </div>
        </div>    
      </div>

      <div class="col-lg-4 col-md-6 my-3">
        <div class="card border-0 shadow" style="max-width: 350px; margin: auto;">
          <img src="images/rooms/1.jpg" class="card-img-top">
          <div class="card-body">
            <h5>Simple Room Name</h5>
            <h6 class="mb-4">$200 per night</h6>
            <div class="features mb-4">
                <h6 class="mb-1">features</h6>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 2 Rooms
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Bathroom
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  1 Balcony
                 </span>
                 <span class="badge rounded-pill bg-light text-dark test-wrap">
                  3 Sofa
                 </span>
            </div>
            <div class="facilities mb-4">
              <h6 class="mb-1">Facilities</h6>
              <span class="badge rounded-pill bg-light text-dark test-wrap">
                Wifi
               </span>
               <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Television 
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 AC
                </span>
                <span class="badge rounded-pill bg-light text-dark test-wrap">
                 Room heater
                </span>
            </div>
            <div class="rating mb-4">
              <h6 class="mb-1">Rating</h6>
              <span class="badge rounded-pill bg-light">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
              </span>
            </div>
            <div class="d-flex justify-content-evenly mb-2">
              <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a> 
              <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a> 
            </div>
          </div>
        </div>    
      </div>

      <div class="col-lg-12 text-center mt-5">
        <a href="" class="btn btn-sm btn-outline-dark rounded-0 fw-bold shadow-none ">More Rooms>>></a>

      </div>
    </div>
  </div>

<!-- OUR FACILITIES -->

  <h2 class="mt-5 pt-4 mb-4 text-center fw-bold h-font"> OUR FACILITIES</h2>

  <div class="container">
    <div class="row justify-content-evenly px-lg-0 px-md-0 px-5">
        <div class="col-lg-2 col-md-2 text-center bg-white rounded shadow py-4 my-3">
          <img src="images/facilities/1.svg" width="70px">
          <h5 class="mt-3">Wifi</h5>
        </div>
        <div class="col-lg-2 col-md-2 text-center bg-white rounded shadow py-4 my-3">
          <img src="images/facilities/3.svg" width="70px">
          <h5 class="mt-3">Massage</h5>
        </div>
        <div class="col-lg-2 col-md-2 text-center bg-white rounded shadow py-4 my-3">
          <img src="images/facilities/4.svg" width="70px">
          <h5 class="mt-3">Fan</h5>
      </div>
        <div class="col-lg-2 col-md-2 text-center bg-white rounded shadow py-4 my-3">
          <img src="images/facilities/5.svg" width="70px">
          <h5 class="mt-3">Radio</h5>
        </div>
        <div  class="col-lg-2 col-md-2 text-center bg-white rounded shadow py-4 my-3">
          <img src="images/facilities/6.svg" width="70px">
          <h5 class="mt-3">Television</h5>
        </div>
        <div class="col-lg-12 text-center mt-5">
          <a href="" class="btn btn-sm btn-outline-dark rounded-0 fw-bold shadow-none ">More Facilities>>></a>

        </div>
      </div>
  </div>

  <h2 class="mt-5 pt-4 mb-4 text-center fw-bold h-font"> OUR TESTIMONIALS</h2>

  <div class="container">
  <div class="swiper swiper-testimonials">
      <div class="swiper-wrapper">

        <div class="swiper-slide bg-white p-4 ">
        <div class="profile d-flex align-items-center p-4">
          <img src="images/features/star.png" width="30px">
          <h6 class="m-0 ms-2">Random user1</h6>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam consectetur accusantium veniam doloremque laborum mollitia nam sequi necessitatibus voluptatum, praesentium nostrum possimus provident placeat soluta eius, iste magnam, dolores accusamus.
        </p>
        <div class="rating">
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
        </div>
      </div>
      <div class="swiper-slide bg-white p-4 ">
        <div class="profile d-flex align-items-center p-4">
          <img src="images/features/star.png" width="30px">
          <h6 class="m-0 ms-2">Random user1</h6>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam consectetur accusantium veniam doloremque laborum mollitia nam sequi necessitatibus voluptatum, praesentium nostrum possimus provident placeat soluta eius, iste magnam, dolores accusamus.
        </p>
        <div class="rating">
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
        </div>
      </div>
      <div class="swiper-slide bg-white p-4 ">
        <div class="profile d-flex align-items-center p-4">
          <img src="images/features/star.png" width="30px">
          <h6 class="m-0 ms-2">Random user1</h6>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam consectetur accusantium veniam doloremque laborum mollitia nam sequi necessitatibus voluptatum, praesentium nostrum possimus provident placeat soluta eius, iste magnam, dolores accusamus.
        </p>
        <div class="rating">
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
          <i class="bi bi-star-fill text-warning"></i>
        </div>
      </div>

    </div>
    <div class="swiper-pagination"></div>
  </div>

  </div>

<br><br><br>
<br><br><br>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


  <!-- Initialize Swiper -->
  <script>
    var swiper = new Swiper(".swiper-container", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      autoplay:{
        delay: 3500,
        disableOnInteraction: false,
      }
    });

    var swiper = new Swiper(".swiper-testimonials", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jay Homestay - ROOMS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <?php require('inc/links.php'); ?>
    <style>
        .pop:hover {
            border-top-color: var(--teal_hover) !important;
            transform: scale(1.03);
            transition: all 0.3s;
        }
    </style>
</head>

<body class="bg-light">
    <?php require('inc/header.php'); ?>

    <div class="my-5 px-4">
        <h2 class="fw-bold h-font text-center">OUR ROOMS</h2>
        <div class="h-line bg-dark"></div>
    </div>

    <div class="container">
        <div class="row">

            <!-- Filters Section -->
            <div class="col-lg-3 col-md-12 mb-lg-0 mb-4 px-lg-0">
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded shadow">
                    <div class="container-fluid flex-lg-column align-items-stretch">
                        <h4 class="mt-2">FILTERS</h4>
                        <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#filterDropdown" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse flex-column align-items-stretch mt-2" id="filterDropdown">
                            <!-- Filters content -->
                            <div class="border bg-light p-3 rounded mb-3">
                                <h5 class="mb-3" style="font-size: 18px;">CHECK AVAILABILITY</h5>
                                <label class="form-label">Check-in</label>
                                <input type="date" class="form-control shawdow-none">
                                <label class="form-label">Check-out</label>
                                <input type="date" class="form-control shawdow-none">
                            </div>
                            <!-- Additional filters can be added here -->
                        </div>
                    </div>
                </nav>
            </div>

            <!-- Rooms Section -->
            <div class="col-lg-9 col-md-12 px-4" id="rooms-container">
                <!-- Rooms will be dynamically loaded here -->
            </div>
        </div>
    </div>

    <?php require('inc/footer.php'); ?>

    <script>
        // Fetch rooms data from API
        async function fetchRooms() {
            try {
                const response = await fetch('http://localhost:5000/api/rooms'); // Adjust API URL accordingly
                const rooms = await response.json();

                const roomsContainer = document.getElementById('rooms-container');
                roomsContainer.innerHTML = ''; // Clear previous content

                rooms.forEach(room => {
                    const roomCard = `
                        <div class="card mb-4 border-0 shadow">
                            <div class="row g-0 p-3 align-items-center">
                                <div class="col-md-5">
                                    <img src="${room.image || 'images/default-room.jpg'}" class="img-fluid rounded-start">
                                </div>
                                <div class="col-md-5 px-lg-3">
                                    <h5 class="mb-3">${room.name}</h5>
                                    <div class="features mb-3">
                                        <h6 class="mb-1">Features</h6>
                                        ${room.features.map(feature => `
                                            <span class="badge rounded-pill bg-light text-dark">${feature}</span>
                                        `).join('')}
                                    </div>
                                    <div class="facilities mb-3">
                                        <h6 class="mb-1">Facilities</h6>
                                        ${room.facilities.map(facility => `
                                            <span class="badge rounded-pill bg-light text-dark">${facility}</span>
                                        `).join('')}
                                    </div>
                                    <div class="guests">
                                        <h6 class="mb-1">Guests</h6>
                                        <span class="badge rounded-pill bg-light text-dark">
                                            ${room.maxGuests} Guests
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-2 text-center">
                                    <h6 class="mb-4">$${room.price} per night</h6>
                                    <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Book Now</a>
                                    <a href="#" class="btn btn-sm w-100 btn-outline-dark shadow-none">More details</a>
                                </div>
                            </div>
                        </div>`;
                    roomsContainer.innerHTML += roomCard;
                });
            } catch (error) {
                console.error('Error fetching rooms:', error);
                document.getElementById('rooms-container').innerHTML = '<p class="text-danger">Failed to load rooms data.</p>';
            }
        }

        // Call fetchRooms on page load
        document.addEventListener('DOMContentLoaded', fetchRooms);
    </script>

</body>

</html>





































<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jay Homestay - ROOMS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <?php require('inc/links.php'); ?>
    <style>
        .pop:hover {
            border-top-color: var(--teal_hover) !important;
            transform: scale(1.03);
            transition: all 0.3s;
        }
    </style>
</head>

<body class="bg-light">
    <?php require('inc/header.php'); ?>

    <div class="my-5 px-4">
        <h2 class="fw-bold h-font text-center">OUR ROOMS</h2>
        <div class="h-line bg-dark"></div>
    </div>

    <div class="container">
        <div class="row">

            <div class="col-lg-3 col-mg-12 mb-lg-0 mb-4 px-lg-0">
                <nav class="navbar navbar-expand-lg navbar-light bg-light rounded shadow">
                    <div class="container-fluid flex-lg-column align-items-stretch">
                        <h4 class="mt-2">FILTERS</h4>
                        <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#filterDropdown" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse flex-column align-items-stretch mt-2" id="filterDropdown">
                            <div class="border bg-light p-3 rounded mb-3">
                                <h5 class="mb-3" style="font-size: 18px;">CHECK AVAILABILITY</h5>
                                <label class="form-label">Check-in</label>
                                <input type="date" class="form-control shawdow-none">
                                <label class="form-label">Check-out</label>
                                <input type="date" class="form-control shawdow-none">
                            </div>
                            <div class="border bg-light p-3 rounded mb-3">
                                <h5 class="mb-3" style="font-size: 18px;">FACILITIES</h5>
                                <div class="mb-2">
                                    <input type="checkbox" id="f1" class="form-check-input shawdow-none me-1">
                                    <label class="form-check-label" for="f1">Facilities one</label>
                                </div>
                                <div class="mb-2">
                                    <input type="checkbox" id="f2" class="form-check-input shawdow-none me-1">
                                    <label class="form-check-label" for="f2">Facilities two</label>
                                </div>
                                <div class="mb-2">
                                    <input type="checkbox" id="f3" class="form-check-input shawdow-none me-1">
                                    <label class="form-check-label" for="f3">Facilities three</label>
                                </div>
                            </div>
                            <div class="border bg-light p-3 rounded mb-3">
                                <h5 class="mb-3" style="font-size: 18px;">GUESTS</h5>
                                <div class="d-flex">
                                    <div class="me-2">
                                        <label class="form-label">Adult</label>
                                        <input type="number" class="form-control shawdow-none">
                                    </div>
                                    <div>
                                        <label class="form-label">Children</label>
                                        <input type="number" class="form-control shawdow-none">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="col-lg-9 col-md-12 px-4">
                <div class="card mb-4 border-0 shadow">
                    <div class="row g-0 p-3 align-items-center">
                        <div class="col-md-5 mb-lg-0 mb-md-0- mb-3">
                            <img src="images/rooms/1.jpg" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-5 px-lg-3 px-md-3 px-0">
                            <h5 class="mb-3">Simple Room Name</h5>
                            <div class="features mb-3">
                                <h6 class="mb-1">Features</h6>
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
                            <div class="facilities mb-3">
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
                            <div class="guests">
                                <h6 class="mb-1">Guests</h6>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    5 adults
                                </span>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    4 Children
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2 mt-lg-0 mt-md-0 mt-4 text-center">
                            <h6 class="mb-4">$200 per night</h6>
                            <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Book Now</a>
                            <a href="#" class="btn btn-sm w-100 btn-outline-dark shadow-none">More details</a>
                        </div>
                    </div>
                </div>
                <div class="card mb-4 border-0 shadow">
                    <div class="row g-0 p-3 align-items-center">
                        <div class="col-md-5 mb-lg-0 mb-md-0- mb-3">
                            <img src="images/rooms/1.jpg" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-5 px-lg-3 px-md-3 px-0">
                            <h5 class="mb-3">Simple Room Name</h5>
                            <div class="features mb-3">
                                <h6 class="mb-1">Features</h6>
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
                            <div class="facilities mb-3">
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
                            <div class="guests">
                                <h6 class="mb-1">Guests</h6>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    5 adults
                                </span>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    4 Children
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2 text-center">
                            <h6 class="mb-4">$200 per night</h6>
                            <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Book Now</a>
                            <a href="#" class="btn btn-sm w-100 btn-outline-dark shadow-none">More details</a>
                        </div>
                    </div>
                </div>
                <div class="card mb-4 border-0 shadow">
                    <div class="row g-0 p-3 align-items-center">
                        <div class="col-md-5 mb-lg-0 mb-md-0- mb-3">
                            <img src="images/rooms/1.jpg" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-5 px-lg-3 px-md-3 px-0">
                            <h5 class="mb-3">Simple Room Name</h5>
                            <div class="features mb-3">
                                <h6 class="mb-1">Features</h6>
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
                            <div class="facilities mb-3">
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
                            <div class="guests">
                                <h6 class="mb-1">Guests</h6>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    5 adults
                                </span>
                                <span class="badge rounded-pill bg-light text-dark test-wrap">
                                    4 Children
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2 text-center">
                            <h6 class="mb-4">$200 per night</h6>
                            <a href="#" class="btn btn-sm w-100 text-white custom-bg shadow-none mb-2">Book Now</a>
                            <a href="#" class="btn btn-sm w-100 btn-outline-dark shadow-none">More details</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <?php require('inc/footer.php') ?>




</body>

</html> -->
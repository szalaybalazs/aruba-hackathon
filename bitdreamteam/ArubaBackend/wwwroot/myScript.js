// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }


document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('city')) {
        document.addEventListener('DOMContentLoaded', (event) => {
//             // Get the user object from local storage
// function FillUpProfile(){
            const userString = localStorage.getItem('UserData');
            if (userString) {
                console.log(userString)
                const user = JSON.parse(userString);
        
                // Update the placeholders with the user information
                document.getElementById('first-name').placeholder = user.firstName || '';
                document.getElementById('last-name').placeholder = user.lastName || '';
                document.getElementById('email').placeholder = user.email || '';
                document.getElementById('country').placeholder = user.country || '';
                document.getElementById('street-address').placeholder = user.streetAddress || '';
                document.getElementById('city').placeholder = user.city || '';
                document.getElementById('region').placeholder = user.state || '';
                document.getElementById('postal-code').placeholder = user.zipCode || '';
            } else {
                console.error('No user object found in local storage');
            }
        }
        );
    }
});

// Profil picture upload
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ProfilPictureUpload').addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview').innerHTML = '<img class="justify-center" src="' + e.target.result + '" alt="Profile Picture" class="w-32 h-32 rounded-full">';
            }
            reader.readAsDataURL(file);
        }
    });
});

function logout() {
    localStorage.removeItem('authToken');
    // Optionally, redirect the user to the login page or perform other logout actions
    window.location.href = '/login.html';
}

// Is logged in function

function profile_dropdown_ISlogin(){
    // catch{var loggedIn = 0}
    if (localStorage.getItem('authToken')) {
        var element = document.getElementById('profile_dropdown_button_NOlogin');
        element.classList.add('hidden');

        var element = document.getElementById('profile_dropdown_button_login');
        element.classList.remove('hidden');
    }

    else {
        var element = document.getElementById('profile_dropdown_button_login');
        element.classList.add('hidden');

        var element = document.getElementById('profile_dropdown_button_NOlogin');
        element.classList.remove('hidden');
    }

}

window.addEventListener('load', profile_dropdown_ISlogin);


function toggleVisibility_profile() {    
    if (localStorage.getItem('authToken')) {
        var element = document.getElementById('profile_dropdown');  // Replace 'element-id' with the actual id of your element
        element.classList.toggle('hidden');
    }

    else {
        var element = document.getElementById('profile_dropdown_NOlogin');  // Replace 'element-id' with the actual id of your element
        element.classList.toggle('hidden');
    }
}

// function hideElements(event) {
//     // Check if a button was clicked
//     if (event.target.tagName === 'BUTTON') {
//         return;  // Exit the function early if a button was clicked
//     }

//     var element1 = document.getElementById('mobile-menu');
//     var element2 = document.getElementById('filter_1');

//     element1.classList.add('hidden');
//     element2.classList.add('hidden');
// }
// // Pass the event object to the hideElements function
// document.addEventListener('click', hideElements);

function toggleVisibility_mobileMenu() {
    // setTimeout(function() {
    //     var element = document.getElementById('mobile-menu');  // Replace 'element-id' with the actual id of your element
    //     element.classList.toggle('hidden');
    // }, 0);

    var element = document.getElementById('mobile-menu');  // Replace 'element-id' with the actual id of your element
    element.classList.toggle('hidden');

    if (localStorage.getItem('authToken')) {
        var element = document.getElementById('profile_dropdown_mobile');  // Replace 'element-id' with the actual id of your element
        element.classList.toggle('hidden');
    }

    else {
        var element = document.getElementById('profile_dropdown_NOlogin_mobile');  // Replace 'element-id' with the actual id of your element
        element.classList.toggle('hidden');
    }
}

function toggleVisibility_filter_1() {
    var element = document.getElementById('sortdropdown');  // Replace 'element-id' with the actual id of your element
    element.classList.toggle('hidden');
}
function toggleVisibility_filter_2() {
    var element = document.getElementById('businessdropdown');  // Replace 'element-id' with the actual id of your element
    element.classList.toggle('hidden');
}
function toggleVisibility_filter_3() {
    var element = document.getElementById('featuresdropdown');  // Replace 'element-id' with the actual id of your element
    element.classList.toggle('hidden');
}




